import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const posts = [];
let currentDate;

app.get("/", (req, res) => {
  if (!currentDate) {
    currentDate = new Date().toLocaleString();
  }
  res.render("index.ejs", {
    posts: posts,
    currentDate: currentDate,
    currentYear: new Date().getFullYear(),
  });
});

app.post("/posts", (req, res) => {
  const { btitle, bcontent } = req.body;

  const newPost = {
    title:btitle,
    content:bcontent,
    date: new Date().toLocaleString(),
  };
  posts.push(newPost);

  res.redirect("/");
});

app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  posts[id].title = title;
  posts[id].content = content;

  res.sendStatus(200);
});

app.delete("/posts/:id", (req,res) => {
  const { id } = req.params;

  posts.splice(id,1);
  res.sendStatus(200);
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});