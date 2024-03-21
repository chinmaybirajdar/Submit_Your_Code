const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

app.use(cors(
  {
    origin: ["https://submit-your-code-frontend.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(bodyParser.json());
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.post("/user", (req, res) => {
  console.log(req.body);

  var con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  });
  let date = new Date();
  // username, programming_language, stdin, source_code
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected...!!!");
    var sql = `INSERT INTO info (username, programming_language, stdin, source_code, curr_time) VALUES("${
      req.body.user
    }", "${req.body.lang}", "${req.body.stdin}", "${
      req.body.sourcecode
    }", "${date.toISOString().slice(0, 19).replace("T", " ")}")`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Record inserted...", result);
    });
  });

  res.json({
    status: "success",
    name: req.body.user,
  });
});

app.get("/user", (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Chinmay@123",
    database: "db",
  });

  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM info", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json({
        status: "success",
        result,
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
