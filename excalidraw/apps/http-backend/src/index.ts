import  express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
const app = express();

app.post("/signin", async (req, res) => {
    
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    
    try 
    {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                // TODO: Hash the pw
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch(e) {
        res.status(411).json({
            message: "User already exists with this username"
        })
    }
})

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