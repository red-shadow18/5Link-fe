import type { CardCode } from '@5link/shared';
import styles from "./PlayerHandDrawer.module.css"


interface PlayerHandDrawerProps {
    cards: CardCode[];
    selectedCard: CardCode | null;
    onSelectedCard: (card:CardCode)=>void;
}

export const PlayerHandDrawer=(props:PlayerHandDrawerProps)=>{
const {cards, selectedCard, onSelectedCard} =props


return (
    <footer className={styles.playerHandDrawerContainer}>
        <div className={styles.cardsContainer}>
            {
                cards.map((code,index)=>{
                    //const {value,suit,color,isJack,jackType} = returnCardValue(code);
                    
                    const isSelected = selectedCard === code;
                    const cardClasses=`${styles.card} ${isSelected?styles.selected:''}`
                    return(
                    <div
                        key={`${code}-${index}`}
                        className={cardClasses}
                        onClick={()=> onSelectedCard(code)}
                        >
                    <svg className={styles.playingCard}>
                        <use href={`/52CardsSprite.svg#card-${code}`}/>
                    </svg>

                    </div>)
                })
            }
        </div>

    </footer>
)

}
