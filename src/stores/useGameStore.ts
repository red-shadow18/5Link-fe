import { create } from "zustand";
import type { CardCode } from "../config/boardLayout";
import type { TeamColor } from "../types/game";
import { returnCardValue } from "../utils/cardUtils";
import { useBoardStore } from "./useBoardStore";

interface PlayerDetails {
    roomId: string | null;
    playerId: string | null;
    playerTeam: TeamColor;
}

interface GameSessionState {
    roomId: string | null;
    playerId: string | null;
    playerTeam: TeamColor;
    currentTurnTeam: TeamColor;
    playerHand: CardCode[];
    isMyTurn: boolean;
    selectedCard: CardCode | null;
    highlightedIndices: number[];

    initialiseSession:(params:PlayerDetails)=> void;
    setPlayerHand:(cards: CardCode[])=>void;
    selectCard:(card:CardCode)=>void;
    consumeCard:(card:CardCode)=>void;
    drawCard:(card:CardCode)=>void;
    updateTurn:(nextTurnTeam:TeamColor)=>void;
    clearSelection:()=>void;
    resetGameSession:()=>void;
}

const handleSelectCard=(card:CardCode, playerHand:CardCode[], selectedCard:CardCode | null, isMyTurn:boolean, playerTeam:TeamColor, set: (state: Partial<GameSessionState>) => void)=>{
    if(!isMyTurn) return;

    // retouching te same card deisbles the selection
    if(selectedCard===card || !playerHand.includes(card) || card===null){
        set({selectedCard:null, highlightedIndices:[]})
        return;
    }

    const currentBoardState = useBoardStore.getState().board;
    const cardData=returnCardValue(card)
    const {value, isJack,jackType} = cardData;

    let allowedIndices:number[]=[];
    if(isJack){
        if(jackType==='ONE_EYED'){
            allowedIndices=currentBoardState.filter((cell)=>cell.chipColor != null && cell.chipColor != playerTeam && !cell.isProtected).map((cell)=>cell.index)
        }else if(jackType==='TWO_EYED'){
            allowedIndices=currentBoardState.filter((cell)=>!cell.isCorner && cell.chipColor == null).map((cell)=>cell.index)
        }
    }else{
        allowedIndices=currentBoardState.filter((cell)=>cell.cardCode===card && !cell.isProtected).map((cell)=>cell.index)
    }

    set({selectedCard:card, highlightedIndices:allowedIndices})

}
const handleConsumeCard=(card:CardCode, playerHand:CardCode[], set: (state: Partial<GameSessionState>) => void)=>{
    if(playerHand.includes(card)){
        // there can be morte than one instance of the same card in the hand, so we remove only one instance
        const indexToRemove = playerHand.indexOf(card);
        if (indexToRemove !== -1) {
            const newHand = [...playerHand];
            newHand.splice(indexToRemove, 1);
            set({playerHand:newHand, selectedCard:null, highlightedIndices:[]})
        
        }
        
    }
}   
const handleDrawCard=(card:CardCode, playerHand:CardCode[], set: (state: Partial<GameSessionState>) => void)=>{
    if(card !== null){
        set({playerHand:[...playerHand, card]})
    }
}

const handleUpdateTurn=(nextTurnTeam:TeamColor, playerTeam:TeamColor, set: (state: Partial<GameSessionState>) => void)=>{
    set({currentTurnTeam:nextTurnTeam, isMyTurn:nextTurnTeam===playerTeam})
}   

 
const handleResetGameSession=(set: (state: Partial<GameSessionState>) => void)=>{
    set({
        roomId: null,
        playerId: null,
        playerTeam: 'BLUE',
        currentTurnTeam: 'BLUE',
        playerHand: [],
        isMyTurn: false,
        selectedCard: null,
        highlightedIndices: [],
    })
}


export const useGameStore = create<GameSessionState>((set,get)=>({
    roomId: null,
    playerId: null,
    playerTeam: 'BLUE',
    currentTurnTeam: 'BLUE',
    playerHand: ["2S", "JS", "5H", "JD", "3C"],
    isMyTurn: true,

    selectedCard: null,
    highlightedIndices: [],

    initialiseSession:(params:PlayerDetails)=>{
        const{roomId, playerId, playerTeam}=params 
    set({roomId,playerId,playerTeam,isMyTurn:get().currentTurnTeam===playerTeam})},
    setPlayerHand:(cards: CardCode[])=>set({playerHand:cards}),
    selectCard:(card:CardCode)=>handleSelectCard(card,get().playerHand,get().selectedCard,get().isMyTurn,get().playerTeam,set),
    consumeCard:(card:CardCode)=>handleConsumeCard(card,get().playerHand,set),
    drawCard:(card:CardCode)=>handleDrawCard(card,get().playerHand,set),
    updateTurn:(nextTurnTeam:TeamColor)=>handleUpdateTurn(nextTurnTeam,get().playerTeam,set),
    clearSelection:()=>set({selectedCard:null, highlightedIndices:[]}),
    resetGameSession:()=>handleResetGameSession(set),
}))