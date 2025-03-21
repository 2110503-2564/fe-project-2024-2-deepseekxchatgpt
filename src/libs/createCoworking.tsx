

export default async function createCoworkingSpace(form: CoworkingItem,token:string) {
    const res = await fetch("https://deepseekxchatgpt-backend.vercel.app/api/v1/coworkings/", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
    });
    if (!res.ok) {
        throw new Error("Failed to create CoWorking space");
    }
    return await res.json();
}