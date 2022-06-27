import { useEffect, useState } from "react"

export function Async() {
    const [isButtonVisible, setIsbuttonVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsbuttonVisible(true)
        }, 1000);
    },[])

    return (
        <div>
            <div>
                Hello Guys
            </div>

            {
                isButtonVisible && <button>Botão</button>
            }
        </div>
    )
}