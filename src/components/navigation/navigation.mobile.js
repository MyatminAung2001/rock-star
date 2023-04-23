"use client"

import { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';


const Navigation = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="container absolute top-0 left-0 right-0 w-screen">
            <div className="flex items-center justify-between">
                <p className="text-primary-white text-md">
                    RockStar
                </p>
                <div className="sticky z-[150] top-0 right-0">
                    <Hamburger 
                        toggled={isMenuOpen} 
                        toggle={setIsMenuOpen} 
                        size={28}
                        color={isMenuOpen ? "#141301" : "#E5E7E6"}
                        label="menu"
                    />
                </div>
            </div>
            <div>
                {isMenuOpen && (
                    <div className="bg-primary-bg-white h-screen w-[70%] fixed right-0 top-0">
                        
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navigation;