export default async function getCoworkings() {
    await new Promise((resolve)=> setTimeout(resolve,300));
    const response = await fetch('https://deepseekxchatgpt-backend.vercel.app/api/v1/coworkings');
    if(!response.ok) {
        throw new Error("Failed to fetch Coworkings");
    }
    return await response.json();
}