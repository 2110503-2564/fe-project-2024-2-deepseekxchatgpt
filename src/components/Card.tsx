'use client'
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import {Rating} from '@mui/material'
import {useState} from "react"

export default function Card({coworkingName,imgSrc,onRating} : {coworkingName : string, imgSrc : string,onRating?:Function}) {

    const [value,setValue] = useState<number | null>(0);
    
    return (
        <InteractiveCard>
                <div className = "w-full h-[70%] relative rounded-t-lg">
                    <Image src={imgSrc} 
                    alt = 'coworking Picture'
                    fill = {true}
                    className = 'object-cover rounded-t-lg'
                    />
                </div>
                <div className = "w-full h-[30%] p-[10px] flex flex-col">
                    {coworkingName}
                    {onRating? 
                    (<Rating 
                    name = {coworkingName+" Rating"} 
                    id = {coworkingName + " Rating"} 
                    data-testid = {coworkingName + " Rating"} 
                    value={value}
                    onChange={(event, newValue) => {
                        event.stopPropagation();
                        setValue(newValue);
                        onRating(coworkingName,newValue);
                    }}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}/>) : ""
                    
                    }
                </div>
        </InteractiveCard>
    )
}