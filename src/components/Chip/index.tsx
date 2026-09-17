import styles from './Chip.module.css'
import {Lock} from 'lucide-react';

const CHIPS_COLORS={
    BLUE:{
        bg:"#2563eb",
        conicGradient:"#2563eb 0deg 45deg, #ffffff 45deg 90deg, #2563eb 90deg 135deg, #ffffff 135deg 180deg, #2563eb 180deg 225deg, #ffffff 225deg 270deg, #2563eb 270deg 315deg, #ffffff 315deg 360deg",
    },
    GREEN:{
        bg:"#10b981",
        conicGradient:"#10b981 0deg 45deg, #ffffff 45deg 90deg, #10b981 90deg 135deg, #ffffff 135deg 180deg, #10b981 180deg 225deg, #ffffff 225deg 270deg, #10b981 270deg 315deg, #ffffff 315deg 360deg",
    },
    RED:{
        bg:"#f43f5e",
        conicGradient:"#f43f5e 0deg 45deg, #ffffff 45deg 90deg, #f43f5e 90deg 135deg, #ffffff 135deg 180deg, #f43f5e 180deg 225deg, #ffffff 225deg 270deg, #f43f5e 270deg 315deg, #ffffff 315deg 360deg",
    }   
}

type chipColor='BLUE' | 'RED' | 'GREEN';

interface ChipProps{
color: chipColor;
 zInd?: number;
 isProtected?: boolean;
 placeWithAnimation?: boolean;
 removeAnimation?: boolean;
}

export const Chip=(props: ChipProps)=>{
    const {color, zInd=0, isProtected=false, placeWithAnimation=false, removeAnimation=false}=props;
    const chip = CHIPS_COLORS[color] || CHIPS_COLORS.BLUE;

    const showAnimation=placeWithAnimation || removeAnimation;
    const parentStyles: React.CSSProperties={
        animation:showAnimation ? (placeWithAnimation ? "dropChip .5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" : "removeChip 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)") : 'none',
        zIndex: zInd,
        backgroundImage: chip.conicGradient,
    }

    
    
    const coreStyles={
        backgroundColor: chip.bg
    }  
    return(
        <div className={styles.chipParent} style={parentStyles}>
            {isProtected && <Lock size={8} strokeWidth={4} color="#d1b81a" className={styles.lockIcon}/>}
            <div className={styles.chipCore} style={coreStyles}>
                <div className={styles.dashedRing}>
                    <div className={styles.centerDot} />
                </div>
                <div className={styles.glossOverlay} />    
            </div>
        </div>
    )
}