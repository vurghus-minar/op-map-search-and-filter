import React, {Fragment} from 'react';
import { Card } from 'antd';
import {GoogleMap, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';

// import {FitnessCenterContext} from '../store/FitnessCenterContext';
import {FitnessCenterStore} from '../store/FitnessCenterContext';
const MapDefault = (props) => {
    const { state } = FitnessCenterStore();
    return (
        <GoogleMap
            defaultZoom={state.mapZoomLevel}
            zoom={state.mapZoomLevel}
            defaultCenter={{ lat: state.mapDefaultPosition.latitude, lng: state.mapDefaultPosition.longitude }}
            center={{ 
                lat: state.mapCenter ? state.mapCenter.latitude : state.mapDefaultPosition.latitude,
                lng: state.mapCenter ? state.mapCenter.longitude : state.mapDefaultPosition.longitude }}
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
};

const Map = withGoogleMap(MapDefault);

export default Map;