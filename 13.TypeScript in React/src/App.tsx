import Button from "../components/button";

export default function App(){
  return (
    <main className="min-h-screen flex justify-center items-center">
      {/* ctrl + space : da vidis props od component */}
      <Button style={{
        backgroundColor: "blue",
        fontSize: 24,
        color: "white",
        padding: "1rem 2rem",
        borderRadius: 8,
        borderColor: "transparent"
      }} />
    </main>
  )
}