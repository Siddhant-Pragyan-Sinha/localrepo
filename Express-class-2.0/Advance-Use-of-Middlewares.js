const express = require('express'); 

const app = express(); 

// Middleware
function isOldenoughMidleWare(req, res, next) {
    const age = Number(req.query.age); // Convert age to a number
    if (age > 14 && age <= 50) {
        res.json({
            msg: "Enjoy your ride baby boy and baby girls"
        });
    } else if (age > 50) {
        res.json({
            msg: "Chachaa upar chal jayega to mereko mat bolna"
        });
    } else {
        res.json({
            msg: "So sorry :<"
        });
    }
    
    next();
}

app.use(isOldenoughMidleWare); 

app.get("/ride1", function(req, res) {
    res.json({
        msg: "Enjoy the Ride one baby boys and girls"
    });
});

app.get("/ride2", function(req, res) {
    res.json({
        msg: "Enjoy the Ride two baby boys and girls"
    });
});

app.listen(3000);
