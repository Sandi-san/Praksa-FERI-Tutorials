"use client"

import Button from "../components/button";
import {useState} from "react"

export default function App() {
  const [count, setCount] = useState(0);

  const icon = <i></i> //JSX element

  const onClick = () => { }

  return (
    <main className="min-h-screen flex justify-center items-center">
      {/* ctrl + space : da vidis props od component */}
      <Button
      type="submit"
      autoFocus={true}
      defaultValue="test"
      className="test"

      // setCount={setCount}

      // onClick={onClick}

      // style={{
      //   backgroundColor: "blue",
      //   fontSize: 24,
      //   color: "white",
      //   padding: "1rem 2rem",
      //   borderRadius: 8,
      //   borderColor: "transparent"
      // }}
      />
        {/* Click me!
      </Button> */}
    </main>
  )
}