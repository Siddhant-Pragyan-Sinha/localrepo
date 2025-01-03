const bcrypt = require('bcrypt');

const express = require("express");
const app = express();
app.use(express.json());

const { z } = require("zod");


const { UserModel, TodoModel } = require("./db");

const { auth, JWT_SECRET } = require("./auth");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.8gjzp.mongodb.net/todo-app-database-week-7-2")



app.post("/signup", async function(req, res) {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
    })

    const parsedDatawithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDatawithSuccess.success) {
        res.json({
            message : "Incorrect Format",
            error : parsedDatawithSuccess.error
        })
        return
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    let errorthrown = false;

    try {
         const hashedpassword = await bcrypt.hash(password, 10);
         console.log(hashedpassword);

         await UserModel.create({
          email: email,
          password: hashedpassword,
          name: name
         });
        } catch (e) {
            errorthrown = true;
            res.json({
                message: "User already exists"
            })
         }

    if (errorthrown) {
      res.json({
          message: "You are signed up"
      })
    }
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
        password: password,
    });

    if(!response) {
        res.status(403).json({
            message: "User des not exist in our database"
        })
        return;
    }

    const PasswordMatch = await bcrypt.compare(password, response.password);

    if (PasswordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000);