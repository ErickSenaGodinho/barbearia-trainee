'use client'

import { Input } from "@nextui-org/react";
import { IconEyeFilled, IconEyeOff } from "@tabler/icons-react";
import { default as PasswordValidator, default as passwordValidator } from "password-validator";
import { useMemo, useState } from "react";

export default function PasswordInput() {

    const schema = useMemo(() => {
        const newSchema: PasswordValidator = new passwordValidator();
        newSchema
            .is().min(8, "Mínimo de 8 caracteres")
            .is().max(100, "Máximo de 100 caracteres")
            .has().symbols(undefined, "Deve conter um caracter especial")
            .has().uppercase(undefined, "Deve conter um caracter maiúsculo")
            .has().lowercase(undefined, "Deve conter um caracter minúsculo")
            .has().not().spaces(undefined, "Não deve conter espaços");
        return newSchema;
    }, [])

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible((value) => !value);

    const [failedValidationList, setFailedValidationList] = useState<boolean | any[]>([]);

    const validadePassword = (value: string) => {
        setFailedValidationList(value === "" ? false : schema.validate(value, { details: true }));
    };

    return (
        <Input
            isRequired
            label="Senha"
            placeholder="Digite sua senha"
            labelPlacement="outside"
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <IconEyeOff className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <IconEyeFilled className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            onValueChange={validadePassword}
            type={isVisible ? "text" : "password"}
            description={
                Array.isArray(failedValidationList) && failedValidationList.length > 0 && failedValidationList.map((desc) => {
                    return (
                        <ul key={desc.validation} >
                            <li>{desc.message}</li>
                        </ul>
                    )
                })
            }
        />
    )
}