/** From React */
import React from 'react';

/** Installed Packages */
import {Link} from 'react-router-dom';

/** CSS */
import './local-item.style.css';

function LocaleItem(props){

    return(

        <div className = "local-item-container">

            {   
                
                <Link to = {"/locationimages/" + props.location.venue.name + "/" + props.location.venue.id}>
                    <div className = "local-item">
                        
                        <h2>{props.location.venue.name}</h2>
                        <h4>{props.location.venue.location.address}</h4>
                        <h5>{props.location.venue.categories[0].name}</h5>
                        
                    </div>

                </Link>
                
            }
            
        </div>

    );

}

export default LocaleItem;