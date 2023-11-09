'use client'

import EmailInput from "@/components/Input/EmailInput";
import PasswordInput from "@/components/Input/PasswordInput";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";


import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/react";

export default function Login() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Comece Agora</h1>
                <h2 className={subtitle()}>Digite suas credenciais para acessar sua conta</h2>
                <div className="my-5">
                    <form action="" className="flex flex-col items-center text-left justify-center gap-5 ">
                        <EmailInput />
                        <PasswordInput />
                        <Button color="primary" variant="shadow" className="w-full text-base">Login</Button>
                    </form>
                </div>
                <Divider orientation="horizontal" className="mb-5" />
                <span>Não possui cadastro? <Link href="/register">Registrar</Link></span>
            </div>
        </section>
    )
}