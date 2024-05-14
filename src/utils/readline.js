import readlinePromises from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const readline = readlinePromises.createInterface({ input, output });
