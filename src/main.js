import { CLI } from "cliffy";

const cli = new CLI()
    .setDelimiter("$ ")
    .addCommand("exit", {
        description: "Exit the tool",
        action: (params, options) => {
            console.log("Exiting");
            cli.hide();
        }
    })
    .addCommand("run", {
        description: "Run somewhere",
        options: [{ label: "quickly", description: "Run quickly" }],
        parameters: ["destination"],
        action: (params, options) => {
            if (options.quickly) {
                console.log(`I ran to ${params.destination} quickly`)
                return;
            }

            console.log(`I ran to ${params.destination}`)
        },
        subcommands: {
            to: {
                description: "Run to a destination",
                parameters: ["destination"],
                action: params => console.log(`I ran to ${params.destination}`)
            },
            from: {
                description: "Run from a destination",
                parameters: ["location"],
                action: params => console.log(`I ran from ${params.location}`)
            }
        }
    })
    .show();