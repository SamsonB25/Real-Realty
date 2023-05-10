import express from "express";
import router from "./routers/route.js";

const app = express();
app.use(express.json());
app.use("/", router);
app.use(express.static("public"));
export default app;
