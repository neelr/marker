require("dotenv").config();
var express = require("express");
var short = require("./airtable");
var fs = require("fs");
const app = express();
app.use("/static",express.static(__dirname+"/public"))
app.use(express.urlencoded());
var TEMPLATE = fs.readFileSync("./public/template.html","utf8");

app.get("/",(req,res) => {
    res.sendFile(__dirname+"/views/index.html")
})
app.post("/create",(req,res) => {
    new short(req.body.id,req.body.password,req.body.url,req.body.markdown,res);
})

app.get("/:id",(req,res)=> {
    var rec = new short();
    rec.retrieve(req.params.id,(record,trigg) => {
        if (trigg) {
            if (record.markdown != undefined && record.markdown != "") {
                let buff = TEMPLATE.replace("%title%",record.id);
                res.send(buff.replace("%content%",record.render()));
            } else {
                res.redirect(record.url)
            }
        } else {
            res.send("Record not found.")
        }
    });
});

app.listen(3000,()=> console.log('Marker is a runnin on port 3000!'));