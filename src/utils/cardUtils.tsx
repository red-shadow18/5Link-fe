import type { BoardCardCode, JackCardCode } from "../config/boardLayout";

export type CardSuit = 'S' | 'H' | 'D' | 'C' | '';

export type SuitValue= '♠' | '♥' | '♦' | '♣' | '';

export type CardColor= 'red' | 'black' | '';

type  JackType = 'ONE_EYED' | 'TWO_EYED' | undefined;

const ONE_EYED_JACKS:JackCardCode[]=['JS','JH'];

const suitData : Record<Exclude<CardSuit, ''>, { symbol: SuitValue; color: CardColor }>= {
    S: { symbol: '♠', color: 'black' },
    H: { symbol: '♥', color: 'red' },
    D: { symbol: '♦', color: 'red' },
    C: { symbol: '♣', color: 'black' }
  };

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

const returnCardValue = (cardCode: BoardCardCode):ParsedCardValue => {
    if(cardCode=='CORNER'){
        return{
            cardCode:cardCode,
            value:'',
            suitCode:'',
            suit:'',
            color:'',
            isCorner:true,
            isJack:false,
            jackType:undefined
        }
    }

    const cardValue = cardCode.slice(0, -1); 
    const cardSuitCode :CardSuit= cardCode.slice(-1) as CardSuit;
    const isJack= cardValue=='J'
    const currentSuit=cardSuitCode !=='' ?suitData[cardSuitCode]:{symbol:'' as SuitValue, color:'' as CardColor}
    let jackType = undefined
    if(isJack){
        jackType= ONE_EYED_JACKS.includes(cardCode as JackCardCode)?'ONE_EYED':'TWO_EYED'
    }
    return {
        cardCode:cardCode,
            value:cardValue,
            suitCode:cardSuitCode,
            suit:currentSuit.symbol,
            color:currentSuit.color,
            isCorner:false,
            isJack:isJack,
            jackType:jackType as JackType
    }

}

export { returnCardValue };