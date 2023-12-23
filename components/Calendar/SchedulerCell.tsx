import { Card } from "@nextui-org/card";
import SchedulerModal from "./SchedulerModal";
import { useDisclosure } from "@nextui-org/modal";

interface SchedulerCellProps {
    startTime: string,
    endTime: string,
    customer?: string
}

interface Heights {
    [key: number]: string;
}

interface Space {
    [key: number]: string;
}

export default function SchedulerCell({ startTime, endTime, customer }: Readonly<SchedulerCellProps>) {


    const startTimeSplited = startTime.split('T')[1].split(":");
    const endTimeSplited = endTime.split('T')[1].split(":");

    const [startHour, startMinutes] = startTimeSplited.map(Number.parseFloat);
    const [endHour, endMinutes] = endTimeSplited.map(Number.parseFloat);

    const minutes = (endHour * 60 - startHour * 60 + endMinutes - startMinutes);

    const heights: Heights = {
        15: "h-[44px]",
        30: "h-[80px]",
        45: "h-[132px]",
        60: "h-[176px]",
        75: "h-[220px]",
        90: "h-[264px]",
        105: "h-[308px]",
        120: "h-[352px]",
        135: "h-[396px]",
        150: "h-[440px]",
        165: "h-[484px]",
        180: "h-[582px]",
    }

    const space: Space = {
        0: "top-2",
        15: "top-8",
        30: "top-26",
        45: "top-35"
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <Card shadow="sm" radius="sm" isPressable className={`absolute flex ${minutes == 15 ? "items-center sm:gap-2" : "flex-col"} w-auto ${heights[minutes]} ${space[startMinutes]} right-2 bottom-2 left-2 p-4 pointer-events-auto bg-green-300`} onPress={onOpen}>
            <span className={`${minutes == 15 ? "text-xs" : "text-sm"} font-semibold text-gray-500`}>{`${startTime.split('T')[1].substring(0, 5)} - ${endTime.split('T')[1].substring(0, 5)}`}</span>
            <span className={`${minutes == 15 ? "text-lg" : "my-auto text-xl"} font-bold text-foreground-500`}>{customer?.split(" ")[0]}</span>
            <SchedulerModal isOpen={isOpen} onOpenChange={onOpenChange} start={startTime} end={endTime} />
        </Card>
    )
}