import { Event } from "../utils";
import { Message } from "discord.js";
import { Command } from "../utils";
import { NevClient } from "../client";

export const event: Event = {
    name: 'messageCreate',
    run: async (client: NevClient, message: Message) => {
        const args = message.content.slice(client.ClientOptions.prefix.length).trim().split(/ +/g),
            cmd = client.commands.get(args.shift()) || client.aliases.get(args.shift())
        if (client.CommandOptions.blockBot.valueOf() === true || message.author.bot) return
        if (!message.guild) return
        if (!message.channel.isText()) return
        if (client.CommandOptions.ignoreUsers.includes(message.author.id)) return

        if (cmd.ownerOnly) {
            if (!client.ClientOptions.ownersID.includes(message.author.id)) return
        }

        if (message.mentions.has(client.user) && message.content.startsWith(client.ClientOptions.prefix + cmd.name)) (cmd as Command).run(client, (message as Message), args);
        if (!message.content.startsWith(client.ClientOptions.prefix)) return
        if (cmd) {
            if (client.cooldown.has(message.author.id)) return message.react("⏰");
            (cmd as Command).run(client, (message as Message), args);
            if (!client.CommandOptions.ignoreCooldownUsers.includes(message.author.id)) return;
            client.cooldown.add(message.author.id);
            setTimeout(() => {
                client.cooldown.delete(message.author.id)
            }, Number(client.CommandOptions.defaultCooldown));
        }
    }
}