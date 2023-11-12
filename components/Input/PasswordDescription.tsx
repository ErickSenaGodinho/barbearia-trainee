interface PasswordDescriptionProps {
    failedValidationList: any[]
}

export default function PasswordDescription({ failedValidationList }: Readonly<PasswordDescriptionProps>) {
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