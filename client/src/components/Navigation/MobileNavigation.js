import React from 'react';
import NavLinks from './NavLinks'
import classes from './NavBar.module.css'
import { useState } from 'react'

const MobileNavigation = () => {

    const [open, setOpen] = useState(false);

    const openHamburger =
        <i
            style={{ right: '5%', color: '#fff', fontSize: 30, cursor: 'pointer' }}
            className="fas fa-bars"
            onClick={() => setOpen(!open)}
        />
    const closeHamburger =
        <i
            style={{ color: '#fff', fontSize: 30, cursor: 'pointer' }}
            className="fas fa-times"
            onClick={() => setOpen(!open)}
        />

    const closeMobileMenu = () => setOpen(false);

    return (
        <nav className={classes.MobileNavigation}>
            {open ? closeHamburger : openHamburger}
            {open && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu} />}
        </nav>
    )
}
export default MobileNavigation