import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { Address, beginCell, toNano } from "ton-core";
import qs from "qs";

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

    const messageBody = beginCell()
        .storeUint(1, 32)
        .storeUint(3, 32)
    .endCell();
    
    let link = 'https://app.tonkeeper.com/transfer/' +
        Address.parse("EQBwYji2MLP888Rf8CsnM5OdvKPZSQvhpwSYz-u3tu4O-G6C").toString({testOnly: true}) + "?" +
        qs.stringify({
            text: "Increment transaction",
            amount: toNano("0.05").toString(10),
            bin: messageBody.toBoc({idx: false}).toString("base64"),
        });

    ctx.reply("To increment counter by 3, please sign a transaction:", {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Sign transaction",
                    url: link
                }],
            ],
        },
    });
});

bot.hears("Deposit 1 TON", (ctx) => {
    const messageBody = beginCell()
        .storeUint(2, 32)
    .endCell();
    
    let link = 'https://app.tonkeeper.com/transfer/' +
        Address.parse("EQBwYji2MLP888Rf8CsnM5OdvKPZSQvhpwSYz-u3tu4O-G6C").toString({testOnly: true}) + "?" +
        qs.stringify({
            text: "Deposit funds",
            amount: toNano("1").toString(10),
            bin: messageBody.toBoc({idx: false}).toString("base64"),
        });

    ctx.reply("To deposit 1 TON, please sign a transaction:", {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Sign transaction",
                    url: link
                }],
            ],
        },
    });
});

bot.hears("Withdraw 1 TON", (ctx) => {
    // sending withdraw transaction
    ctx.reply("Withdrawn 1 TON");
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
