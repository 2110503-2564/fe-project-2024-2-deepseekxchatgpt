// @/libs/getBannedUsers.tsx
export default async function getBannedUsers(token: string): Promise<string[]> {
  const response = await fetch(
    "https://deepseekxchatgpt-backend.vercel.app/api/v1/banned",
    {
      //  API endpoint to fetch banned users
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    if (errorData.message) {
      throw new Error(errorData.message);
    } else {
      throw new Error("Failed to fetch banned users. Please try again later.");
    }
  }

  const data = await response.json();
  // Extract user IDs from the banned users list
  const bannedIds = data.map((bannedUser: { user: string }) => bannedUser.user);
  return bannedIds;
}
