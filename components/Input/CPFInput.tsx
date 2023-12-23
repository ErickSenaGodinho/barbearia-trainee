'use client'

import { Input } from "@nextui-org/input";
import { Ref, useState } from "react";

interface CPFInputProps {
    baseRef?: Ref<HTMLDivElement>
    inputRef?: Ref<HTMLInputElement>
}

export default function CPFInput({ baseRef, inputRef }: CPFInputProps) {
    const [cpf, setCpf] = useState('');

    function validateCPF() {
        const cpfFormatted = cpf.replace(/[^\d]+/g, '');
        if (cpfFormatted.length !== 11 || !!cpfFormatted.match(/(\d)\1{10}/)) return false;
        const cpfArray = cpfFormatted.split('').map(el => +el);
        const rest = (count: number) => (cpfArray.slice(0, count - 12)
            .reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10
        return rest(10) === cpfArray[9] && rest(11) === cpfArray[10];
    }

    function isInvalid() {
        if (cpf === "") return false;
        return !validateCPF();
    }

    return (
        <Input
            isRequired
            type="text"
            label="CPF"
            placeholder="XXX.XXX.XXX-XX"
            pattern={"[0-9]{11}"}
            maxLength={11}
            isInvalid={isInvalid()}
            color={cpf === "" ? "default" : "success"}
            errorMessage={isInvalid() && "Insira um cpf válido"}
            labelPlacement="outside"
            onValueChange={setCpf}
            baseRef={baseRef}
            ref={inputRef}
        />
    )
}