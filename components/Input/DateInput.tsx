'use client'

import { Input } from "@nextui-org/input";
import { useState } from "react";

export default function DateInput() {

    const currentDate = new Date(Date.now());
    currentDate.setHours(0);

    const [date, setDate] = useState(currentDate.toISOString().split('T')[0]);

    return (<Input
        label="Data"
        type="date"
        variant="bordered"
        onValueChange={setDate}
        defaultValue={date}
        placeholder="_"
    />)
}