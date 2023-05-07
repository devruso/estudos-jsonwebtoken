require("dotenv").config();
const express = require("express");
const app = express();
// bcrypt é assincrona, logo tds funções precisam ser tb
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./authServer");



app.use(express.json());


const users = [];

app.get("/users", (req, res) =>{
     res.json(users);
});

app.post("/users", async (req, res)=>{
    try{
        //a variavel cripto define a criptografia da senha no segundo parametro do método hash()
        const cripto = await bcrypt.genSalt();
        // não é necessario criar uma variavel para a criptografia, o segundo parametro tem como base 10
        const senhaCripto = await bcrypt.hash(req.body.senha,cripto)
        const user = {nome: req.body.nome, senha:senhaCripto };
        console.log(cripto);
        console.log(senhaCripto);
        users.push(user);
        res.status(201).json(users);

    }catch(err){
        console.log(err);
        res.status(500);
    }
})



app.get("/posts",authenticateToken, (req, res) =>{
    res.json(posts);
}); 





app.listen(3000);