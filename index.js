const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ضع هنا آيدي الروم الممنوع الكتابة فيه (انسخ آيدي الروم من ديسكورد وضعه بين القوسين)
const FORBIDDEN_CHANNEL_ID = 'ضع_آيدي_روم_التحذير_هنا';

client.once('ready', () => {
    console.log(`تم تسجيل الدخول بنجاح كـ ${client.user.tag} وحماية السيرفر مفعلة! 🛡️`);
});

client.on('messageCreate', async message => {
    // تجاهل رسائل البوتات لكي لا يحذفوها بأنفسهم
    if (message.author.bot) return;

    // التحقق مما إذا كانت الرسالة مرسلة في الروم الممنوع
    if (message.channel.id === FORBIDDEN_CHANNEL_ID) {
        try {
            // 1. حذف الرسالة المخالفة فوراً (سواء كانت صورة أو رابط ملغم)
            await message.delete();
            
            // 2. إرسال تنبيه مؤقت للعضو يختفي بعد 5 ثوانٍ
            const warningMsg = await message.channel.send(`⚠️ **${message.author.username}**، ممنوع الكتابة أو إرسال صور في هذا الروم نهائياً! تم حذف رسالتك للحماية.`);
            setTimeout(() => warningMsg.delete().catch(() => {}), 5000);

        } catch (error) {
            console.error('حدث خطأ أثناء محاولة حذف الرسالة:', error);
        }
    }
});

// ضع التوكن الخاص بك هنا
client.login('ضع_التوكن_هنا');
