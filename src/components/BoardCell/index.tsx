import type { BoardTileState } from "../../types/game";
import { returnCardValue, type ParsedCardValue } from "../../utils/cardUtils";
import styles from "./BoardCell.module.css";
import CornerCellImage from "../../../src/assets/cornerCell.svg";
import { Chip } from "../Chip";

interface BoardCellProps {
    cellState: BoardTileState; // State of the cell
    onCellClick?: (index: number) => void; // Callback when the cell is clicked
}

export const BoardCell = (props: BoardCellProps) => {
    const { cellState, onCellClick } = props;
    const { index, cardCode, chipColor, isOccupied, isHighlighted, isProtected, isCorner } = cellState;
    const card:ParsedCardValue= returnCardValue(cardCode);
    const {value,suit,color}=card

    const cellClasses = `${styles.cell} ${isHighlighted ? styles.highlighted : ''} ${isOccupied ? styles.occupied : ''} ${isProtected ? styles.protected : ''}`;
    const handleClick = () => {
        if (onCellClick) {
            onCellClick(index);
        }
    }


    const cornerCellStyle  = {
        '--backgroundImage': `url(${CornerCellImage})`,
    } as React.CSSProperties

    const cellStyle: React.CSSProperties = {
        color: color === 'red' ? '#d32f2f' : '#1a1a1a',
    }

    return <div className={cellClasses} onClick={handleClick} style={cellStyle}>
        {isCorner?
        <div className={styles.cornerCell} style={cornerCellStyle} />
        :(isOccupied && chipColor) ? (
            <div className={styles.filledCell}>
                <div className={styles.cellValue}>
                    <span>{value}</span>
                    <span>{suit}</span>
                </div>
               <span className={styles.chip}><Chip color={chipColor} placeWithAnimation={true}/></span> 
            </div>
        ) : (
            <div className={styles.emptyCell}>
                <span>{value}</span>
                <span>{suit}</span>
            </div>
        )}
    </div>;

}
