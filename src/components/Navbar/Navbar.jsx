import { useState } from "react";   
import {Link,NavLink} from 'react-router-dom';
import './Navbar.css';


function Navbar() { 
    //state för mobilmenyn
    const [isOpen, setIsOpen] = useState(false);
    //funktion för att toggla mobilmenyn
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    //när man klickar på något så ska mobilmenyn stängas ;P
    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    Hotel Vela Stay
                </Link>
                <button className="menu-toggle" onClick={toggleMenu}>
                     ☰
                     </button>

                <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/" className="navbar-link" onClick={closeMenu}>
                        Hem
                    </NavLink>

                    <NavLink to="/booking" className="navbar-link" onClick={closeMenu}>
                        Boka 
                    </NavLink>
                        <NavLink to="/restaurant" className="navbar-link" onClick={closeMenu}>      
                        Restaurang
                    </NavLink>
                    <NavLink to="/spa" className="navbar-link" onClick={closeMenu}>
                        Spa
                    </NavLink>

                    <NavLink to="/contact" className="navbar-link" onClick={closeMenu}>
                        Kontakt
                    </NavLink>

                     <NavLink to="/aboutUs" className="navbar-link" onClick={closeMenu}>
                        Om oss
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}   
export default Navbar;
