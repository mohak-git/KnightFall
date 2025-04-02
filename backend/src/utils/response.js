class MyResponse {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message || "Success!";
        this.data = data;
    }
}

export default MyResponse;