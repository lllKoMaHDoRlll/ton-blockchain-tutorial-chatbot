import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.TG_BOT_TOKEN!);

bot.start((ctx) => {
    ctx.reply("Welcome to counter app!", {
        reply_markup: {
            keyboard: [
                ["Increment by 3"],
                ["Deposit 1 TON"],
                ["Withdraw 1 TON"]
            ],
        },
    });
});

bot.hears("Increment by 3", (ctx) => {
    // sending increment transaction
    ctx.reply("Incremented by 3");
});

bot.hears("Deposit 1 TON", (ctx) => {
    // sending deposit transaction
    ctx.reply("Deposited 1 TON");
});

bot.hears("Withdraw 1 TON", (ctx) => {
    // sending withdraw transaction
    ctx.reply("Withdrawn 1 TON");
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
