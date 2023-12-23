'use client'

import { Input } from "@nextui-org/input";
import { Ref, useState } from "react";

interface EmailInputProps {
    baseRef?: Ref<HTMLDivElement>
    inputRef?: Ref<HTMLInputElement>
}

export default function TelephoneInput({ baseRef, inputRef }: Readonly<EmailInputProps>) {

    const [telephone, setTelephone] = useState('');
    const pattern = "[0-9]{11}";
    function isInvalid() {
        if (telephone === "") return false;
        return !RegExp(pattern).exec(telephone);
    }

    return (
        <Input
            isRequired
            type="tel"
            label="Phone"
            placeholder="(XX) XXXXX-XXXX"
            pattern={pattern}
            maxLength={11}
            isInvalid={isInvalid()}
            color={telephone === "" ? "default" : "success"}
            errorMessage={isInvalid() && "Insira um número válido"}
            labelPlacement="outside"
            onValueChange={setTelephone}
            baseRef={baseRef}
            ref={inputRef}
        />
    )
}