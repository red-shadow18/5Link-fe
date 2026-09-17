import { useState } from "react";
import type { BoardState, TeamColor } from "../../types/game";
import styles from "./Board.module.css"
import { BOARD_LAYOUT } from "../../config/boardLayout";
import { BoardCell } from "../BoardCell";

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

export const Board=(props:BoardProps)=>{
    const{highlightedCells=[]}=props
    const [cells, setCells] = useState<BoardState>(()=> BOARD_LAYOUT.map((cardCode, index) => ({
        index,
        cardCode,
        chipColor: null,
        isOccupied: false,
        isHighlighted: highlightedCells.includes(index),
        isProtected: false,
        isCorner: cardCode === 'CORNER',
    })));

    const handleCellClick = (index: number) => {
        // if(onSelectCell){
        //     onSelectCell(index);
        //     return;
        // }


        //THis is for local testing only
        setCells(prevCells => {
            const newCells = [...prevCells];
            const currentChipColor = newCells[index].chipColor || 'NONE';
            const nextChipColor = NEXT_CHIP[currentChipColor];
            newCells[index] = {
                ...newCells[index],
                chipColor: nextChipColor,
                isOccupied: nextChipColor !== null,
            };
            return newCells;
        });
    }
    return(
        <div className={styles.boardContainer}>
            <div className={styles.boardGrid}>
                {cells.map((cell) => {
                    return<BoardCell key={cell.index} cellState={cell} onCellClick={handleCellClick}/>;
                })}
            </div>
        </div>
    )
}