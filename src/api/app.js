const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mySqlConnection = require("./dbConnection");
const queryPromise = require("./promise");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  getData(res);
});
app.get("/active", (req, res) => {
  getActiveData(res);
});
app.get("/completed", (req, res) => {
  getCompletedData(res);
});

app.get("/:id", (req, res) => {
  getCertainData(req, res);
});
app.post("/", (req, res) => {
  postData(req, res);
});

app.delete("/:id", (req, res) => {
  deleteData(req, res);
});
app.delete("/", (req, res) => {
  deleteCompletedData(res);
});

app.put("/:id", (req, res) => {
  if (req.body.completed === 0 || req.body.completed === 1) {
    markData(req, res);
  } else {
    editData(req, res);
  }
});

async function editData(req, res) {
  let condition = req.params.id;
  let content = req.body.task;
  const updateTaskContent =
    "UPDATE todo SET task = '" + content + "' where id = " + condition + " ";
  try {
    const result = await queryPromise(updateTaskContent, mySqlConnection);
    res.status(205).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

async function postData(req, res) {
  const task = { task: req.body.task };
  const taskName = task.task;
  const taskDefault = false;
  const insertNewTask =
    "INSERT into todo(task, completed) VALUES ('" +
    taskName +
    "'," +
    taskDefault +
    ")";
  try {
    const result = await queryPromise(insertNewTask, mySqlConnection);
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

async function deleteData(req, res) {
  let id = req.params.id;
  const deleteTask = "DELETE from todo where id = " + id + "";
  try {
    const result = await queryPromise(deleteTask, mySqlConnection);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

async function deleteCompletedData(res) {
  const deleteCompletedTasks = "DELETE from todo where completed = 1";
  try {
    const result = await queryPromise(deleteCompletedTasks, mySqlConnection);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}
async function getData(res) {
  const selectAllTasks = "SELECT * from todo";
  //queryPromise -> async await
  //get data->send->catch
  try {
    const result = await queryPromise(selectAllTasks, mySqlConnection);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

async function getActiveData(res) {
  const selectActiveTasks = "SELECT * from todo where completed = 0";
  try {
    const result = await queryPromise(selectActiveTasks, mySqlConnection);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}
async function getCompletedData(res) {
  const selectCompletedTasks = "SELECT * from todo where completed = 1";
  try {
    const result = await queryPromise(selectCompletedTasks, mySqlConnection);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}
async function getCertainData(req, res) {
  let condition = req.params.id;
  const selectCertainTask = "SELECT * from todo where id = " + condition + "";
  try {
    const result = await queryPromise(selectCertainTask, mySqlConnection);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}
async function markData(req, res) {
  let condition = req.params.id;
  let status = req.body.completed;
  const updateTaskStatus =
    "UPDATE todo SET completed = " + status + " where id = " + condition + " ";
  try {
    const result = await queryPromise(updateTaskStatus, mySqlConnection);
    res.status(204).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}
module.exports = app;
