import { Message } from "discord.js";
import { NevClient } from "../client";

export interface Command {
  name: string;
  aliases: string[];
  ownerOnly: boolean;
  run: run;
}
interface run {
  (client: NevClient, message: Message, args: string[]);
}
