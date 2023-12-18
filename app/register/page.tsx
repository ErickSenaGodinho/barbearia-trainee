'use client'

import EmailInput from "@/components/Input/EmailInput";
import PasswordInput from "@/components/Input/PasswordInput";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { FormEvent, useRef } from "react";

export default function Register() {

    const emailBaseRef = useRef<HTMLDivElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const passwordBaseRef = useRef<HTMLDivElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    function submitRequest(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const isEmailInvalid = emailBaseRef.current?.attributes.getNamedItem("data-invalid")?.value;
        if (isEmailInvalid) {
            console.log("Email Invalido");
            return;
        }

        const isPasswordInvalid = passwordBaseRef.current?.attributes.getNamedItem("data-invalid")?.value;
        if (isPasswordInvalid) {
            console.log("Password Invalido");
            return;
        }

        const email = emailInputRef.current?.value;
        const password = passwordInputRef.current?.value;
    }

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Comece Agora</h1>
                <h2 className={subtitle()}>Digite suas credenciais para acessar sua conta</h2>
                <div className="my-5">
                    <form className="flex flex-col items-center text-left justify-center gap-5" onSubmit={submitRequest}>
                        <Input
                            isRequired
                            type="text"
                            label="Nome"
                            placeholder="Digite seu nome"
                            labelPlacement="outside"
                        />
                        <EmailInput baseRef={emailBaseRef} inputRef={emailInputRef} />
                        <PasswordInput baseRef={passwordBaseRef} inputRef={passwordInputRef} />
                        <Button type="submit" color="primary" variant="shadow" className="w-full text-base">Registrar</Button>
                    </form>
                </div>
                <Divider orientation="horizontal" className="mb-5" />
                <span>Já possui cadastro? <Link href="/login">Login</Link></span>
            </div>
        </section >
    )
}