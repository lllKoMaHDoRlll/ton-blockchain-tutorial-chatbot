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

bot.launch();
