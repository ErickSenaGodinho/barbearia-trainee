import { Select, SelectItem } from "@nextui-org/select";
import { Ref } from "react";

export interface TimeSelectItem {
    key: number,
    value: string
}

interface TimeSelectProps {
    items: Iterable<TimeSelectItem>,
    defaultSelectedKey?: string,
    handleTimeChange: (value: any) => void
}

export default function TimeSelect({ items, defaultSelectedKey, handleTimeChange }: Readonly<TimeSelectProps>) {

    return (
        <Select
            aria-label="time-select"
            items={items}
            className="w-1/2"
            defaultSelectedKeys={[defaultSelectedKey ?? 0]}
            selectionMode="single"
            classNames={{
                selectorIcon: "hidden",
                value: "text-right"
            }}
            onChange={handleTimeChange}
            variant="bordered"
            popoverProps={{ placement: "top" }}
        >
            {item => <SelectItem key={item.key} className="text-center" classNames={{ selectedIcon: "hidden" }}>{item.value}</SelectItem>}
        </Select>
    )
}