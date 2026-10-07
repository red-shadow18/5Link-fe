import { create } from 'zustand';
import { BOARD_LAYOUT, type BoardCardCode, type CardCode } from "../config/boardLayout";
import type { BoardTileState, TeamColor } from "../types/game";

interface BoardState {
turnNumber: number;
  board:BoardTileState[];
  cardsLeft:number;
  cardsDiscarded:number,
  lastDiscardedCard:CardCode | null,
  completedSequences:Record<TeamColor,number[][]>,
  setCellChip:(index:number,color:TeamColor|null)=>void;
  lockSequenceTiles:(indices:number[])=>void;
  syncBoard:(cell:BoardTileState[], turnNumber:number, completedSequences?:Partial<Record<TeamColor,number[][]>>)=>void;
  resetBoard:()=>void;  
}

const createInitialBoard=():BoardTileState[]=>BOARD_LAYOUT.map((code:BoardCardCode,index:number)=>({
    index,
    cardCode: code,
    chipColor:null,
    isCorner:code==='CORNER',
    isHighlighted: false,
    isProtected: false,

}))

export const useBoardStore=create <BoardState>((set,get)=>({
    turnNumber: 0,
    board:createInitialBoard(),
    cardsLeft:104,
    cardsDiscarded:0,
    lastDiscardedCard:null,
    completedSequences:{
        BLUE:[],
        GREEN:[],
        RED:[]
    },
    setCellChip:(index:number,color:TeamColor | null)=> set((state)=>({
        board:state.board.map((cell)=>cell.index==index?{...cell,chipColor:color}:cell)
    })),
    lockSequenceTiles:(indices=>set((boardState)=>({board:boardState.board.map((cell,index)=>indices.includes(index)?{...cell, isProtected:true}:cell)}))),
    syncBoard:(cells,turnNumber,completedSequences)=>set({board:cells, turnNumber, completedSequences:{...get().completedSequences,...completedSequences}}),
    resetBoard:()=>set({board:createInitialBoard(),cardsLeft:104,
    cardsDiscarded:0,
    lastDiscardedCard:null})
}))