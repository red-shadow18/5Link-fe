import { useNavigate } from "react-router"

export const Dashboard=()=>{
    const navigate=useNavigate()

    const handleTakeInsideGame=()=>{
        navigate("/room/123")
    }
    return(
        <div>
        <button onClick={handleTakeInsideGame}>Start A game</button>
        </div>
    )
}