import Link from "next/link";
import Card from "./Card";

function getDirectGoogleDriveUrl(url: string): string {
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?id=${match[1]}`;
    }
    return url; // fallback to original if no match
}

export default async function CoworkingCatalog({coworkingJson} : {coworkingJson:Promise<CoworkingJson>}) {
    const coworkingJsonReady = await coworkingJson;
    return (
        <>
        Explore {coworkingJsonReady.count} coworkings in our catalog
        <div style = {{margin : "20px",display : "flex",flexDirection : "row",flexWrap:"wrap",justifyContent:"space-around",alignContent : "space-around"}}>
                {
                    coworkingJsonReady.data.map((coworkingItem:CoworkingItem)=> (
                        <Link key = {coworkingItem.id} href={`/coworking/${coworkingItem.id}`} className = 'w-1/5'>
                        <Card key = {coworkingItem.id} coworkingName = {coworkingItem.name} imgSrc = {getDirectGoogleDriveUrl(coworkingItem.picture)}/>
                        </Link>
                    ))
                }
        </div>
        </>
    )
}