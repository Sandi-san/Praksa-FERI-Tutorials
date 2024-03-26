import React from "react"

type Color = "red" | "blue" | "green" | "yellow" | "purple" | "white" | "black"

type ButtonProps = {
    type: "button" | "submit" | "reset",
    color: Color,
}
//druga komponenta ki je tudi button
type SuperButtonProps = ButtonProps & {
    size: "md" | "lg"
}

//ce zelimo definirati vec propov za komponento
//dodajamo lahko tudi element, ki ni del "button" komponente (& simbol)
// type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
//     variant?: "primary" | "secondary"
// }

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

export default function Button({
    //...rest - da ti ni treba pisati ostalih propov (array)
    // type, autoFocus, variant, ...rest
}: ButtonProps) {
    // setCount(1)

    return (
        <button 
        // type={type} autoFocus={autoFocus} {...rest}
        >
            Click me!
        </button>
    )
}