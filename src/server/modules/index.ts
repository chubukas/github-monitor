import express from "express";
import RoutesV1 from "./v1";

const Routes = express();

Routes.use("/api/v1", RoutesV1);

export { Routes };
