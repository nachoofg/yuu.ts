/**
* Do not give importance to this file, this file is simply tests for the implementation
 * from an idea that occurred to me. But in the end it will not be implemented since for
 */

import { writeFile } from "fs";

export async function LoadCmdInter(args: any, debug: boolean = false) {
  writeFile(__dirname + "../../inter/cmd.ts", args, function (err) {
    if (debug == true) {
      if (err) throw new Error(err.message);
      console.debug(
        `Interface update correctly.\n\n\nInterface load:\n${args}`
      );
    } else return;
  });
}

export async function LoadEventInter(args: any, debug: boolean = false) {
  writeFile(__dirname + "../../inter/event.ts", args, function (err) {
    if (debug == true) {
      if (err) throw new Error(err.message);
      console.debug(
        `Interface update correctly.\n\n\nInterface load:\n${args}`
      );
    } else return;
  });
}
