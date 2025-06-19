const TelegramBot = require("node-telegram-bot-api");

// استخدام التوكن والمعرف من البيئة
const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new TelegramBot(TOKEN, { polling: true });

// عند تشغيل البوت يتم الرد على /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "✅ البوت يعمل الآن وسيقوم بإرسال رسالة يومية تلقائيًا كل يوم الساعة 11:11 مساءً بتوقيت السعودية.");
});

// إرسال الرسالة اليومية تلقائيًا فقط إذا تم استدعاؤه عبر GitHub Actions (بدون polling)
if (process.env.MODE === "cron") {
  const message = "🌙 تذكير يومي: لا تنسَ نيتك الطيبة قبل النوم 💫";
  bot.sendMessage(CHAT_ID, message).then(() => {
    console.log("✅ تم إرسال الرسالة إلى الجروب.");
    process.exit(0);
  }).catch((err) => {
    console.error("❌ خطأ:", err.message);
    process.exit(1);
  });
}
