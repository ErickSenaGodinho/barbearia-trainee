interface PasswordErrorMessageProps {
    failedValidationList: any[]
}

export default function PasswordErrorMessage({ failedValidationList }: Readonly<PasswordErrorMessageProps>) {
    return (
        <ul>
            {
                failedValidationList.map((desc) => {
                    return (
                        <li key={desc.validation}>{desc.message}</li>
                    )
                })
            }
        </ul>
    )
}