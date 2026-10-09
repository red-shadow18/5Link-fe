import type { BoardCardCode, CardColor, CardSuit, JackCardCode, JackType, ParsedCardValue,SuitValue,  } from "./types";



const ONE_EYED_JACKS:JackCardCode[]=['JS','JH'];

const suitData : Record<Exclude<CardSuit, ''>, { symbol: SuitValue; color: CardColor }>= {
    S: { symbol: '♠', color: 'black' },
    H: { symbol: '♥', color: 'red' },
    D: { symbol: '♦', color: 'red' },
    C: { symbol: '♣', color: 'black' }
  };



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