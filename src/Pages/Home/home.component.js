/** From React */
import React from 'react';

/** Custom Components */
import SearchBar from '../../Components/SearchBar/searchbar.component';
import LocaleItem from '../../Components/LocaleItem/locale-item.component';

/** CSS */
import './home.style.css';

class Home extends React.Component{

    constructor(props){
        super(props);

        this.state = {

        }

    }

    render(){

        const { surroundingLocations , getNearbyPlaces , useCurrentLocation } = this.props;
        
        const showDetails = surroundingLocations ? 
            (<div className = "locale-items-container">
                {surroundingLocations.map((location) => (

                    <div key = {location.referralId}>
                        { <LocaleItem  location = {location} /> }
                    </div>))}

            </div>) : (<h2>Search for existing location</h2>);

        return(

            <div className = "home-container">


                <SearchBar getNearbyPlaces = { getNearbyPlaces } useCurrentLocation = {useCurrentLocation} />

                {showDetails}

           </div>

        );

    }

}

export default Home;