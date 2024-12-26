const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const users = [{
    name: 'John',
    kidneys: [{
        healthy: false,
    }]
}];

app.get("/", function(req, res) {
    const johnkidneys = users[0].kidneys;
    const numberofkidneys = johnkidneys.length;
    let numberofhealthykidneys = 0;
    for (let i = 0; i < numberofkidneys; i++) {
        if (johnkidneys[i].healthy === true) {
            numberofhealthykidneys += 1;
        }
    }
    const numberofunhealthykidneys = numberofkidneys - numberofhealthykidneys;
    res.json({
        numberofkidneys,
        numberofhealthykidneys,
        numberofunhealthykidneys
    });
});

app.post("/", function(req, res) {
    const ishealthy = req.body.healthy;
    users[0].kidneys.push({
        healthy: ishealthy
    });
    res.json({
        message: "Done." 
    });
});

app.put("/", function(req, res) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        message: "All kidneys updated to healthy."
    });
});

app.delete("/", function(req, res) {
    // Filter out unhealthy kidneys
    users[0].kidneys = users[0].kidneys.filter(kidney => kidney.healthy);
    
    res.json({
        message: "Unhealthy kidneys removed."
    });
});

app.listen(3000);
