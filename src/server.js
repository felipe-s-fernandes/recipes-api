import express from "express";
import { config } from "dotenv";

import router from "./router.js";

export default class Server {
  constructor() {
    this.app = express();
  }

  #configEnvironment() {
    config();

    this.port = process.env.SERVER_PORT ?? 3000;
    this.hostname = process.env.SERVER_HOSTNAME ?? "localhost";
  }

  start() {
    this.#configEnvironment();

    this.app.use(express.json());

    this.app.use(router);

    this.app.listen(this.port, () => {
      console.log(`Server running on http://${this.hostname}:${this.port}`);
    });
  }
}
