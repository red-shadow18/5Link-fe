import { useNavigate } from "react-router"
import { Board } from "../../components/Board"
import { PlayerHandDrawer } from "../../components/PlayerHandDrawer"

export const Dashboard=()=>{
    const navigate=useNavigate()

    const handleTakeInsideGame=()=>{
        navigate("/room/123")
    }
    return(
        <div>
        <button onClick={handleTakeInsideGame}>Start game</button>
        </div>
    )
}