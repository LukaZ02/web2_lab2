"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const data_source_1 = require("./data-source");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes/routes");
const https = __importStar(require("node:https"));
const fs = __importStar(require("node:fs"));
const ticketController_1 = require("./controllers/ticketController");
const app = (0, express_1.default)();
//Setup Port
dotenv_1.default.config();
const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;
//Setup Layouts
app.use(express_ejs_layouts_1.default);
app.set('layout', 'layouts/layout');
//Setup View Engine
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
//Setup Json Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Setup Routes
(0, routes_1.routes)(app);
//insert records
ticketController_1.TicketController.addTicket('12345678901', 'John', 'Doe');
ticketController_1.TicketController.addTicket('12345678902', 'Jane', 'Smith');
ticketController_1.TicketController.addTicket('12345678903', 'Johan', 'Frank');
//Connect to DataSource
data_source_1.AppDataSource.initialize().then(() => {
    if (externalUrl) {
        const hostname = '0.0.0.0'; //ne 127.0.0.1
        app.listen(port, hostname, () => {
            console.log(`Server locally running at http://${hostname}:${port}/ and from outside on ${externalUrl}`);
        });
    }
    else {
        https.createServer({
            key: fs.readFileSync('server.key'),
            cert: fs.readFileSync('server.cert')
        }, app)
            .listen(port, function () {
            console.log(`Server running at https://localhost:${port}/`);
        });
    }
});
