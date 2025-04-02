import { socketErrorHandler } from "../middlewares/errorHandler.middleware.js";

export const asyncWrapper = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        next(err);
    }
};

export const socketAuthWrapper = (fn) => async (socket, next) => {
    try {
        await fn(socket, next);
    } catch (err) {
        next(err);
    }
};

export const socketWrapper =
    (fn) =>
    async (...args) => {
        const socket = args[0];
        const disconnect = args[args.length - 1];
        try {
            await fn(...args);
        } catch (err) {
            socketErrorHandler(socket, err, disconnect);
        }
    };
