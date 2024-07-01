import { config } from "dotenv";
import http from "http";
import routes from "@/routes/index";

config();

const PORT = process.env.PORT || 3006;

const server = http.createServer((req, res) => {
  routes(req, res);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
