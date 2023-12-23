'use client'

import { Input } from "@nextui-org/input";
import { Ref, useState } from "react";

interface EmailInputProps {
    baseRef?: Ref<HTMLDivElement>
    inputRef?: Ref<HTMLInputElement>
}

export default function EmailInput({ baseRef, inputRef }: Readonly<EmailInputProps>) {

    const [email, setEmail] = useState('');
    const pattern = "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$";

    function isInvalid() {
        if (email === "") return false;
        return !RegExp(pattern).exec(email);
    }

    return (
        <Input
            isRequired
            type="email"
            label="Email"
            placeholder="Digite seu email"
            isInvalid={isInvalid()}
            color={email === "" ? "default" : "success"}
            errorMessage={isInvalid() && "Insira um email válido"}
            labelPlacement="outside"
            onValueChange={setEmail}
            baseRef={baseRef}
            ref={inputRef}
        />
    )
}