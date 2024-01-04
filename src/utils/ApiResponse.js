class ApiResponse {
   constructor(statusCode, data, message = "success") {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode < 400; // We will send status code less than 400
   }
}

export default ApiResponse;
