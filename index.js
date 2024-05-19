import express from "express";
import bodyParser from "body-parser";


const app = express();

const port = 3000;
let store = [];
let content ;
let container ;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  res.render("index.ejs", {store: store || 'hi'});
});


//Routes to new post page
app.get("/new", (req, res) => {

  res.render("new_post.ejs", 
  //{year: year}
  );
});

// Handles Editing operations for posts

// Handles viewing each blog post clicked
app.get("/:id", (req, res) => {
  
  for (let item of store) {
    if(item.title === req.params.id) content = item;
  }

  res.render("content.ejs", 
  
  {store: content || "hi"}
  );
});

app.get("/edit/:id", (req, res) => {
  // filtering of specific post
  for (let item of store) {
    if(item.title === req.params.id) container = item;
  }

res.render("edit_post.ejs"
  ,{store: container ||"hi" }
  );
});

//Handles delete operations alao note request.params.id is the title of every post
app.get("/delete/:id", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  
  let checker = req.params.id;
  console.log(store, "del", checker)
  store = store.filter( i => i.title !== checker);


  res.redirect("/"
  );
});

// handles all post requests edit and new posts
app.post("/submit", (req, res) => {
  let data = req.body;
  //console.log(data)
  let title = data.title;
  let index = store.findIndex(i => i.title === title);
  if (index === -1) store.unshift(data) ;//Rearranging to ensure that latest post is stored at index 0
  else store[index] = data;
  //console.log("This is the stored data: ", store, 'and', index)

  res.render("index.ejs"
  ,{store: store || "hi" }
  );
 

});



app.listen(port , () => {
    console.log(`Example app listening on port ${port}`)
  });