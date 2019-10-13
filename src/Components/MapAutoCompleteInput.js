/*global google*/
import React, {useState} from 'react';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import { FitnessCenterStore } from '../store/FitnessCenterContext';
 
const MapAutoCompleteInput = () => {

    const { state, dispatch } = FitnessCenterStore();

    let latitude;
    let longitude;

    if(!state.mapCenter){
        latitude =  state.mapDefaultPosition.latitude;
        longitude = state.mapDefaultPosition.longitude;
    } else {
        latitude =  state.mapCenter.latitude;
        longitude = state.mapCenter.longitude;
    }

    const searchOptions = {
        location: new google.maps.LatLng(latitude, longitude),
        radius: 16093.4,
        country: 'uk',
        bounds: new google.maps.LatLng(state.mapDefaultPosition.latitude,state.mapDefaultPosition.longitude)
    };



    const [address, setAddress] = useState({address: ''});
    const handleChange = address => {
        setAddress({ address });
    };
 
    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                dispatch({ type: "SET_ADDRESS", payload: latLng });
            })
            .catch(error => console.error('Error', error));
    };
 

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