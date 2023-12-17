"use client";

import Image from "next/image"

interface UserDetailsProps{
    imageUrl: string;
    amount: string;
    userName: string;
}

export const UserDetails = ({
    imageUrl,
    amount,
    userName
} : UserDetailsProps) => {

    return(
        <div className="flex gap-2 items-center">
            <Image
                src={imageUrl}
                    alt="userImage"
                    height={30}
                    width={30}
                    className="rounded-full"
                />
                <p>
                    {userName}
                </p>
                <p className="ml-auto">
                    {amount} ₹
                </p>
        </div>
    )
}