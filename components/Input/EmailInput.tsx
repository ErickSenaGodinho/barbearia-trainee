'use client'

import { Input } from "@nextui-org/react";
import { useState, useMemo } from "react";

export default function EmailInput() {

    const [email, setEmail] = useState<string>("");

    const validateEmail = (email: string) => RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i).exec(email);

    const isInvalid = useMemo(() => {
        if (email === "") return false;
        return !validateEmail(email);
    }, [email]);

    const color = useMemo<"default" | "danger" | "success">(() => {
        if (email === "") {
            return "default";
        }
        if (isInvalid) {
            return "danger";
        }
        return "success";
    }, [isInvalid, email])

    return (
        <Input
            isRequired
            type="email"
            label="Email"
            placeholder="Digite seu email"
            isInvalid={isInvalid}
            color={color}
            errorMessage={isInvalid && "Insira um email válido"}
            labelPlacement="outside"
            onValueChange={setEmail}
        />
    )
}