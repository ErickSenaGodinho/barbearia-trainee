'use client'

import { Input } from "@nextui-org/react";
import { IconEyeFilled, IconEyeOff } from "@tabler/icons-react";
import { default as PasswordValidator, default as passwordValidator } from "password-validator";
import { useMemo, useState } from "react";
import PasswordDescription from "./PasswordDescription";

export default function PasswordInput() {

    const schema = useMemo(() => {
        const newSchema: PasswordValidator = new passwordValidator();
        newSchema
            .is().min(8, "Mínimo de 8 caracteres")
            .is().max(100, "Máximo de 100 caracteres")
            .has().symbols(undefined, "Deve conter um caractere especial")
            .has().uppercase(undefined, "Deve conter um caractere maiúsculo")
            .has().lowercase(undefined, "Deve conter um caractere minúsculo")
            .has().not().spaces(undefined, "Não deve conter espaços");
        return newSchema;
    }, [])

    const [password, setPassword] = useState('');
    const [isEyeVisible, setIsEyeVisible] = useState(false);
    const toggleEyeVisibility = () => setIsEyeVisible((prev) => !prev);
    const failedValidation = password === "" ? false : schema.validate(password, { details: true });

    function isInvalid() {
        return ((Array.isArray(failedValidation) && failedValidation.length > 0) || (typeof failedValidation === 'boolean' && failedValidation));
    }

    function getColor() {
        if (password === "") {
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
            label="Senha"
            placeholder="Digite sua senha"
            labelPlacement="outside"
            isInvalid={isInvalid()}
            color={getColor()}
            onValueChange={setPassword}
            type={isEyeVisible ? "text" : "password"}
            description={
                Array.isArray(failedValidation) && <PasswordDescription failedValidationList={failedValidation} />
            }
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleEyeVisibility} >
                    {
                        isEyeVisible ? (
                            <IconEyeOff className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <IconEyeFilled className="text-2xl text-default-400 pointer-events-none" />
                        )}
                </button>
            }
        />
    )
}