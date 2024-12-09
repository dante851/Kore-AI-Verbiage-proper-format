const { verbiageBuilder } = require("./verbiageBuilder");
const constants = require("./constants/index");
const richCardTemplate = require("./templates.json");
module.exports = {
  populateBotResponse: function (
    vbResponse,
    responseId,
    messageDataWithBotUserSession
  ) {
    const verbiage_builder_resp = vbResponse;
    let entityStatus = messageDataWithBotUserSession.entity_status;
    let failedEntity = messageDataWithBotUserSession.failedEntity;
    let orderIdInput = "";
    let result = verbiage_builder_resp.filter(
      (ele) => ele.RESPONSE_ID.trim() === responseId
    );
      console.log(result)
    // Custom Bot Responses Condition
    if (responseId.startsWith("ESI_PHA_ORD_INFO")) {
      switch (responseId) {
        case "ESI_PHA_ORD_INFO_ORD_ID_RESP":
          orderIdInput = entityStatus;
          let str = result[0].WEB_RESPONSE_MSG.replaceAll(
            "${order_status}",
            orderIdInput
          );
          result[0].WEB_RESPONSE_MSG = str;
          return msgTemplate(result);

        case "ESI_PHA_ORD_INFO_MEMBER_ID_RESP":
          let memberIdInput = entityStatus;
          let memberStr = result[0].WEB_RESPONSE_MSG.replaceAll(
            "${member_status}",
            memberIdInput
          );
          result[0].WEB_RESPONSE_MSG = memberStr;
          return msgTemplate(result);

        case "ESI_PHA_ORD_INFO_INVALID_MSG":
          if (failedEntity !== null) {
            let failedEntityInputStr = result[0].WEB_RESPONSE_MSG.replaceAll(
              "${dynamic_entity}",
              failedEntity
            );
            result[0].WEB_RESPONSE_MSG = failedEntityInputStr;
            return msgTemplate(result);
          }
          break;

        default:
          return msgTemplate(result);
      }
    } else {
      // Custom FAQ Responses
      return msgTemplate(result);
    }
  },
  resetExcelData: function () {
    constants.verbiage_En_RespData = verbiageBuilder(
      "ESI_PHA_BOT_RESP_BUILDER_EN_CA.xlsx"
    );
  },
};
function msgTemplate(templateData) {
  const templateType = templateData[0]?.MEDIA_TYPE;
  let cardData = templateData[0]?.DATA;

  const dafaultTextTemplate = templateData[0]?.WEB_RESPONSE_MSG;

  switch (templateType) {
    case "TABLE":
      return selectRichCardTemplate(
        richCardTemplate.tableTemplate,
        cardData,
        templateType
      );
    case "QUICK_REPLIES":
      return selectRichCardTemplate(
        richCardTemplate.quickReplyTemplate,
        templateData,
        templateType
      );

    default:
      return dafaultTextTemplate;
  }
}

function selectRichCardTemplate(
  templateTypeFormat,
  templateData,
  templatetype
) {
  if (templatetype === "TABLE") {
    let obj = templateTypeFormat;
    obj.payload = JSON.parse(templateData);
    obj.payload["template_type"] = templatetype.toLowerCase();
    return JSON.stringify(obj);
  } else if (templatetype === "QUICK_REPLIES") {
    let obj = templateTypeFormat;
    let resultData = templateData;
    let quickreplyData = resultData.map((ele) => {
      return {
        content_type: "text",
        title: ele.BUTTON_LABEL,
        payload: ele.BUTTON_ID,
        image_url: "",
      };
    });
    obj.payload["quick_replies"] = quickreplyData;
    obj.payload["template_type"] = templatetype.toLowerCase();
    obj.payload["text"] = "Do You need to see the order Id Details?";
    return JSON.stringify(obj);
  }
}
