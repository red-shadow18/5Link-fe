import { useState } from "react"
import { Board } from "../Board"
import { PlayerHandDrawer } from "../PlayerHandDrawer"
import styles from "./GameArena.module.css"
import type { CardCode } from "../../config/boardLayout"
import { useGameStore } from "../../stores/useGameStore"

export const GameArena=()=>{
    
      const {selectCard,playerHand,selectedCard} = useGameStore()
    return <div>
        <Board/>
        <PlayerHandDrawer cards={playerHand} selectedCard={selectedCard} onSelectedCard={(card)=>{selectCard(card)
        }}/>
    </div>
}