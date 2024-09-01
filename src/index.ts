import { Context, Telegraf } from "telegraf";
import dotenv from "dotenv";
import { Address, beginCell, Cell, toNano } from "ton-core";
import qs from "qs";

dotenv.config();

const formTransactionLink = (text: string, amount: bigint, messageBody: Cell): string => {
    return (
        'https://app.tonkeeper.com/transfer/' +
        Address.parse("EQBwYji2MLP888Rf8CsnM5OdvKPZSQvhpwSYz-u3tu4O-G6C").toString({testOnly: true}) + "?" +
        qs.stringify({
            text: text,
            amount: amount.toString(10),
            bin: messageBody.toBoc({idx: false}).toString("base64"),
        })
    );
}

const requestSigningTransaction = (ctx: Context, text: string, link: string) => {
    ctx.reply(text, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Sign transaction",
                    url: link
                }],
            ],
        },
    });
}

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
    
    let link = formTransactionLink("Increment transaction", toNano("0.05"), messageBody);

    requestSigningTransaction(ctx, "To increment counter by 3, please sign a transaction:", link);
});

bot.hears("Deposit 1 TON", (ctx) => {
    const messageBody = beginCell()
        .storeUint(2, 32)
    .endCell();

    let link = formTransactionLink("Deposit funds", toNano("1"), messageBody);

    requestSigningTransaction(ctx, "To deposit 1 TON, please sign a transaction:", link);
});

bot.hears("Withdraw 1 TON", (ctx) => {
    const messageBody = beginCell()
        .storeUint(3, 32)
        .storeCoins(toNano("1"))
    .endCell();
    
    let link = formTransactionLink("Withdraw funds", toNano("0.05"), messageBody);

    requestSigningTransaction(ctx, "To withdraw 1 TON, please sign a transaction:", link);
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
