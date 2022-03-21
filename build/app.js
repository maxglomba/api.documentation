"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
process.env.APP_ENV = process.env.APP_ENV || 'development';
dotenv_1.default.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});
const app = (0, express_1.default)();
app.set('port', process.env.port || 3000);
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(tasks_routes_1.default);
exports.default = app;
