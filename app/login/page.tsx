'use client'

import EmailInput from "@/components/Input/EmailInput";
import PasswordInput from "@/components/Input/Password/PasswordInput";
import { subtitle, title } from "@/components/primitives";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

export default function Login() {
    const [user, setUser] = useLocalStorage("user", null);
    const router = useRouter()

    if (user) {
        router.push("/calendar");
    }

    const emailInputRef = useRef<HTMLInputElement>(null);

    const passwordInputRef = useRef<HTMLInputElement>(null);

    const submitRequest = async (e: FormEvent) => {
        e.preventDefault();

        const body = {
            "email": emailInputRef.current?.value,
            "password": passwordInputRef.current?.value,
        }

        fetch(`http://localhost:8080/user`, {
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
                    case 200:
                        setUser(json.data);
                        router.push("/calendar")
                        break;
                    case 404:
                        console.log('Email ou Sena Inválido');
                        break;
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
                        <EmailInput inputRef={emailInputRef} />
                        <PasswordInput inputRef={passwordInputRef} />
                        <Button type="submit" color="primary" variant="shadow" className="w-full text-base" >Login</Button>
                    </form>
                </div>
                <Divider orientation="horizontal" className="mb-5" />
                <span>Não possui cadastro? <Link href="/register">Registrar</Link></span>
            </div>
        </section>
    )
}