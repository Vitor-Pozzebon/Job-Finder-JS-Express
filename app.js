const express = require("express");
const app = express();
const db = require("./db/connection");
const bodyParser = require("body-parser");
const { engine } = require('express-handlebars');
const path = require("path");
const Job = require("./models/Job");

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`);
});

// body-parser
//app.use(bodyParser, bodyParser.urlencoded({extended: false})); - linha usada no curso, não funcionou
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear dados URL-encoded com a opção 'extended' explícita

//handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, "public")));

// db connection
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso!");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar com o banco: ", err);
    });

// routes
app.get("/", (req, res) => {
    Job.findAll({order: [
        ["createdAt", "DESC"]
    ]})
    .then(jobs => {
        res.render("index", {jobs});
    });

});

// jobs routes
app.use("/jobs", require("./routes/jobs"));