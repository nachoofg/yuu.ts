import { ClientEvents } from "discord.js";
import { NevClient } from "../client";
/**
 * This modified interface will necessarily need these 2 properties: name (ClientEvents), run (run)
 */
export interface Event {
  name: keyof ClientEvents;
  run: run;
}
/**
 * This modified interface will necessarily need these 2 properties: Client (NevClient), run (...any[])
 */
interface run {
  (Client: NevClient, ...args: any[]);
}
