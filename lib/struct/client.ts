import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import { Command, Event } from "./utils";
import { event as MessageEventPreload} from './preload/messageEvent'
import { CommandHandlerOptions, EventHandlerOptions, ClientOptions } from './utils/ctypes'

export class NevClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public aliases: Collection<string, Command> = new Collection();
  public CommandOptions: CommandHandlerOptions
  public EventOptions: EventHandlerOptions
  public ClientOptions: ClientOptions
  /**
   *
   * @param commandOptions Here you put the options for commands
   * @param eventOptions Here you put the options for the event
   * @param clientOptions Here you put the options for the client
   *
   * THE PATH READ TWO DIRS, example: dir/dir/file, commands/util/ping
   * same with events: dir/dir/file, events/guildMember/guildMemberAdd
   */
  configuration(commandOptions: CommandHandlerOptions, eventOptions: EventHandlerOptions, clientOptions: ClientOptions) {
    let dc = commandOptions
    this.CommandOptions = { path: commandOptions.path, blockBot: commandOptions.blockBot ?? true, defaultCooldown: commandOptions.defaultCooldown ?? 0, ignoreCooldownUsers: commandOptions.ignoreCooldownUsers ?? [], ignoreUsers: commandOptions.ignoreUsers ?? [], prefix: commandOptions.prefix ?? '!', prefixMention: commandOptions.prefixMention ?? false, }
    this.EventOptions = { path: eventOptions.path }
    this.ClientOptions = { ownersID: clientOptions.ownersID ?? [], prefix: clientOptions.prefix ?? '!', token: clientOptions.token, }
    try {
      readdirSync(commandOptions.path).forEach(async (dir) => {
        let commands = readdirSync(`${commandOptions.path}/${dir}`).filter((res) => {
          res.endsWith(".ts");
        });
        for (const file of commands) {
          const { command } = require(`${dc.path}/${dir}/${file}`);
          this.commands.set(command.name, command);
          if (command?.aliases.lenght !== 0 || command?.aliases) {
            command.aliases.forEach((alias) => {
              this.aliases.set(alias, command);
            });
          }
        }
      });
    } catch (error) {
      Error(
        "The folder where the commands are located could not be found. [command_handler]"
      );
    }
    try {
      let ec = eventOptions;
      let z: number
      readdirSync(eventOptions.path).forEach(async (dir) => {
        var event = readdirSync(`${ec.path}/${dir}`).filter((res) => {
          res.endsWith("ts");
        });
        for (const file of event) {
          const { event } = require(`${ec.path}/${dir}/${file}`);
          this.events.set(event.name, event);
          this.events.set("messageCreate", MessageEventPreload)
          this.on(event.name, event.run.bind(null, this));
        }
      });
    } catch (error) {
      Error(
        "The folder where the events are located could not be found. [event_handler]"
      );
    }
  }
  run() {
    try {
      this.login(this.ClientOptions.token);
    } catch (err) {
      throw new Error("The entered token is wrong. [login_client]");
    } finally {
    }
  }
}