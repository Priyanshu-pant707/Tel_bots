const TelegramBot = require("node-telegram-bot-api");

// BOT TOKEN
const token = "your token";
const bot = new TelegramBot(token, { polling: true });

// Your personal chat ID (jaha messages forward honge)
const FORWARD_TO = "6041519273"; // <-- Isko enter karna hai

// Keywords list
const KEYWORDS = ["assignment", "exam", "important", "notes", "urgent"];

// Find your chat ID (reply message)
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Welcome ${msg.from.first_name}!  
Send *your chat ID:* ${msg.chat.id}`, { parse_mode: "Markdown" });
});

// MAIN FORWARDING LOGIC
bot.on("message", (msg) => {
  // Only filter group messages
  if (msg.chat.type !== "group" && msg.chat.type !== "supergroup") return;

  const text = msg.text ? msg.text.toLowerCase() : "";

  const found = KEYWORDS.some((word) => text.includes(word));

  if (found) {
    // Forward original message
    bot.forwardMessage(FORWARD_TO, msg.chat.id, msg.message_id);

    // Send extra context
    bot.sendMessage(
      FORWARD_TO,
      `📢 *Important message detected!*

👥 From Group: ${msg.chat.title}
👤 Sender: ${msg.from.first_name}

Message: ${msg.text || "Attachment"}`,
      { parse_mode: "Markdown" }
    );
  }
});
