let verbiageRespData = [];
let verbiage_En_RespData = [];
let verbiage_Fr_RespData = [];
module.exports = {
  serverResponses: {
    default: {
      status: 200,
      body: {},
    },
    success: {
      status: 200,
      body: {},
    },
    created: {
      status: 201,
      body: {},
    },
    error: {
      status: 400,
      body: {
        errorCode: "Bad-Request",
        message: "Invalid request, unable to process.",
      },
    },
    unauthorized: {
      status: 401,
      body: {
        errorCode: "Unauthorized",
        message: `
        Unfortunately, you do not have the necessary permissions to access this resource. 
        Please ensure you are logged in with the correct credentials. 
        If you continue to experience issues, please contact support.`,
      },
    },
    serverError: {
      status: 500,
      body: {
        errorCode: "Internal-Server-Error",
        message: "Failed to process the request. Please try again later.",
      },
    },
    dataNotFound: {
      status: 404,
      body: {
        errorCode: "Data Not Found",
        message: "Data is not available in the server.",
      },
    },
  },
  statusCodes: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
    DATA_NOT_FOUND:404,
  },
  errorMessages: {
    USER_DOES_NOT_EXIST: "User account does not exist",
  },
  successMessages: {
    FETCHED: "Fetched Successfully",
    UPDATED: "Updated Successfully",
    DELETED: "Deleted Successfully",
  },
};
