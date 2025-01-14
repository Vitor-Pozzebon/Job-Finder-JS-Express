const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.get("/test", (req, res) => {
    res.send("Deu certo.");
});

// adicionar um job via post
router.post("/add", (req, res) => {
    let {title, salary, company, description, email, new_job} = req.body;

    // inserir no banco
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect("/"))
    .catch(err => console.log(err));
});

module.exports = router;