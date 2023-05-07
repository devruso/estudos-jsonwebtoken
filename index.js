const dotenv = require("dotenv");
const express = require("express");
// bcrypt é assincrona, logo tds funções precisam ser tb
const bcrypt = require("bcrypt")
const app = express();
app.use(express.json());



const posts = [
    {
        nome: "Jamilson Pestana",
        senha:"123456"
    },
    {
        nome: "Jamilson Pestana2",
        senha:"123456"
    }
];
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

app.post("/users/login", async(req,res) =>{
    const user = users.find(user => req.body.name === user.name);
    if(user === null){
        res.status(400);
    }
    try{
        // primeiro parametro da compare é a senha que o usuario está ponto, o segundo é a senha criptografada
         
       if(await bcrypt.compare(req.body.senha, user.senha)){
        res.send("Td certo");
       }else{
        res.status(400).send("senha errada");
       };
    }catch(err){
        console.log(err);
        res.status(500).send();
    }
})

app.get("/posts", (req, res) =>{
    res.json(posts);
}); 

app.get("/login", (req, res) =>{
    app.get()
})




app.listen(3000);