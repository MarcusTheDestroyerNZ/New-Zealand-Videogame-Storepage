import { db } from '$lib/server/db'; // Path to your drizzle connection
import { user } from '$lib/server/db/schema';

export const load = async () => {
  const allUsers = await db.select().from(user);
  
  return {
    userList: allUsers
  };
};