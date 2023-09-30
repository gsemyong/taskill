import { addTask, searchTaskers, updateProfile } from "api";
import { MyContext, MyConversation } from "./types";
import { bot } from "./bot";

export async function customerAddNewTaskConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  if (!ctx.from?.id) {
    throw new Error("No user ID found");
  }

  await ctx.reply("Let's add a new task! Describe your task.");
  let { message: descriptionMessage } = await conversation.wait();

  if (!descriptionMessage) {
    throw new Error("No message found");
  }

  const description = descriptionMessage.text;

  if (!description) {
    throw new Error("No description found");
  }

  await addTask({
    customerId: ctx.from.id,
    description,
  });

  const taskers = await searchTaskers(description);

  for (const tasker of taskers) {
    const { user } = await bot.api.getChatMember(tasker.chatId, tasker.userId);

    await bot.api.sendMessage(tasker.chatId, "New task is available for you!");

    await bot.api.sendMessage(
      tasker.chatId,
      `${description}\n\n@${user.username}`
    );
  }

  await ctx.reply("Task added successfully!");
}

export async function taskerOnboardingConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  if (!ctx.from?.id) {
    throw new Error("No user ID found");
  }

  await ctx.reply(
    "Let's get started! In order to start receiving tasks you need to fill in your profile information. Please provide exact and full information about the services you provide."
  );
  let { message: profileMessage } = await conversation.wait();

  if (!profileMessage) {
    throw new Error("No message found");
  }

  const profile = profileMessage.text;

  if (!profile) {
    throw new Error("No description found");
  }

  await updateProfile({
    userId: ctx.from.id,
    profile,
  });

  await ctx.reply(
    "Profile successfully updated! You can now start receiving tasks. When a customer posts a task that matches your qualification, you will receive a notification with task details and customer's contact info. You can then contact the customer and agree on the details of the task. Once the task is completed, you can mark it as finished and receive payment."
  );
}

export async function taskerEditProfileConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  if (!ctx.from?.id) {
    throw new Error("No user ID found");
  }

  await ctx.reply(
    "Enter your new profile information. Please provide exact and full information about the services you provide."
  );

  let { message: profileMessage } = await conversation.wait();

  if (!profileMessage) {
    throw new Error("No message found");
  }

  const profile = profileMessage.text;

  if (!profile) {
    throw new Error("No description found");
  }

  await updateProfile({
    userId: ctx.from.id,
    profile,
  });

  await ctx.reply("Profile successfully updated!");
}
