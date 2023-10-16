import { bot } from "bot";
import { getUser } from "./users";
import { InlineKeyboard } from "grammy";
import { env } from "./env";

export async function notifyCustomerOfNewProposal({
  customerId,
  proposalId,
}: {
  customerId: number;
  proposalId: string;
}) {
  const customer = await getUser({
    userId: customerId,
  });

  const inlineKeyboard = new InlineKeyboard().webApp(
    "View Proposal",
    `${env.WEB_APP_URL}/customer/proposal/${proposalId}`
  );

  bot.api.sendMessage(customer.chatId, "You have a new proposal!", {
    reply_markup: inlineKeyboard,
  });
}
