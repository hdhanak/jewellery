"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerFile = exports.LoggerStream = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const transports = [];
transports.push(new winston_1.default.transports.Console({
    format: winston_1.default.format.combine(winston_1.default.format.cli(), winston_1.default.format.splat()),
}));
exports.logger = winston_1.default.createLogger({
    level: 'debug',
    levels: winston_1.default.config.npm.levels,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json()),
    silent: false,
    transports,
});
exports.LoggerStream = {
    write: (msg) => {
        exports.logger.info(msg.replace(/(\n)/gm, ''));
    },
};
const transport = new winston_daily_rotate_file_1.default({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});
exports.loggerFile = winston_1.default.createLogger({
    transports: [
        transport
    ]
});
