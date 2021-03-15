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
                        
                        <h4>{props.location.venue.name}</h4>
                        <h4>{props.location.venue.location.address}</h4>
                        <h4>{props.location.venue.categories[0].name}</h4>
                        
                    </div>

                </Link>
                
            }
            
        </div>

    );

}

export default LocaleItem;