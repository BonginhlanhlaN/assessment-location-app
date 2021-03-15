import React from 'react';

import './saved-venues.style.css';

class SavedVenue extends React.Component{

    constructor(props){
        super(props);

        this.state = {

            savedVenues: JSON.parse(sessionStorage.getItem('savedVenues'))

        }

    }


    deleteFavouriteVenue(id){
        

        let afterDeleteArray = this.deleteSpecificVenue(this.state.savedVenues , id);

        this.setState({ savedVenues: afterDeleteArray })

        
        sessionStorage.setItem('savedVenues', JSON.stringify(afterDeleteArray))
        
        if(afterDeleteArray.length === 0){

            sessionStorage.clear();
            this.setState({savedVenues: null});

        }
        

    }

    deleteSpecificVenue(savedVenues , id){

        for(var i = 0 ; i < savedVenues.length ; i++ ){

            if(savedVenues[i].id === id){

                savedVenues.splice(i , 1);
                break;

            }

        }

        return savedVenues;

    }

    render(){

        const savedVenues = this.state.savedVenues;
        
        const showSavedVenues = savedVenues ? (

        <div className = "saved-venues-container">{ 
            savedVenues.map((savedVenue) => (

                <React.Fragment key = {savedVenue.id}>

                    {
                        <div className = "saved-venue-container">
                            <img src = {savedVenue.image} alt = "saved-venue" />

                            <h3>{savedVenue.address}</h3>
                            <h4>{savedVenue.name}</h4>
                            <button onClick = { () => this.deleteFavouriteVenue(savedVenue.id)}>Delete</button>

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