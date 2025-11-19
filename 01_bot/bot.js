const TelegramBot = require("node-telegram-bot-api");

// BotFather se jo token mila hai vo yahan daalo
const token = "Make_your_own_token";

// Bot ko polling mode me run kar raha hai -> Always active
const bot = new TelegramBot(token, { polling: true });

// Jab koi message bhejta hai -> ye function run hota hai
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Simple reply to all messages
  //bot.sendMessage(chatId, `Aapne likha: ${text}`);
  bot.sendMessage(chatId, `Testing bot: ${text}`);
});
