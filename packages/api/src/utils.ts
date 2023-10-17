import { bot } from "bot";
import { ReplyMarkup } from "./types";
import { getUser } from "./users";

export async function sendNotification({
  userId,
  text,
  replyMarkup,
}: {
  userId: number;
  text: string;
  replyMarkup?: ReplyMarkup;
}) {
  const user = await getUser({
    userId,
  });

  await bot.api.sendMessage(user.chatId, text, {
    reply_markup: replyMarkup,
  });
}
