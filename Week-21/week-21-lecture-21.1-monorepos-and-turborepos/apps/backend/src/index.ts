import express from "express";
import { request,ResponseType} from "axios";

const app = express()

app.get("/", (req, res) => {
    res.json({
        message: "hello world"
    });
})