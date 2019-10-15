/*global google*/
import React, {Fragment} from 'react';
import { Card } from 'antd';
import {GoogleMap, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';

import { compose, withProps } from "recompose";

import {FitnessCenterStore} from '../store/FitnessCenterContext';

import data from '../data/fitness-centers.json';

const Map = compose(
    withProps({
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withGoogleMap
)(() => {
    const { state, dispatch } = FitnessCenterStore();
    let gMap;
    let fitnessCenterInBounds = [];
    const radiusBound = () =>{ new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        center: {
            lat: state.mapCenter ? state.mapCenter.latitude : state.mapDefaultPosition.latitude,
            lng: state.mapCenter ? state.mapCenter.longitude : state.mapDefaultPosition.longitude },
        radius: 1000
    });
    };
    const filterFitnessCenter = () => {
        data.forEach(fc => {
            if(gMap.getBounds().contains({lat: fc.latitude, lng: fc.longitude})){
                fitnessCenterInBounds.push(fc);
            }
        });
    };
    return (
        <GoogleMap
            ref={(map)=>{gMap = map;}}
            defaultZoom={state.mapZoomLevel}
            zoom={state.mapZoomLevel}
            defaultCenter={{ lat: state.mapDefaultPosition.latitude, lng: state.mapDefaultPosition.longitude }}
            center={{
                lat: state.mapCenter ? state.mapCenter.latitude : state.mapDefaultPosition.latitude,
                lng: state.mapCenter ? state.mapCenter.longitude : state.mapDefaultPosition.longitude }}
            onIdle={()=>{
                filterFitnessCenter();
                dispatch({ type: "FILTER_FITNESS_CENTERS_BY_LOCATION", payload: fitnessCenterInBounds });
                radiusBound();
            }}
        >
            {state.showMarker?
                <Fragment>
                    <Marker
                        key={state.marker.centre_id}
                        position={{
                            lat: state.marker.latitude,
                            lng: state.marker.longitude
                        }}
                    />
                    <InfoWindow
                        position={{
                            lat: state.marker.latitude,
                            lng: state.marker.longitude
                        }}
                    >
                        <Card className="fitness-center fitness-center-marker" bordered={false}>
                            <p className="fitness-center-name">{state.marker.name}</p>
                            <p className="fitness-center-address">{state.marker.address}</p>
                            <p className="fitness-center-facilities"></p>
                        </Card>                            
                    </InfoWindow>                        
                </Fragment>
                :''}
        </GoogleMap>
    );
});

export default Map;