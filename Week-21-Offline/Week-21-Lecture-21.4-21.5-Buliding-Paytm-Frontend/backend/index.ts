// backend/routes/index.ts
import express from 'express';
const mainRouter = require("./routes/index.ts");

const app = express();

app.use("/api/v1", mainRouter);

//app.use("api/v2", Router);

//api/v1/user/signup
//api/v1/user/signin
//api/v1/user/signchangepassword

//api/v1/account/balance
//api/v1/account/transfermoney
//api/v1/