'use client'

import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function EmailInput() {

    const [email, setEmail] = useState<string>("");

    const validateEmail = () => RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i).exec(email);

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
        />
    )
}