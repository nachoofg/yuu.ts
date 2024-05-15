# Setting Up

Installation:

`npm i aura-c`

`npm i discord.js`

PD:You can use javascript or typescript, but in this case i use djs v13 and typescript

After you have installed everything, the structure should be something like this:

```
bot
    + node_modules
    - index.ts
```

## Main file (index.ts)

Inside the file `index.ts` you must require` aura-c` and its constructor `AuraClient`, this must be converted into a variable to use its two methods.

An example:

```ts
import { AuraClient } from "aura-c";
/**
 * For v13 you need to put the intents, some like this:
 * import {Intents} from 'discord.js'
 * const bot = new AuraClient({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ]})
 *
 * For v12 you dont need to put the intents.
 */
const bot = new AuraClient({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});
// Now you need to input the path of command handler and event handler
bot.paths(`${__dirname + "./command"}`, `${__dirname + "./events"}`); //For example, you can use path
/** 
 * Warning:
 *
 * THE PATH READ TWO DIRS, example: dir/dir/file, commands/util/ping
 * same with events: dir/dir/file, events/guildMember/guildMemberAdd
 * 
 * now you need to run
 * 
 * the first parameter its the token, and the second its the prefix
 */
bot.run('super secret token', '!').then(() =>{
    // Here you can use .then to log when the bot its online.
    console.log('im ready.')
})
```
# How to do commands.
## Ping command example:
```ts
// You need to import the Command interface for more help.
import {Command} from 'aura-c'
// Now you need to export a constant or variable

// THE NAME OF THE CONSTANT/VARIABLE MUST BE CALLED 'command'

export const command:Command = { 
    /** Here the options, by default the parameters are:
     * name:string
     * aliases: string[],
     * run (equivalence of Client, equivalence of Message, equivalence of Arguments)
    */
   name:'ping',
   aliases:[],// You can leave it blank if you don't want to use aliases, if you leave it like this: [''] the commands are likely to fail.
   run: async(client, message, args) =>{
       return message.reply(`My ping its: ${client.ws.ping}`);
   }
}
```

# How to do a event:
## messageCreate event

```ts
// You need to import the Command interface for more help.
import {Event, Command} from 'aura-c'
// Now you need to export a constant or variable

// THE NAME OF THE CONSTANT/VARIABLE MUST BE CALLED 'event'

export const event:Event = { 
    /** Here the options, by default the parameters are:
     * name:string
     * run (equivalence of Client, arguments of Event Name)
    */
   name:'messageCreate',
   run: async(client, message) =>{
       if(!message.guild || message.author.bot || !message.content.startsWith(client.prefix)) return

       const args = message.content.slice(client.prefix.length).trim().split(/ +/g),
      cmd = args.shift();
       let command = client.commands.get(cmd) || client.aliases.get(cmd) // Get commands and aliases of collection
       if(!command) return message.reply('Unknown command.')
       else (command as Command).run(client, message, args); // Here you run the command

   }
}
```
And ready, the structure of the bot should look something like this.

```s
    - node_modules
    + index.ts
    - commands
        - utils
            + ping.ts
    - events
        - message
            + message.ts
    + package.json
```