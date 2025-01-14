const express = require("express");
const app = express();
const db = require("./db/connection");
const bodyParser = require("body-parser");

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`);
});

// body-parser
//app.use(bodyParser, bodyParser.urlencoded({extended: false})); - linha usada no curso, não funcionou
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear dados URL-encoded com a opção 'extended' explícita

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
    res.send("Está funcionando...");
});

// jobs routes
app.use("/jobs", require("./routes/jobs"));