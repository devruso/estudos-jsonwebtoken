require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");



app.use(express.json());

app.post("/users/login", async(req,res) =>{
    const user = users.find(user => req.body.name === user.name);
    const acesso = generateAccessToken(user);
    const refreshAcesso = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    if(user === null){
        res.status(400);
    }
    try{
        // primeiro parametro da compare é a senha que o usuario está ponto, o segundo é a senha criptografada
       if(await bcrypt.compare(req.body.senha, user.senha)){
        res.json({accessToken: acesso, refreshToken: refreshAcesso});
       }else{
        res.status(400).send("senha errada");
       };
    }catch(err){
        console.log(err);
        res.status(500).send();
    }
})

export function authenticateToken(req, res, next){
    //pega  o atributo authorization do get
    const header = req.headers['authorization'];
    console.log(header);
    // separa o token no primeiro espaco
    const token = header && header.split(' ')[1];
    if(token === null) return res.status(401);
    // verifica o resto do corpo do authorization e compara com o token de acesso
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.status(403).send("token not allowed");
        req.user = user;
        next();
    }
)    
}


 export function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'15s'});
}


app.listen(4000);