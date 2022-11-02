"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.URL
}));
const port = process.env.PORT;
app.post('/api/login', (req, res) => {
    const user = {
        username: 'admin',
        password: '12345',
        role: 'admin'
    };
    if (req.body.username === user.username && req.body.password === user.password && req.body.role === user.role) {
        console.log(user);
        const token = jsonwebtoken_1.default.sign(user, `${process.env.JWT_SECRET_KEY}`);
        res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000 });
        res.json({ username: user.username, role: user.role });
    }
    else {
        res.json({ message: 'unable logged in' });
    }
});
app.get('/api/search', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const value = req.query.search;
    const token = req.cookies['jwt'];
    if (token) {
        try {
            const verified = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET_KEY}`);
            if (verified) {
                const response = yield (0, node_fetch_1.default)(`https://api.tvmaze.com/search/shows?q=${value}`);
                res.json(yield response.json());
            }
            else {
                res.json({ error: {
                        message: 'token is not valid'
                    } });
            }
        }
        catch (error) {
            // Access Denied
            return res.status(401).send(error);
        }
    }
    else {
        res.json({ error: { message: 'token required' } });
    }
    //   
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
