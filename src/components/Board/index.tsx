import { useMemo, useState } from "react";
import type { BoardState, TeamColor } from "../../types/game";
import styles from "./Board.module.css"
import { BOARD_LAYOUT } from "../../config/boardLayout";
import { BoardCell } from "../BoardCell";
import { useBoardStore } from "../../stores/useBoardStore";
import { useGameStore } from "../../stores/useGameStore";

interface BoardProps {
    highlightedCells?: number[]; // Array of indices of highlighted cells
    onSelectCell?: (index: number) => void; // Callback when a cell is selected
}

const NEXT_CHIP: Record<string, TeamColor | null> = {
  NONE: 'BLUE',
  BLUE: 'GREEN',
  GREEN: 'RED',
  RED: null,
};

const getCellCenterPercentage = (index: number): { x: number; y: number } => {
    const row = Math.floor(index / 10);
    const col = index % 10;
    return { x: (col + 0.5) * 10, y: (row + 0.5) * 10 };
};
export const Board=(props:BoardProps)=>{
   

    const {board, completedSequences, setCellChip} = useBoardStore()
    const {highlightedIndices: gameHighlightedCells, playerTeam, isMyTurn, consumeCard, selectedCard} = useGameStore()


    const cells = useMemo(() => {
        return board.map((boardCell, index) => ({
            index,
            cardCode: boardCell.cardCode,
            chipColor: boardCell.chipColor,
            isHighlighted: gameHighlightedCells.includes(index),
            isProtected: boardCell.isProtected,
            isCorner: boardCell.cardCode === 'CORNER',
        }));
    }, [board, gameHighlightedCells]);

    const handleCellClick = (index: number, isHighlighted: boolean) => {
        // if(onSelectCell){
        //     onSelectCell(index);
        //     return;
        // }


        //THis is for local testing only later add a emit event
        if(!isHighlighted || !isMyTurn || selectedCard == null){return;}
        setCellChip(index, playerTeam);
        consumeCard(selectedCard)
    }
    return(
        <div className={styles.boardContainer}>
            <div className={styles.boardGrid}>
                {cells.map((cell) => {
                    return<BoardCell key={cell.index} cellState={cell} onCellClick={()=>handleCellClick(cell.index, cell.isHighlighted)}/>;
                })}
                <svg className={styles.sequenceConnectorsOverlay}>
                    {(Object.entries(completedSequences) as [TeamColor, number[][]][]).flatMap(([team, sequences]) => (
                            sequences.map((seq, i) => {
                                const start = getCellCenterPercentage(seq[0]);
                                const end = getCellCenterPercentage(seq[seq.length - 1]);
                               return <line
                                    key={`${team}-${i}`}
                                    x1={`${start.x}%`}
                                    y1={`${start.y}%`}
                                    x2={`${end.x}%`}
                                    y2={`${end.y}%`}
                                    className={styles.sequenceConnector}
                                    stroke={team === 'BLUE' ? "#0000FF" : team === 'GREEN' ? "#00FF00" : "#FF0000"}
                                    strokeWidth="2"
                                    fill="none"
                                />}
                            )
               
                    ))}
                </svg>
            </div>
            
        </div>
    )
}