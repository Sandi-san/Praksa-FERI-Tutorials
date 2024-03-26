import React, { useEffect, useState } from "react"

//third-party types:
//v tsconfig.json

//import type za pouporabo (lib/types.ts)
import { type Color } from '../lib/types.ts'

//GENERICs
//pozor: dodati vejico
// const convertToArray = <T,>(value: T): T[] => {
//     return [value]
// }
//druga sintaksa zapisa
function convertToArray<T>(value: T): T[] {
    return [value]
}
//generics v props (<T> treba tudi dodati ko passamo ButtonProps v export default funckcijo)
type ButtonProps<T> = {
    countValue: T,
    countHistory: T[]
}

const buttonTextOptions = [
    "Click me!",
    "Click me again!",
    "Click me again one more time!"
] as const; //readonly, const opcije

type User = {
    name: string,
    age: number
}
//vzemu User-ja, ampak odstrani name var
type Guest = Omit<User, 'name'>

/*
type ButtonProps = {
    type: "button" | "submit" | "reset",
    color: Color,
}
//druga komponenta ki je tudi button
type SuperButtonProps = ButtonProps & {
    size: "md" | "lg"
}
*/

//ce zelimo definirati vec propov za komponento
//dodajamo lahko tudi element, ki ni del "button" komponente (& simbol)
// type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
//     variant?: "primary" | "secondary"
// }

/*
//TYPE INTERFACE (interface lahko definira le objekte, ne tipe)
interface IButtonProps {
    text: string,
    count: number
}
//& (intersect) za interface - extends
interface ISuperButtonProps extends IButtonProps {
    text: string,
    count: number
}
*/

//TYPE ALIAS
/*
type ButtonProps = {
    //useState hook - setter za number
    setCount: React.Dispatch<React.SetStateAction<number>>

    //vrednost vmes v elementu (vsi JSX elementi)
    //JSX.Element je bolj restrict element (npr. ne moremo podati tekst)
    // children: React.ReactNode

    //funkcija v propu
    // onClick: () => void

    // style: {
    //     //nastavi le mozne vrednosti
    //     backgroundColor: Color,
    //     color: Color,
    //     fontSize: number,
    //     pillShape?: boolean,
    //     //tuple namesto array - omeji stevilo elementov
    //     padding?: [number, number, number, number]
    // }
}
*/

//button z generic type props
// export default function Button<T>({
export default function Button({
    //...rest - da ti ni treba pisati ostalih propov (array)
    // type, autoFocus, variant, ...rest
}
    // : ButtonProps
) {
    // setCount(1)

    //hooks - ni treba podati tipa, ce ga ze pravilno nastavimo v useState
    // const [user, setUser] = useState<User | null>(null)
    // const name = user?.name //vrne undefined ce je null in ne crash-a

    //dobi iz local storage
    useEffect(() => {
        //nastavi tip
        const previousButtonColor = localStorage.getItem("buttonColor") as Color

        //unknown type (ko nevemo kaj dobimo: any -> unknown)
        fetch("https://nek_url")
            .then((response) => response.json())
            .then((data: unknown) => {
                //zazeni preko Zod
                // const todo = todoSchema.parse(data)
            })
    }, [])

    return (
        /*
        //mapiraj cez komponento
        <button>{
            buttonTextOptions.map(option => {
                return option
            })}
        </button>
        */

        <button
            // type={type} autoFocus={autoFocus} {...rest}
            //event handler
            onClick={(event) => console.log("Clicked")}
        >
            Click me!
        </button>

    )
}