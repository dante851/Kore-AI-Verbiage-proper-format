const xlsx = require("node-xlsx");


module.exports = {
  /**
   * Get the verbiage data from the database.
   * @param {*} respExcelFile the required file.
   * @returns the dynamic chat details.
   */
  async getVerbiageResponse(respExcelFile) {
    const workbook = xlsx.parse(`./${respExcelFile}`);
    let verbiageResponse = [];

    for (const element in workbook) {
      const sheet = workbook[element].data;
      const headers = sheet[0];

      let sheetData = sheet.slice(1).map((row) => {
        let obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] ? row[index] : null;
        });
        return obj;
      });

      verbiageResponse.push(...sheetData);
    }
    return verbiageResponse;
  },
};
