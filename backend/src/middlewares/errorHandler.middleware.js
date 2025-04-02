const formatError = (err) => {
    return {
        statusCode: err.status || 500,
        success: false,
        message: err.message || "Internal Server Error",
    };
};

export const errorHandler = (err, req, res, next) => {
    const response = formatError(err);
    return res.status(response.statusCode).json(response);
};

export const socketErrorHandler = (socket, err, disconnect) => {
    const response = formatError(err);

    socket.emit("socket_error", response);
    if (disconnect) socket.disconnect();
};
