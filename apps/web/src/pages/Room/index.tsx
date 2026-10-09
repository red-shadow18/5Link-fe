import { GameArena } from "../../components/GameArena"


export const Room=()=>{
    const isInsideGme=true
    return(
        <div>
            {
                isInsideGme?<GameArena/>:    <p>Room</p> 
            }
       
        </div>
    )
}   