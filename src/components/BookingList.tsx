import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import getUserProfile from '@/libs/getUserProfile';
import {removeBooking} from '@/redux/features/bookSlice'
import {AppDispatch,useAppSelector} from '@/redux/store'
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import {useDispatch} from 'react-redux';

export default async function BookingList() {
    const bookingItems = useAppSelector((state)=>state.bookSlice.bookItems);

    const dispatch = useDispatch<AppDispatch>();

    const session = await useSession();
    if(!session || !session.data || !session.data.user.token) return null
    const profile = await getUserProfile(session.data.user.token);
    var createdAt = new Date(profile.data.createdAt);
    return ( 
        <main className = 'bg-slate-100 m-5 p-5'>
            <div className = 'text-2xl'>{profile.data.name}</div>
            <table className = 'table-auto border-serpate border-spacing-3'>
                <tbody>
                    <tr><td>Email: </td><td>{profile.data.email}</td></tr>
                    <tr><td>Role: </td><td> {profile.data.role}</td></tr>
                    <tr><td>Member Since: </td><td>{createdAt.toString()}</td></tr>
                </tbody>
            </table>

        </main>
    )
}