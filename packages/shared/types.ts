import { BOARD_LAYOUT } from "./config/boardLayout";

export type TeamColor = 'BLUE' | 'RED' | 'GREEN';

export type BoardState = BoardTileState[];

export type BoardCardCode = (typeof BOARD_LAYOUT)[number];
export type JackCardCode = 'JH' | 'JS' | 'JC' | 'JD';
export type CardCode = Exclude<BoardCardCode, 'CORNER'> | JackCardCode;

export type CardSuit = 'S' | 'H' | 'D' | 'C' | '';

export type SuitValue= '♠' | '♥' | '♦' | '♣' | '';

export type CardColor= 'red' | 'black' | '';

export type  JackType = 'ONE_EYED' | 'TWO_EYED' | undefined;

export interface BoardTileState {
    index: number;
    cardCode: BoardCardCode;
    chipColor: TeamColor | null;
    isCorner:boolean;
    isHighlighted: boolean;
    isProtected: boolean; // in case its a part of a sequence
}

export interface ParsedCardValue {
    cardCode:BoardCardCode;
    value:string;
    suitCode:CardSuit;
    suit:SuitValue;
    color: CardColor;
    isCorner:boolean;
    isJack:boolean;
    jackType?: JackType;
}

