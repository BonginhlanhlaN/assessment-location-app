/** From React */
import React from 'react';

/** Installed Packages */
import axios from 'axios';

/** CSS */
import './imagedetails.styles.css';

class ImageDetails extends React.Component{

    constructor(props){
        super(props);
        this.state = {

            venuePhoto: null

        }
    }

    getVenuePhoto(image_id){

        const endPoint = 'https://api.foursquare.com/v2/photos/' + image_id +'?';

        const parameter = {

            client_id: 'TIG4VWGSW1OHNTJPY5YJWP0S3BH2DZBHLIBTQJ5PBKFNNU3O',
            client_secret: 'EZ01RYFOO4YWKPTMYUXDHSMQM0XNFCVDI20CXEBMI2MH4JR3',
            v: '20180323'

        }

        axios.get(endPoint + new URLSearchParams(parameter)).then((response) => {
           
            this.setState({venuePhoto: response.data.response.photo});

        });

    }

    handleSaveVenue = () =>{
        
        if(sessionStorage.getItem('savedVenues')){

            var savedVenues = JSON.parse(sessionStorage.getItem("savedVenues"));

            const favouritVenue = {

                id: this.state.venuePhoto.id,
                image: this.state.venuePhoto.prefix + '100x100' + this.state.venuePhoto.suffix ,
                name: this.state.venuePhoto.venue.name , 
                address: this.state.venuePhoto.venue.location.address

            }

            
            if(!this.isVenueAlreadySaved(savedVenues , favouritVenue)){
                
                savedVenues.push(favouritVenue);
                sessionStorage.setItem('savedVenues', JSON.stringify(savedVenues));

            }
            
            
        }else{
           
            let savedVenues = [];

            sessionStorage.setItem('savedVenues' , JSON.stringify(savedVenues));

            const favouritVenue = {
                id: this.state.venuePhoto.id,
                image: this.state.venuePhoto.prefix + '100x100' + this.state.venuePhoto.suffix ,
                name: this.state.venuePhoto.venue.name , 
                address: this.state.venuePhoto.venue.location.address

            }

            savedVenues.push(favouritVenue);
            sessionStorage.setItem('savedVenues', JSON.stringify(savedVenues));
        
        }

    }

    isVenueAlreadySaved(savedVenues , savedVenue){

        var isAlreadySaved = false;

        for(var i = 0; i < savedVenues.length; i++){

            if(savedVenues[i].id === savedVenue.id){

                isAlreadySaved = true;
                break;
            
            }

        }

        return isAlreadySaved;

    }

    componentDidMount(){

        const imageId = this.props.match.params.image_id;
        this.getVenuePhoto(imageId)

    }

    render(){

        const {venuePhoto} = this.state;

        const imageDetails = (venuePhoto) ? 
        (<div className = "image-details-container">

            {
                <React.Fragment>

                    <img src = {venuePhoto.prefix +'300x300'+venuePhoto.suffix} alt = "VenuaImage"/>

                    <h4>{venuePhoto.venue.name}</h4>
                    <h4>{venuePhoto.venue.location.address}</h4>

                    <button onClick = {this.handleSaveVenue}>Save Venue</button>

                </React.Fragment>

            }

        </div>):(<div></div>)

        return(

            <div>{imageDetails}</div>

        );

    }

}

export default ImageDetails;