import { bot } from "bot";
import { db, users } from "db";
import { eq } from "drizzle-orm";
import { searchDb, type Tasker, taskersSchema } from "search-db";

export async function createUser({
  id,
  chatId,
}: {
  id: number;
  chatId: number;
}) {
  await db
    .insert(users)
    .values({
      id,
      chatId,
    })
    .onConflictDoNothing();
}

export async function setTaskerInfo({
  taskerId,
  fullName,
  profile,
}: {
  taskerId: number;
  fullName: string;
  profile: string;
}) {
  const result = await db
    .update(users)
    .set({
      fullName,
      profile,
    })
    .where(eq(users.id, taskerId))
    .returning({
      chatId: users.chatId,
    });

  const chatId = result[0].chatId;

  await searchDb.collections<Tasker>(taskersSchema.name).documents().upsert(
    {
      id: taskerId.toString(),
      user_id: taskerId,
      chat_id: chatId,
      profile,
    },
    {
      action: "emplace",
    }
  );
}

export async function getTaskerInfo({ taskerId }: { taskerId: number }) {
  const taskerInfo = await db.query.users.findFirst({
    columns: {
      fullName: true,
      profile: true,
    },
    where: eq(users.id, taskerId),
  });

  if (!taskerInfo) {
    throw new Error("No tasker found");
  }

  return {
    fullName: taskerInfo.fullName!,
    profile: taskerInfo.profile!,
  };
}

export async function searchTaskers({
  taskDescription,
}: {
  taskDescription: string;
}) {
  const { hits } = await searchDb
    .collections<Tasker>(taskersSchema.name)
    .documents()
    .search({
      q: taskDescription,
      query_by: "profile,embedding",
      exclude_fields: "embedding",
      per_page: 10,
    });

  if (!hits) {
    throw new Error("No hits found");
  }

  console.log(hits);

  return hits.map((hit) => ({
    userId: hit.document.user_id,
    chatId: hit.document.chat_id,
    profile: hit.document.profile,
  }));
}

export async function getUser({ userId }: { userId: number }) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("No user found");
  }

  return user;
}

export async function getUsername({ userId }: { userId: number }) {
  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      chatId: true,
    },
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("No user found");
  }

  const { user: chatUser } = await bot.api.getChatMember(user.chatId, userId);

  if (!chatUser.username) {
    throw new Error("No username found");
  }

  return chatUser.username;
}
