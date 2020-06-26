const express = require ("express");
const app = express();
const { mongoose } = require("./db")
const cors =require("cors");

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));


app.use("/", require("./server/route/routes.js"));

app.listen(3000,(req,res)=>{
    console.log("Servidor Listo");
});