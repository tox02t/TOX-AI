const { Client, GatewayIntentBits } = require('discord.js');

// إعداد صلاحيات البوت (Intents)
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`تم تسجيل الدخول بنجاح! البوت شغال باسم: ${client.user.tag}`);
});

// مثال على أمر بسيط للاختبار (يقري رسالة ping ويرد pong)
client.on('messageCreate', message => {
  if (message.author.bot) return;
  
  if (message.content === '!ping') {
    message.reply('Pong! 🏓 البوت شغال 24 ساعة بدون توقف.');
  }
});

// تسجيل الدخول باستخدام التوكن المخزن في بيئة العمل
client.login(process.env.TOKEN);
