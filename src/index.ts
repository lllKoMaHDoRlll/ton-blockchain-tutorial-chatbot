import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();


const bot = new Telegraf(process.env.TG_BOT_TOKEN!);
