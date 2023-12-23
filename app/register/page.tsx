'use client'

import CPFInput from "@/components/Input/CPFInput";
import EmailInput from "@/components/Input/EmailInput";
import PasswordInput from "@/components/Input/Password/PasswordInput";
import TelephoneInput from "@/components/Input/TelephoneInput";
import { subtitle, title } from "@/components/primitives";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { redirect } from "next/navigation";
import { FormEvent, useRef } from "react";

export default function Register() {

    const [user, setUser] = useLocalStorage("user", null);

    if (user != null) {
        redirect("/calendar");
    }

    const nameInputRef = useRef<HTMLInputElement>(null);

    const cpfBaseRef = useRef<HTMLDivElement>(null);
    const cpfInputRef = useRef<HTMLInputElement>(null);

    const telephoneInputRef = useRef<HTMLInputElement>(null);

    const emailBaseRef = useRef<HTMLDivElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const passwordBaseRef = useRef<HTMLDivElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    function validateForm() {
        inputValidation(cpfBaseRef.current, cpfInputRef.current)
        inputValidation(emailBaseRef.current, emailInputRef.current)
        inputValidation(passwordBaseRef.current, passwordInputRef.current)
    }

    function inputValidation(base: HTMLDivElement | null, input: HTMLInputElement | null) {
        const isInputInvalid = base?.attributes.getNamedItem("data-invalid")?.value;
        input?.setCustomValidity(isInputInvalid ? "Invalid" : "");
    }

    function submitRequest(e: FormEvent) {
        e.preventDefault();

        const body = {
            "name": nameInputRef.current?.value,
            "cpf": cpfInputRef.current?.value,
            "phone": telephoneInputRef.current?.value,
            "email": emailInputRef.current?.value,
            "password": passwordInputRef.current?.value,
        }

        fetch(`http://localhost:8080/customer`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(async response => {
                const status = response.status;
                const data = await response.json();
                return { status: status, data: data };
            }).then(json => {
                switch (json.status) {
                    case 201:
                        setUser(json.data);
                        redirect('/calendar');
                    case 409:
                        console.log('Conflito');
                        break;
                }
            })
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
                            ref={nameInputRef}
                        />
                        <div className="flex w-full gap-5">
                            <CPFInput baseRef={cpfBaseRef} inputRef={cpfInputRef} />
                            <TelephoneInput inputRef={telephoneInputRef} />
                        </div>
                        <EmailInput baseRef={emailBaseRef} inputRef={emailInputRef} />
                        <PasswordInput baseRef={passwordBaseRef} inputRef={passwordInputRef} />
                        <Button type="submit" color="primary" variant="shadow" className="w-full text-base" onPress={validateForm}>Registrar</Button>
                    </form>
                </div>
                <Divider orientation="horizontal" className="mb-5" />
                <span>Já possui cadastro? <Link href="/login">Login</Link></span>
            </div>
        </section >
    )
}