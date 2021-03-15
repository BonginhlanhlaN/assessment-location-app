import React from 'react';

import './searchbar.style.css';

class  SearchBar extends React.Component{

    constructor(props){
        super(props);

        this.state = {

            locationname: ''

        }

    }

    onSubmitLocation = (e) => {

        e.preventDefault();
        this.props.getNearbyPlaces(this.state.locationname);

    }

    onChangeLocationText = (e) => {

        this.setState({ [e.target.name]: e.target.value });//[e.target.name]:- to avoid making new onChange methods for every input-text we add on our form

    }

    handleUseCurrentLocation = () => {

        this.props.useCurrentLocation();

    }

    render(){
        return(

            <div className = "search-container">

                <form onSubmit = { this.onSubmitLocation }>

                    <input type = "text" name = "locationname" placeholder = "search location" 
                    onChange = { this.onChangeLocationText } />
                    <input type = "submit" value = "Search" className = "submit-search-btn" />

                </form>
                
                <button onClick = {this.handleUseCurrentLocation} >My Location</button>
                
            </div>

        );
    }

}

export default SearchBar;