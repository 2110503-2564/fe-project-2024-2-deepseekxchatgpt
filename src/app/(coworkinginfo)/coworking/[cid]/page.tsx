import Image from 'next/image'
import getCoworking from '@/libs/getCoworking'
function getDirectGoogleDriveUrl(url: string): string {
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?id=${match[1]}`;
    }
    return url; // fallback to original if no match
}
export default async function CardDetailPage({params} : {params : {cid : string}}) {
    
    const coworkingDetail = await getCoworking(params.cid)
    return (
        <main className = 'text-center p-5'>
            <h1 className = 'text-lg font-medium'>coworking ID {params.cid}</h1>
            <div className = 'flex flex-row my-5'>
                <Image src = {getDirectGoogleDriveUrl(coworkingDetail.data.picture)}
                alt = 'coworking Picture'
                width={0} height = {0} sizes = "100vw"
                className = 'rounded-lg w-[30%] bg-black'
                />
                <div className='text-md mx-5'>{coworkingDetail.data.name}
                <div>Full Address : {coworkingDetail.data.address} , {coworkingDetail.data.district} , {coworkingDetail.data.province} , {coworkingDetail.data.postalcode}</div>
                <div>Telephone No. : {coworkingDetail.data.tel} </div>

                </div>
            </div>
        </main>
    )
}
