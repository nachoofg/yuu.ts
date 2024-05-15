import { ClientEvents } from "discord.js";
import { NevClient } from "../client";

export interface Event {
  name: keyof ClientEvents;
  run: run;
}
interface run {
  (Client: NevClient, ...args: any[]);
}
