import express from "express";
import morgan from "morgan";
import config from "./config.js";
import apiRouter from "./router.js";

const app = express();

app.use.(morgan("dev"));

app.use(express.json());
app.use("/api",apiRouter);

app.listen(config.port,()=>{
  console.log(`Server running at: http://localhost:${config.post}`);
})