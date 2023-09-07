const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//create a todo

app.post("/todos", async (req, res) => {
    try {
      const { title } = req.body;
      const { description } = req.body;
      const { src } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO fluent( title, description, src) VALUES($1, $2, $3) RETURNING *",
        [title, description, src]
      );
  
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //get all todos
  
  app.get("/todos", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM fluent");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //get a todo
  
  app.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM fluent WHERE fluent_id = $1", [
        id
      ]);
  
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //update a todo
  
  app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const { title } = req.body;
      const { src } = req.body;
      const updateTodo = await pool.query(
        "UPDATE fluent SET title = $2, description=$3, src=$4 WHERE fluent_id = $1",
        [description, id]
      );
  
      res.json("Fluent was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //delete a todo
  
  app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM fluent WHERE fluent_id = $1", [
        id
      ]);
      res.json("Fluent was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
  
app.listen(5001, () => {
    console.log("server has started on port 5001");
})