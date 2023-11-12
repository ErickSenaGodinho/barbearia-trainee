interface PasswordDescriptionProps {
    failedValidationList: any[]
}

export default function PasswordDescription({ failedValidationList }: PasswordDescriptionProps) {
    return (
        failedValidationList.length > 0 && <ul>
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