'use client'

import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/table";
import { IconPlus } from "@tabler/icons-react";
import SchedulerCell from "./SchedulerCell";
import SchedulerModal from "./SchedulerModal";

export default function Scheduler() {

    const dates = [
        {
            id: 0,
            day: "Sun",
            attendances: [
                {
                    id: 34,
                    start: '13:00',
                    end: '13:45',
                    customer: 'Joao',
                    performed: false,
                },
                {
                    id: 36,
                    start: '13:30',
                    end: '13:45',
                    customer: 'Teste',
                    performed: false,
                }
            ]
        },
        {
            id: 1,
            day: "Mon",
            attendances: [
                {
                    id: 60,
                    start: '13:00',
                    end: '13:45',
                    customer: 'Teste2',
                    performed: false,
                },
            ]
        },
        {
            id: 2,
            day: "Tue",
            attendances: null
        },
        {
            id: 3,
            day: "Wed",
            attendances: null
        },
        {
            id: 4,
            day: "Thur",
            attendances: null
        },
        {
            id: 5,
            day: "Fri",
            attendances: null
        },
        {
            id: 6,
            day: "Sat",
            attendances: null
        }
    ]

    const columns = dates.map(date => {
        return { id: date.id, day: date.day };
    });

    const initialGroup: { [key: string]: any } = {};

    const groupedAttendances = dates.reduce((acc, cur) => {
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

    const hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    const result: any[][] = [];

    hours.forEach(hour => {
        const length = result.push([]);
        dates.forEach(date => {
            const attendances = flattenedAttendances
                .filter(attandances => attandances[0]?.start.split(':')[0] == hour.split(':')[0])
                .map(attandances => attandances.filter((attendance: any) => attendance?.day === date.day))
                .flat();
            result[length - 1].push({ id: hour + date.day, content: attendances });
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