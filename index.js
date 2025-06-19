const TelegramBot = require("node-telegram-bot-api");

// بيانات البوت
const TOKEN = "8093986475:AAHy5IWW_d7rtzFPm7UrJr817ASgXjjMWUQ";
const CHAT_ID = "-4765048811";

// إنشاء البوت
const bot = new TelegramBot(TOKEN, { polling: true });

// الرد على /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "✅ أهلاً! البوت يعمل وسيقوم بإرسال رسالة يومية الساعة 11:11 مساءً بتوقيت السعودية.");
});

// إذا كان يعمل من GitHub Actions (وضع cron)، أرسل رسالة يومية
if (process.env.MODE === "cron") {
  const message = "🌙 تذكير يومي: لا تنس نيتك الطيبة قبل النوم 💫";
  bot.sendMessage(CHAT_ID, message).then(() => {
    console.log("✅ تم إرسال الرسالة التلقائية.");
    process.exit(0);
  }).catch((err) => {
    console.error("❌ خطأ في الإرسال:", err.message);
    process.exit(1);
  });
}
