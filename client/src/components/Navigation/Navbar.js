import React from 'react';
import classes from './NavBar.module.css'
import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'
import logo from '../../assets/logo.png'
const NavBar = () => {

    return (

        <div className={classes.NavBar}>

            <div className={classes.logo}>
                <img src={logo} />
                Mixshare Live
                </div>
            <MobileNavigation />
            <Navigation />
        </div>

    )
}

export default NavBar