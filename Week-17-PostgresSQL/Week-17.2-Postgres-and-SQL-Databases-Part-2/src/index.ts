import express, { Request, Response } from 'express';
import { Client } from "pg";

const pgClient = new Client("postgresql://neondb_owner:");

const app = express();
app.use(express.json());

async function main() {
    try{
      await pgClient.connect();
      console.log("DB Connected");
    }
    catch(err: any){
      console.log("Error connecting to DB. The error is" + err.message);
    }
}

app.post("/signup", async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const city = req.body.city;
    const country = req.body.country;
    const street = req.body.street;
    const pincode = req.body.pincode;

    try{
      const insertQuery =`INSERT INTO users (username, password, email) VALUES ( $1, $2, $3);`

      const addressInsertQuery = `INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1, $2, $3, $4, $5);`
      

      await pgClient.query("BEGIN");

      const response = await pgClient.query(insertQuery, [username, password, email]);
      const userId = response.rows[0].id;
      const addressInsertResponse = await pgClient.query(addressInsertQuery, [city, country, street, pincode, userId]);
      
      await pgClient.query("COMMIT");


      res.json({
          message: "You have signed up"
        })
    }
    catch(e) {
      res.json({
        message: "Error signing up"
      })
    }
});


main();


app.listen(3000, () => {
    console.log("Server running on port 3000");
});