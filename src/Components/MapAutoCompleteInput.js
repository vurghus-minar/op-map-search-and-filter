/*global google*/
import React, {useState} from 'react';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import fitnessCenters from '../data/fitness-centers.json';

import { FitnessCenterStore } from '../store/FitnessCenterContext';
 
const MapAutoCompleteInput = () => {

    const { state, dispatch } = FitnessCenterStore();

    const latitude = state.mapCenter ? state.mapCenter.latitude : state.mapDefaultPosition.latitude;
    const longitude = state.mapCenter ? state.mapCenter.longitude : state.mapDefaultPosition.longitude;

    const searchOptions = {
        location: new google.maps.LatLng(latitude, longitude),
        radius: 16093.4,
        country: 'uk',
    };

    const [address, setAddress] = useState({address: ''});
    const handleChange = address => {
        setAddress({ address });
    };
 
    const handleSelect = address => {
        setAddress({ address });
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                //console.log(google.maps.Map(document.getElementById('map')));
                dispatch({ type: "SET_ADDRESS", payload: latLng });
            })
            .catch(error => console.error('Error', error));
    };
 

    // const findBounds = () => {
    //     let fitnessCentersInBounds = [];
    //     const currentBounds = gMap.getBounds();
    //     fitnessCenters.forEach(function(item) {
    //         const latlngLiteral = {lat:item.latitude, lng:item.longitude};
    //         if(currentBounds.contains(latlngLiteral)){
    //             fitnessCentersInBounds.push(item.centre_id);
    //         }
    //     });                
    //     dispatch({ type: "FILTER_FITNESS_CENTERS_BY_LOCATION", payload: fitnessCentersInBounds });
    // };

    return (
        <PlacesAutocomplete
            value={address.address}
            onChange={handleChange}
            onSelect={handleSelect}
            searchOptions={searchOptions}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input ant-input',
                        })}
                    />
                    
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion, i) => {
                            const className = 'suggestion-item';
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                    key={i}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );

};

export default MapAutoCompleteInput;