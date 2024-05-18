import { Message } from "discord.js";
import { NevClient } from "../client";

/**
 * This modified interface will necessarily need these 4 properties: name (str), aliases (str[]), ownerOnly (bool), run (run)
 */
export interface Command {
  name: string;
  aliases: string[];
  ownerOnly: boolean;
  run: run;
}
/**
 * This modified interface will necessarily need these 3 properties: client (NevClient), message (Message), args (str[])
 */
interface run {
  (client: NevClient, message: Message, args: string[]);
}
