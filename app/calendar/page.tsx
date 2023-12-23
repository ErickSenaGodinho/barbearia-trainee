'use client'

import Scheduler from "@/components/Calendar/Scheduler";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Calendar() {
    const [user] = useLocalStorage("user", null);
    
    return (
        <Scheduler user={user} />
    )
}