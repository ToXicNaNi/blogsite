import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

let posts = [];

app.get("/",(req, res) => {
    res.render("index",{posts:posts});
});

let idCounter = 1;

app.post("/create",(req, res) => {
    const post = {
        id: idCounter++,
        title: req.body.title,
        content: req.body.content
    }
    posts.push(post);
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    res.render("edit",{ post:post });
});

app.post("/update/:id", (req, res) => {
    const postIndex = posts.findIndex(p => p.id === Number(req.params.id))
    posts[postIndex] = {
        id: Number(req.params.id),
        title: req.body.title,
        content: req.body.content,
    }
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`Listen on port ${port}.`);
});