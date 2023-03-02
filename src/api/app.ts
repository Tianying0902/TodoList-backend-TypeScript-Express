const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mySqlConnection = require("./dbConnection");
const queryPromise = require("./promise");
import { Request, Response } from 'express';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  getData(res);
});
app.get("/active", (req: Request, res:Response) => {
  getActiveData(res);
}); 
app.get("/completed", (req:Request, res: Response) => {
  getCompletedData(res);
});

app.get("/:id", (req: any, res: any) => {
  getCertainData(req, res);
});
app.post("/", (req: any, res: any) => {
  postData(req, res);
});

app.delete("/:id", (req: any, res: any) => {
  deleteData(req, res);
});
app.delete("/", (req: any, res: any) => {
  deleteCompletedData(res);
});

app.put("/:id", (req:Request, res: Response) => {
  if (req.body.completed === 0 || req.body.completed === 1) {
    markData(req, res);
  } else {
    editData(req, res);
  }
});

async function editData(req:Request, res: Response) {
  let condition = req.params.id;
  let content= req.body.task;
  const updateTaskContent =
    "UPDATE todo SET task = '" + content + "' where id = " + condition + " ";
  try {
    const result = await queryPromise(updateTaskContent, mySqlConnection);
    res.status(205).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function postData(req:Request,res:Response) {
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
    res.status(404).send(err);
  }
}

async function deleteData (req:Request, res:Response){
  let id = req.params.id;
  const deleteTask = "DELETE from todo where id = " + id + "";
  try {
    const result = await queryPromise(deleteTask, mySqlConnection);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function deleteCompletedData(res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }) {
  const deleteCompletedTasks = "DELETE from todo where completed = 1";
  try {
    const result = await queryPromise(deleteCompletedTasks, mySqlConnection);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}
async function getData (res:Response) {
  const selectAllTasks = "SELECT * from todo";
  //queryPromise -> async await
  //get data->send->catch
  try {
    const result = await queryPromise(selectAllTasks, mySqlConnection);
    res.status(200).send(result);
    
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function getActiveData(res:Response) {
  const selectActiveTasks = "SELECT * from todo where completed = 0";
  try {
    const result = await queryPromise(selectActiveTasks, mySqlConnection);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}
async function getCompletedData(res: Response) {
  const selectCompletedTasks = "SELECT * from todo where completed = 1";
  try {
    const result = await queryPromise(selectCompletedTasks, mySqlConnection);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}
async function getCertainData(req:Request, res:Response) {
  let condition = req.params.id;
  const selectCertainTask = "SELECT * from todo where id = " + condition + "";
  try {
    const result = await queryPromise(selectCertainTask, mySqlConnection);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}
async function markData(req:Request, res:Response) {
  let condition = req.params.id;
  let status = req.body.completed;
  const updateTaskStatus =
    "UPDATE todo SET completed = " + status + " where id = " + condition + " ";
  try {
    const result = await queryPromise(updateTaskStatus, mySqlConnection);
    res.status(204).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}
module.exports = app;
