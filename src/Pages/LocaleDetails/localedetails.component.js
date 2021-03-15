/** From React */
import React from 'react';

/** Installed Packages */
import axios from 'axios';
import {Link} from 'react-router-dom';

/** CSS */
import './localedetails.style.css';

class LocaleDetails extends React.Component{

    constructor(props){
        super(props);

        this.state = {

            venuePhotos: null

        }

    }

    getVenuePhotos(venueId){

        const endPoint = 'https://api.foursquare.com/v2/venues/' + venueId + '/photos?';

        const parameters = {

            limit: 10,
            client_id: 'TIG4VWGSW1OHNTJPY5YJWP0S3BH2DZBHLIBTQJ5PBKFNNU3O',
            client_secret: 'EZ01RYFOO4YWKPTMYUXDHSMQM0XNFCVDI20CXEBMI2MH4JR3',
            v: '20180323'

        }

        axios.get(endPoint + new URLSearchParams(parameters))
        .then(response => { 

            this.setState({venuePhotos: response.data.response.photos.items});    

        });

    }

    componentDidMount(){

        const venueId = this.props.match.params.venue_id;
        this.getVenuePhotos(venueId);

    }
    
    render(){

        
        const venuePhotoz = this.state.venuePhotos;
        const venueName = this.props.match.params.venue_name;
        const showVenueImages = (venuePhotoz)? (
            
            <div className = "venue-images-container">{ 
                
                venuePhotoz.map((venuePhoto) => ( <div key = {venuePhoto.id}> 

                    <Link to = {'/imagedetails/' + venuePhoto.id}>
                        <div className = "venue-image-container">
                            <img src = {venuePhoto.prefix + '300x300'+ venuePhoto.suffix} alt = "VenueImage"/> 
                        </div>
                    </Link>

                </div>)) }
            </div>):(<div></div>);

        return(

            <div>
                {
                    <React.Fragment>
                        <h2>Venue Pictures for {venueName}</h2>
                        {showVenueImages}
                    </React.Fragment>
                    
                }
            </div>

        );  

    }

}

export default LocaleDetails;