const axios = require("axios");

module.exports = {
  /**
   * Get the order details and member id from database.
   * @param {*} id the required file.
   * @returns the id details.
   */
  async getOrderDetails(orderId) {
    try {
      const response = await axios.get(
        `https://667009f30900b5f8724927c3.mockapi.io/flights/Orderdata?orderId=${orderId}`);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  async getMemberDetails(memberId) {
    try {
        const response = await axios.get(
          `https://667009f30900b5f8724927c3.mockapi.io/flights/Orderdata?memberId=${memberId}`);
        return response.data;
      } catch (error) {
        return error;
      }
  }
};
