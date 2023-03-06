import express from "express";

import { Request, Response } from "express";
import {
  getData,
  editData,
  getActiveData,
  getCertainData,
  deleteCompletedData,
  deleteData,
  getCompletedData,
  postData,
  markData,
} from "../Controller/userController";
const app = express();
export default app.get("/", (_req: Request, res: Response) => {
  getData(res);
});
app.get("/active", (_req: Request, res: Response) => {
  getActiveData(res);
});
app.get("/completed", (_req: Request, res: Response) => {
  getCompletedData(res);
});

app.get("/:id", (req: Request, res: Response) => {
  getCertainData(req, res);
});
app.post("/", (req: Request, res: Response) => {
  postData(req, res);
});

app.delete("/:id", (req: Request, res: Response) => {
  deleteData(req, res);
});
app.delete("/", (_req: Request, res: Response) => {
  deleteCompletedData(res);
});

app.put("/:id", (req: Request, res: Response) => {
  if (req.body.completed === 0 || req.body.completed === 1) {
    markData(req, res);
  } else {
    editData(req, res);
  }
});
