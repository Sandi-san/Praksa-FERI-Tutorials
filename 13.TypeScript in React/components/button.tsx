import React from "react"

// type Color = "red" | "blue" | "green" | "yellow" | "purple" | "white" | "black"

type ButtonProps = {
    style: React.CSSProperties
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

export default function Button({
    style
}: ButtonProps): JSX.Element {
    return (
        <button style={style}>
            Click me
        </button>
    )
}