'use client'

import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";


import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { IconEyeFilled, IconEyeOff } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Link } from "@nextui-org/link";


export default function Register() {

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

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const toggleVisibility = () => setIsPasswordVisible((value) => !value);

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Comece Agora</h1>
                <h2 className={subtitle()}>Digite suas credenciais para acessar sua conta</h2>
                <div className="my-5">
                    <form action="" className="flex flex-col items-center text-left justify-center gap-5 ">
                        <Input
                            isRequired
                            type="text"
                            label="Nome"
                            placeholder="Digite seu nome"
                            labelPlacement="outside"
                        />
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
                        <Input
                            isRequired
                            label="Senha"
                            placeholder="Digite sua senha"
                            labelPlacement="outside"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isPasswordVisible ? (
                                        <IconEyeOff className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <IconEyeFilled className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isPasswordVisible ? "text" : "password"}
                        />
                        <Button color="primary" variant="shadow" className="w-full text-base">Registrar</Button>
                    </form>
                </div>
                <Divider orientation="horizontal" />
                <span>Já possui cadastro? <Link href="/login">Login</Link></span>
            </div>
        </section>
    )
}