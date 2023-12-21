import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import DateInput from "../Input/DateInput";
import TimePicker from "../TimePicker/TimePicker";

interface SchedulerModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

export default function SchedulerModal({ isOpen, onOpenChange }: Readonly<SchedulerModalProps>) {

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
                            <DateInput />
                            <div className="flex gap-8">
                                <TimePicker label="Horário de Início" />
                                <TimePicker label="Horário de Término" />
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
