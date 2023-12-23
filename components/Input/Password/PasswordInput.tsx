'use client'

import { Input } from "@nextui-org/input";
import { IconEyeFilled, IconEyeOff } from "@tabler/icons-react";
import { default as PasswordValidator, default as passwordValidator } from "password-validator";
import { Ref, useMemo, useState } from "react";
import PasswordErrorMessage from "./PasswordErrorMessage";

interface PasswordInputProps {
    baseRef?: Ref<HTMLDivElement>
    inputRef?: Ref<HTMLInputElement>
}

export default function PasswordInput({ baseRef, inputRef }: Readonly<PasswordInputProps>) {

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

    return (
        <Input
            isRequired
            label="Senha"
            placeholder="Digite sua senha"
            labelPlacement="outside"
            isInvalid={isInvalid()}
            color={password === "" ? "default" : "success"}
            onValueChange={setPassword}
            type={isEyeVisible ? "text" : "password"}
            errorMessage={Array.isArray(failedValidation) && failedValidation.length > 0 && <PasswordErrorMessage failedValidationList={failedValidation} />}
            baseRef={baseRef}
            ref={inputRef}
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