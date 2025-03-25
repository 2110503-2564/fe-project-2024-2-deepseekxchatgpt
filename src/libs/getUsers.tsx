// @/libs/getUsers.tsx
export default async function getUsers(token: string): Promise<any[]> {
  const response = await fetch(
    "https://deepseekxchatgpt-backend.vercel.app/api/v1/users/users",
    {
      // Replace with your API endpoint to fetch users
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
      throw new Error("Failed to fetch users. Please try again later.");
    }
  }

  return await response.json();
}
