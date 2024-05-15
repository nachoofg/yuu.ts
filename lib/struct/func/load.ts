import { writeFile } from "fs";

export async function LoadCmdInter(args: any, debug: boolean = false) {
  writeFile(__dirname+"../../inter/cmd.ts", args, function (err) {
    if (debug == true) {
      if (err) throw new Error(err.message);
      console.debug(
        `Interface update correctly.\n\n\nInterface load:\n${args}`
      );
    } else return;
  });
}

export async function LoadEventInter(args: any, debug: boolean = false) {
  writeFile(__dirname+"../../inter/event.ts", args, function (err) {
    if (debug == true) {
      if (err) throw new Error(err.message);
      console.debug(
        `Interface update correctly.\n\n\nInterface load:\n${args}`
      );
    } else return;
  });
}
