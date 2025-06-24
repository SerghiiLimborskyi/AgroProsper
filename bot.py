from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Привіт! Я живий 🟢")

app = ApplicationBuilder().token("7171552317:AAEQa_tW8Ae-81ccqbZ6AqspWZGLmJvLzs0").build()
app.add_handler(CommandHandler("start", start))
app.run_polling()
