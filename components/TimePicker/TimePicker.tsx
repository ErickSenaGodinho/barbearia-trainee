import { useState } from "react";
import TimeSelect, { TimeSelectItem } from "../TimePicker/TimeSelect";

interface TimePickerProps {
    label?: string
    time?: string,
}

export default function TimePicker({ label, time }: Readonly<TimePickerProps>) {

    function getTimeFormatted(time: string | undefined) {
        if (time && Number.parseInt(time) < 10) {
            return time?.substring(1, 2);
        }
        return time;
    }

    const [hour, setHour] = useState(getTimeFormatted(time?.split('T')[1].split(':')[0]) ?? '12');
    const [minute, setMinute] = useState(getTimeFormatted(time?.split('T')[1].split(':')[1]) ?? '0');
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