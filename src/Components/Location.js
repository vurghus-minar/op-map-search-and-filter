import React from "react";
import { geolocated } from "react-geolocated";

import {Button} from'antd';

import { FitnessCenterStore} from '../store/FitnessCenterContext';
 
const Location = (props) => {
    const { dispatch } = FitnessCenterStore();

    return !props.isGeolocationAvailable ? (
        <div className="geolocation_info">Your browser does not support Geolocation</div>
    ) : !props.isGeolocationEnabled ? (
        <div className="geolocation_info">Geolocation is not enabled</div>
    ) : props.coords ? (
        <div>
            {/* <input type="hidden" id="browser_geolocation" name="browser_geolocation" value={[props.coords.latitude,props.coords.longitude]}/> */}
            <Button className="geolocation_btn" type="primary" icon="global" onClick={() => dispatch({ type: "GET_GEOLOCATION", payload: [props.coords.latitude,props.coords.longitude] })}>
                    Use My Location
            </Button>
            <Button className="geolocation_btn" type="secondary" onClick={() => dispatch({ type: "RESET_MAP", payload: [props.coords.latitude,props.coords.longitude] })}>
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