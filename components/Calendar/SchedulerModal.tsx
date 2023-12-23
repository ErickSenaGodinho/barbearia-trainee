import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import DateInput from "../Input/DateInput";
import TimePicker from "../TimePicker/TimePicker";

interface SchedulerModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    start?: string,
    end?: string
}

export default function SchedulerModal({ isOpen, onOpenChange, start, end }: Readonly<SchedulerModalProps>) {
    
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Agendar Atendimento</ModalHeader>
                        <ModalBody>
                            <DateInput dateBase={start} />
                            <div className="flex gap-8">
                                <TimePicker time={start} label="Horário de Início" />
                                <TimePicker time={end} label="Horário de Término" />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Salvar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
