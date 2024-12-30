import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import FileUpload from "express-fileupload";
// import SequelizeStore from "connect-session-sequelize";
// import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import VoucherRoute from "./routes/VoucherRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
// import VoucherClaim from "./models/VoucherClaimModel.js";
dotenv.config();

const app = express();
// const sessionStore = SequelizeStore(session.Store);
// const store = new sessionStore({
//     db:db
// });

// (async()=>{
//     await db.sync();
// })();

// (async () => {
//     try {
//         await VoucherClaim.sync({ alter: true }); \
//         console.log("VoucherClaim table synchronized.");
//     } catch (error) {
//         console.error("Error synchronizing VoucherClaim table:", error);
//     }
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(FileUpload());
app.use(express.static("public"));
app.use(express.json());
app.use(UserRoute);
app.use(VoucherRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});