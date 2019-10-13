import React, { useEffect } from "react";
import { geolocated } from "react-geolocated";

import {Button} from'antd';

import { FitnessCenterStore } from '../store/FitnessCenterContext';

const Location = (props) => {
    const { state, dispatch } = FitnessCenterStore();

    useEffect(() => {
        const setLocationByIP = async () => {
            try{
                const response = await fetch('http://ip-api.com/json');
        
                if (response.status !== 200) {
                    console.log('Request failed.  Returned status of', response.status);
                    return;
                }
        
                const data = await response.json();
                dispatch({ type: "SET_GEOLOCATION", payload: [data.lat, data.lon] });
            } catch (err) {
                console.log('Fetch Error :-S', err);
            }
        };

        if(state.useIPLocator){
            setLocationByIP();
        }
        
    }, []);

    return !props.isGeolocationAvailable ? (
        <div className="geolocation_info">Your browser does not support Geolocation<br />Geolocation approximated using IP</div>
    ) : !props.isGeolocationEnabled ? (
        <div className="geolocation_info">Geolocation is not enabled<br />Geolocation approximated using IP</div>
    ) : props.coords ? (
        <div>

            {/* <input type="hidden" id="browser_geolocation" name="browser_geolocation" value={[props.coords.latitude,props.coords.longitude]}/> */}
            <Button className="geolocation_btn" size="small" type="primary" icon="global" onClick={() => dispatch({ type: "SET_GEOLOCATION", payload: [props.coords.latitude,props.coords.longitude] })}>
                    Use My Location
            </Button>
            <Button className="geolocation_btn" size="small" type="secondary" onClick={() => dispatch({ type: "RESET_MAP", payload: [props.coords.latitude,props.coords.longitude] })}>
                    Reset Map
            </Button>
        </div>
    ) : (
        <div className="geolocation_info">Getting the location data&hellip; </div>
    );
};
 
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Location);