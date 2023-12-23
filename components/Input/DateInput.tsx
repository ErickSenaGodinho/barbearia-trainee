'use client'

import { Input } from "@nextui-org/input";
import { Ref, useState } from "react";

interface DateInputProps {
    dateBase?: string | Date,
    inputRef?: Ref<HTMLInputElement>
}

export default function DateInput({ dateBase, inputRef }: DateInputProps) {
    if (!dateBase) {
        dateBase = new Date(Date.now())        
    }
    dateBase = new Date(dateBase)
    dateBase?.setHours(0);

    const [date, setDate] = useState(dateBase.toISOString().split('T')[0]);

    return (<Input
        label="Data"
        type="date"
        value={date}
        variant="bordered"
        onValueChange={setDate}
        defaultValue={date}
        placeholder="_"
        ref={inputRef}
    />)
}