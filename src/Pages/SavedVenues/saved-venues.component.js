import React from 'react';

import './saved-venues.style.css';

class SavedVenue extends React.Component{

    render(){

        const savedVenues = JSON.parse(sessionStorage.getItem("savedVenues"));
        
        const showSavedVenues = (savedVenues)? (

        <div className = "saved-venue-container">{ 
            savedVenues.map((savedVenue) => (

                <React.Fragment key = {savedVenue.id}>

                    {
                        <div>
                            <img src = {savedVenue.image} alt = "saved-venue" />

                            <h5>{savedVenue.address}</h5>
                            <h5>{savedVenue.name}</h5>
                        </div>
                    }

                </React.Fragment>

            ))}
        </div>):(<h2>No venues saved</h2>)

        return(

            <div>
                
                {

                    showSavedVenues

                }

            </div>

        );

    }

}

export default SavedVenue;