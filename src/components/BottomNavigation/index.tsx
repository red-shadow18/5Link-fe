import { NavLink } from 'react-router-dom';
import  styles from './BottomNavigation.module.css'
import { House, Podium, ShieldHalf, ScrollText } from 'lucide-react';




const navItems = [
  {
    path: '/',
    label: 'Home',
    icon: <House size={20}/>,
},
 {
    path: '/rankings',
    label: 'Rankings',
    icon: <Podium size={20}/>,
},
 {
    path: '/stats',
    label: 'Stats',
    icon: <ShieldHalf size={20}/>
},
 {
    path: '/rules',
    label: 'Rules',
    icon: <ScrollText size={20}/>
},
]
export const BottomNavigation = () => {
return (
    <nav className={styles.bottomNavigation}>
        {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? styles.navItem + ' ' + styles.active : styles.navItem}>
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
            </NavLink>
        ))}
    </nav>  
)
}   