import { createInterface } from "node:readline/promises";
import LottoController from "./js/controllers/step1/LottoController.js";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

new LottoController(readline);
