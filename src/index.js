
export default {
  async fetch(request, env) {
    if (request.method === "GET") {
      return new Response("ARASH AI OS is running!");
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const update = await request.json();
      const message = update.message;

      if (!message?.chat || !message?.text) {
        return new Response("OK");
      }

      const chatId = message.chat.id;
      const text = message.text.trim();

      let reply;

      if (text === "/start") {
        reply =
          "سلام آرش! 🤖\n\n" +
          "به ARASH AI OS خوش اومدی.\n" +
          "سیستم اولیه با موفقیت فعال شده.";
      } else {
        reply = "پیامت دریافت شد:\n" + text;
      }

      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: reply
          })
        }
      );

      if (!telegramResponse.ok) {
        return new Response("Telegram API error", { status: 502 });
      }

      return new Response("OK");
    } catch {
      return new Response("Invalid request", { status: 400 });
    }
  }
};
