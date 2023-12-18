'use client'

import { Input } from "@nextui-org/react";
import { Ref, useState } from "react";

interface EmailInputProps {
    baseRef?: Ref<HTMLDivElement>
    inputRef?: Ref<HTMLInputElement>
}

export default function EmailInput({ baseRef, inputRef }: Readonly<EmailInputProps>) {

    const [email, setEmail] = useState('');
    const validateEmail = () => RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i).exec(email);

    console.log("Email Rendered");

    function isInvalid() {
        if (email === "") return false;
        return !validateEmail();
    }

    function getColor() {
        if (email === "") {
            return "default";
        }
        if (isInvalid()) {
            return "danger";
        }
        return "success";
    }

    return (
        <Input
            isRequired
            type="email"
            label="Email"
            placeholder="Digite seu email"
            isInvalid={isInvalid()}
            color={getColor()}
            errorMessage={isInvalid() && "Insira um email válido"}
            labelPlacement="outside"
            onValueChange={setEmail}
            baseRef={baseRef}
            ref={inputRef}
        />
    )
}