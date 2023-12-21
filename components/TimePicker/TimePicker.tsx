import { useState } from "react";
import TimeSelect, { TimeSelectItem } from "../TimePicker/TimeSelect";

interface TimePickerProps {
    label?: string
}

export default function TimePicker({ label }: Readonly<TimePickerProps>) {
    const [hour, setHour] = useState('12');
    const [minute, setMinute] = useState('0');
    const hours: TimeSelectItem[] = Array.from({ length: 24 }, (_, i) => ({ key: i, value: `${i}`.padStart(2, '0') }));
    const minutes: TimeSelectItem[] = Array.from({ length: 4 }, (_, i) => ({ key: i, value: `${i * 15}`.padStart(2, '0') }));

    const handleHourChange = (value: any) => {
        setHour(value);
    };

    const handleMinuteChange = (value: any) => {
        setMinute(value);
    };

    return (
        <div className="w-full">
            <span>{label}</span>
            <div className="flex items-center gap-1 w-full text-lg">
                <TimeSelect items={hours} defaultSelectedKey={hour} handleTimeChange={handleHourChange} />
                <span>:</span>
                <TimeSelect items={minutes} defaultSelectedKey={minute} handleTimeChange={handleMinuteChange} />
            </div>
        </div>
    );
}