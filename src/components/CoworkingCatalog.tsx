import Link from "next/link";
import Card from "./Card";
import getCoworkings from "@/libs/getCoworkings";

function getDirectGoogleDriveUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?id=${match[1]}`;
  }
  return url; // fallback to original if no match
}

export default async function CoworkingCatalog() {
  const coworkingJsonReady = await getCoworkings();
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-8">
        {coworkingJsonReady.count} Available Coworking Spaces
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {coworkingJsonReady.data.map((coworkingItem: CoworkingItem) => (
          <Link 
            key={coworkingItem._id} 
            href={`/coworking/${coworkingItem._id}`} 
            className="transform transition-all duration-300 hover:scale-105"
          >
            <Card 
              coworkingName={coworkingItem.name} 
              imgSrc={getDirectGoogleDriveUrl(coworkingItem.picture)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}