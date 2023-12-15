"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const GroupControl = () => {

    const params = useParams();
    const { setActive } = useOrganizationList();
    useEffect(() => {
        if(!setActive) return;

        setActive({
            organization: params.groupId as string,
        });

    },[setActive, params.groupId]);

    return null;
}