import  express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";

const app = express();

app.post("/signin", (req, res) => {
    
    const data = SigninSchema.safeParse(req.body);
    if (!data.success) {
        res.status(411).json({
            message: "Incorrect Inputs"
        });
        return;
    }

    const userId = 1;
    const token = jwt.sign({
         userId 
        },JWT_SECRET);

    res.json({ 
        token 
    });
    
});

app.post("/signup", middleware, (req, res) => {

    const data = CreateUserSchema.safeParse(req.body);
    if (!data.success) {
        res.status(411).json({
            message: "Incorrect Inputs"
        });
        return;
    }

    res.json(
        req.userId = "123"
        
    )
  res.send("Signup successful");
});

app.post("/room", middleware, (req, res) => {

    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
        res.status(411).json({
            message: "Incorrect Inputs"
        });
        return;
    }

    //db call
    res.json({ 
        roomId: "123"
    });
    res.send("Room created successfully");
});

app.listen(3001);