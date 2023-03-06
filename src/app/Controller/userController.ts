import mySqlConnection from "../Models/dbConnection";
import queryPromise from "../Models/promise";
import { Request, Response } from "express";

async function editData(req: Request, res: Response) {
  let condition = req.params.id;
  let content = req.body.task;
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

async function postData(req: Request, res: Response) {
  const task = { task: req.body };
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

async function deleteData(req: Request, res: Response) {
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

async function deleteCompletedData(res: Response) {
  const deleteCompletedTasks = "DELETE from todo where completed = 1";
  try {
    const result = await queryPromise(deleteCompletedTasks, mySqlConnection);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}
async function getData(res: Response) {
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

async function getActiveData(res: Response) {
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
async function getCertainData(req: Request, res: Response) {
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
async function markData(req: Request, res: Response) {
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
export {
  getData,
  editData,
  getActiveData,
  deleteData,
  getCertainData,
  getCompletedData,
  deleteCompletedData,
  postData,
  markData,
};
