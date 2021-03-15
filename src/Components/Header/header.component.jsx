/** From React */
import React from 'react';

/** Installed Packages */
import {Link} from 'react-router-dom';

/** CSS */

import './header.style.css';

function Header(){

    return(

        <div className = "App-header">
            <h3>
                <Link to = "/">
                    Locate
                </Link>
            </h3>
            <Link to = "/saved-venues">
                <h4>Saved Venues</h4>
            </Link>
           
        </div>

    );

}


export default Header;