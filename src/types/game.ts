import type { BoardCardCode } from "../config/boardLayout";

export type TeamColor = 'BLUE' | 'RED' | 'GREEN';

export interface BoardTileState {
    index: number;
    cardCode: BoardCardCode;
    chipColor: TeamColor | null;
    isCorner:boolean;
    isOccupied: boolean;
    isHighlighted: boolean;
    isProtected: boolean; // in case its a part of a sequence
}

export type BoardState = BoardTileState[];