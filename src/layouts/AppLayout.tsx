import { Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css'
import '../global.css'
import { Chip } from '../components/Chip';
import { BottomNavigation } from '../components/BottomNavigation';

export const Applayout=()=>{

    const isInsideGame=false; //TODO: check if user is inside a game or not
    
    return(
        <div className={styles.desktopWrapper}>
            <main className={styles.mobileFrame}>
                {/* #header */}
                <section className={styles.header}>
                    <div className={styles.coinsContainer}>
                        <Chip  color="BLUE" zInd={3}/>
                        <Chip color="GREEN"/>
                        <Chip isProtected={true} color="RED" zInd={1}/>
                    </div>
                    <span className="app-title">5Link</span>
                    <div className={styles.suitesGraphicContainer}>
                        <span className="casinoBlack">♠</span>
                        <span className="casinoRed">♥</span>
                        <span className="casinoRed">♦</span>
                        <span className="casinoBlack">♣</span>
                    </div>
                </section>
                {/* #content */}
                <section className={styles.content}>
                    <Outlet/>
                </section>
                {/* #footer */}
                <section className={styles.footer}>
                    {isInsideGame ? "" : <BottomNavigation
                    />}
                </section>
                
            </main>
        </div>
    )
}