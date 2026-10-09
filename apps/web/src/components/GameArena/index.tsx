
import { Board } from "../Board"
import { PlayerHandDrawer } from "../PlayerHandDrawer"
import { useGameStore } from "../../stores/useGameStore"

export const GameArena=()=>{
    
      const {selectCard,playerHand,selectedCard} = useGameStore()
    return <div>
        <Board/>
        <PlayerHandDrawer cards={playerHand} selectedCard={selectedCard} onSelectedCard={(card)=>{selectCard(card)
        }}/>
    </div>
}