"use client"
import DateReserve from "@/components/DateReserve"
import { FormControl, MenuItem, Select, TextField } from "@mui/material"
import {authOptions} from '@/app/api/auth/[...nextauth]/authOptions';
import {getServerSession} from 'next-auth'
import getUserProfile from '@/libs/getUserProfile'
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";

export default function Booking() {
    const [date,setDate] = useState<Dayjs|null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [nameLastname,setNameLastname]=useState<string>('');
    const [tel,setTel] = useState<string>('');
    const [coworking,setcoworking] = useState<string>('');
    
    const makeBooking=() => {
        if(date?.isValid() && nameLastname !== '' && tel !== '' && coworking !== '') {
            const item :BookingItem = {
                nameLastname : nameLastname,
                tel : tel,
                coWorking : coworking,
                bookDate : dayjs(date).format("DD/MM/YYYY")
            }
            dispatch(addBooking(item))
            window.alert("The booking was successfully")
        }
        else {
            let txt = '';
            if(!date?.isValid()) {
                txt += 'Invalid date. \n';
            }
            if(nameLastname === '') {
                txt += 'Name-Lastname is required \n';
            }
            if(tel === '') {
                txt += 'Telephone number is required \n';
            }
            if(coworking === '') {
                txt += 'coworking is required \n';
            }
            window.alert(txt);
        }
    }
    
    return (
        <div className="flex flex-col bg-gradient-to-br from-blue-200 via-purple-300 p-8 to-pink-400 w-full min-h-screen overflow-hidden items-center">
        <FormControl variant="standard" className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-lg border border-gray-200 mt-10">
          <div className="mt-10 text-3xl font-extrabold mb-8 text-center text-indigo-900">
            New Reservation
          </div>
          <div className="space-y-6">
          <div className="text-xl text-indigo-900 ml-4 font-semibold">Name and Contacts</div>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 flex flex-col sm:flex-row sm:space-x-5 space-y-5 sm:space-y-0 shadow-md">
                <TextField
                variant="outlined"
                name="Name-Lastname"
                label="Name - Lastname"
                placeholder="Enter your full name"
                onChange={(e) => setNameLastname(e.target.value)}
                className="flex-1"
                InputProps={{
                    className: "bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm"
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                    borderRadius: '0.75rem',
                    transition: 'all 0.3s ease',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(129, 140, 248)',
                        borderWidth: '2px',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(99, 102, 241)',
                        borderWidth: '2px',
                        boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.2)',
                    },
                    '&.Mui-focused': {
                        outline: 'none',
                    }
                    },
                    '& .MuiInputLabel-root': {
                    color: 'rgb(79, 70, 229)',
                    fontWeight: '500',
                    '&.Mui-focused': {
                        color: 'rgb(67, 56, 202)',
                    }
                    },
                    '& .MuiOutlinedInput-input': {
                    padding: '14px 16px',
                    '&:focus': {
                        outline: 'none',
                        boxShadow: 'none'
                    }
                    },
                    '& .Mui-focused': {
                    outline: 'none'
                    }
                }}
                />
                <TextField
                variant="outlined"
                name="Contact-Number"
                label="Contact Number"
                placeholder="Enter your phone number"
                onChange={(e) => setTel(e.target.value)}
                className="flex-1"
                InputProps={{
                    className: "bg-gradient-to-r from-purple-50 to-pink-50 shadow-sm"
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                    borderRadius: '0.75rem',
                    transition: 'all 0.3s ease',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(139, 92, 246)',
                        borderWidth: '2px',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(124, 58, 237)',
                        borderWidth: '2px',
                        boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.2)',
                    },
                    '&.Mui-focused': {
                        outline: 'none',
                    }
                    },
                    '& .MuiInputLabel-root': {
                    color: 'rgb(124, 58, 237)',
                    fontWeight: '500',
                    '&.Mui-focused': {
                        color: 'rgb(109, 40, 217)',
                    }
                    },
                    '& .MuiOutlinedInput-input': {
                    padding: '14px 16px',
                    '&:focus': {
                        outline: 'none',
                        boxShadow: 'none'
                    }
                    },
                    '& .Mui-focused': {
                    outline: 'none'
                    }
                }}
                />
            </div>
            <div className="text-xl text-indigo-900 ml-4 font-semibold">coworking</div>
            <div className="px-4 overflow-x-hidden">
              <Select
                variant="outlined"
                name="coworking"
                id="coworking"
                value={coworking}
                onChange={(e) => setcoworking(e.target.value)}
                className="h-full w-full bg-white border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-hidden"
              >
                <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                <MenuItem value="Spark">Spark Space</MenuItem>
                <MenuItem value="GrandTable">The Grand Table</MenuItem>
              </Select>
            </div>
            <div className="text-xl text-indigo-900 ml-4 font-semibold">Booking Date</div>
            <div className="flex justify-center px-4">
              <DateReserve onDateChange={(value: Dayjs) => setDate(value)} />
            </div>
          </div>
          <button
            onClick={makeBooking}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-5 py-3 text-white text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            name="Book coworking"
          >
            Book coworking
          </button>
        </FormControl>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 w-full max-w-lg rounded-xl border border-indigo-300 bg-white hover:bg-indigo-50 hover:border-indigo-500 px-5 py-3 text-indigo-600 hover:text-indigo-700 text-lg font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
        >
          Back to main page
        </button>
      </div>
    );
}