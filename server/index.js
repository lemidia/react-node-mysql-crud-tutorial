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
        result.message = "Successfully added";
        res.status(200).send(result);
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

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "update employees set wage = ? where id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        res.send(500).send(err);
      } else {
        res.status(200).send("Successfully updated");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  db.query("delete from employees where id = ?", id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Successfully deleted");
    }
  });
});

app.listen(3001, () => {
  console.log("server is listening and running on port " + 3001);
});
