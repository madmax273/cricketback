const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adangaji*273",
  database: "cricketdb",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Use the cors middleware
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  console.log();
  await db.query(`SELECT * FROM players;`, (error, results) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).send("error");
    } else {
      console.log("Registration successful", results);
      res.sendStatus(200);
    }
  });
  //   res.send("<h1>get request</h1>");
  //   res.end();
});

app.post("/register", (req, res) => {
  const { firstName, lastName, email, mobile, city, height, weight, gender } =
    req.body;

  const sql = `INSERT INTO players VALUES ( "${firstName}", "${lastName}", "${email}", "${mobile}", "${city}", "${height}", "${weight}", "${gender}");`;
  //   const sql = `INSERT INTO players VALUES (4,"punit2", "yadav2", "abrakadabra@gmail.com","8874548221" , "mumbai", "180","87", "male");`;
  //   const sql = `INSERT INTO players VALUES (3,"punit2","yadav", "punit@gmail.com", "8872235151","etah","170","87","male");`;
  const values = [
    firstName,
    lastName,
    email,
    mobile,
    city,
    height,
    weight,
    gender,
  ];

  db.query(sql, (error, results) => {
    if (error) {
      console.log("Error:", error);
      res.sendStatus(500);
    } else {
      console.log("Registration successful");
      res.sendStatus(200);
    }
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
