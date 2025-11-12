import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const DEV_FALLBACK_PORT = 4000;
const PORT = process.env.PORT || DEV_FALLBACK_PORT;

const app: Application = express();

// Enable CORS
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.redirect("/health");
});

app.listen(PORT, () => {
  console.log(`💰 Server is running on http://localhost:${PORT}`);
});
