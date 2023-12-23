'use client'

import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SchedulerCell from "./SchedulerCell";
import SchedulerModal from "./SchedulerModal";

interface DatesProps {
    id: number,
    day: string,
    attendances: any[] | null
}

interface SchedulerProps {
    user: any
}

export default function Scheduler({ user }: SchedulerProps) {

    const [dateBase, setDateBase] = useState(new Date(Date.now()));

    const router = useRouter();

    function getLastSundayAndNextSaturday(dateBase: Date) {
        const lastSunday = new Date(dateBase.setDate(dateBase.getDate() - dateBase.getDay()));
        const nextSaturday = new Date(dateBase.setDate(lastSunday.getDate() + 6 + 7));
        return { lastSunday, nextSaturday };
    }

    const weekday = useMemo(() => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], []);
    const columns = weekday.map((day, id) => { return { id: id, day: day } });
    const dates: DatesProps[] = useMemo(() => weekday.map((day, id) => { return { id: id, day: day, attendances: null } }), [weekday]);

    const [datesState, setDatesState] = useState(dates);

    useEffect(() => {
        if (user) {
            const { lastSunday, nextSaturday } = getLastSundayAndNextSaturday(dateBase);

            const startDate = lastSunday.toISOString().split('T')[0];
            const endDate = nextSaturday.toISOString().split('T')[0];

            fetch(`http://localhost:8080/attendance/week?startDate=${startDate}&endDate=${endDate}`, {
                headers: {
                    'Authorization': `Basic ${user?.credential}`
                }
            })
                .then(response => response.json())
                .then(data => data.map((element: any) => {
                    const date = new Date(element.startTime)
                    dates[date.getDay()].attendances = dates[date.getDay()].attendances ? dates[date.getDay()].attendances : [];
                    dates[date.getDay()].attendances?.push({ id: element.id, customer: element.customerName, start: element.startTime, end: element.endTime, performed: element.performed })
                    setDatesState([...dates]);
                }))
        }
    }, [user, dateBase, router, weekday, dates]);

    const initialGroup: { [key: string]: any } = {};

    const groupedAttendances = datesState.reduce((acc, cur) => {
        if (cur.attendances) {
            cur.attendances.forEach((attendance) => {
                const key = attendance.start;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push({ ...attendance, day: cur.day });
            });
        }
        return acc;
    }, initialGroup);

    const flattenedAttendances = Object.values(groupedAttendances).map((arr) => arr.flat());

    const result: any[][] = [];

    [...Array(25)].forEach((_, i) => {
        const length = result.push([]);
        datesState.forEach(date => {

            const attendances = flattenedAttendances
                .filter(attandances => attandances[0]?.start.split('T')[1].split(':')[0] == i)
                .map(attandances => attandances.filter((attendance: any) => attendance?.day === date.day))
                .flat();
            result[length - 1].push({ id: i + date.day, content: attendances });
        })
    });

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <Table
            aria-label="Agenda para Serviços de Barbearia"
            hideHeader
            classNames={{
                wrapper: "max-h-[65vh]",
                td: "min-w-[8.5rem] pointer-events-none",
            }}
            topContent={
                <div className="ml-auto flex flex-col gap-4" >
                    <div className="flex justify-between gap-3 items-end">
                        <div className="flex gap-3">
                            <Button color="primary" onPress={onOpen} endContent={<IconPlus />}>Novo</Button>
                            <SchedulerModal isOpen={isOpen} onOpenChange={onOpenChange} />
                        </div>
                    </div>
                </div>
            }
            topContentPlacement="outside"
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.id}
                    >
                        {column.day}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={result}>
                {(item) => (
                    <TableRow key={item[0].id.split(':')[0]} className="h-24">
                        {(columnKey) => <TableCell className={`relative border rounded-sm p-0 [&>*]:absolute`}>
                            {<>
                                {item[columnKey as number].content?.map((att: any) => {
                                    return (
                                        <SchedulerCell key={att.id} startTime={att.start} endTime={att.end} customer={att.customer} />
                                    )
                                })
                                }
                            </>}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}