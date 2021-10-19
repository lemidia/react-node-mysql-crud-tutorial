const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "employee_system",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "insert employees (name, age, country, position, wage) values (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("successfully inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => [
  db.query("select * from employees", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  }),
]);

app.listen(3001, () => {
  console.log("server is running on port " + 3001);
});
