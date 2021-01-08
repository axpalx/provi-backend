import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AddressInfo } from "net";
import { userRouter } from "./routes/userRouter";

dotenv.config();

export const app = express();

app.use(cors({ origin: true }));
app.use(express.json());


        app.use("/user", userRouter);

export default app;

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
