import styles from './Chip.module.css'

const CHIPS_COLORS={
    blue:{
        bg:"#2563eb",
        conicGradient:"#2563eb 0deg 45deg, #ffffff 45deg 90deg, #2563eb 90deg 135deg, #ffffff 135deg 180deg, #2563eb 180deg 225deg, #ffffff 225deg 270deg, #2563eb 270deg 315deg, #ffffff 315deg 360deg",
    },
    green:{
        bg:"#10b981",
        conicGradient:"#10b981 0deg 45deg, #ffffff 45deg 90deg, #10b981 90deg 135deg, #ffffff 135deg 180deg, #10b981 180deg 225deg, #ffffff 225deg 270deg, #10b981 270deg 315deg, #ffffff 315deg 360deg",
    },
    red:{
        bg:"#f43f5e",
        conicGradient:"#f43f5e 0deg 45deg, #ffffff 45deg 90deg, #f43f5e 90deg 135deg, #ffffff 135deg 180deg, #f43f5e 180deg 225deg, #ffffff 225deg 270deg, #f43f5e 270deg 315deg, #ffffff 315deg 360deg",
    }   
}

type chipColor='blue' | 'red' | 'green';

export const Chip=({color, zInd=2}:{color: chipColor, zInd?: number})=>{
    const chip = CHIPS_COLORS[color] || CHIPS_COLORS.blue;

    const parentStyles={
        zIndex: zInd,
        backgroundImage: `${chip.conicGradient}`,
    }
    
    const coreStyles={
        backgroundColor: chip.bg
    }  
    return(
        <div className={styles.chipParent} style={parentStyles}>
            <div className={styles.chipCore} style={coreStyles}>
                <div className={styles.dashedRing}>
                    <div className={styles.centerDot} />
                </div>
                <div className={styles.glossOverlay} />    
            </div>
        </div>
    )
}