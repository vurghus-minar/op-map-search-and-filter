import React, {Fragment} from 'react';
import { Card } from 'antd';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';

import {FitnessCenterContext} from '../store/FitnessCenterContext';

const MapDefault = () => {
    
    return (
        <FitnessCenterContext.Consumer>
        {
            context => (

                <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: context.state.mapDefaultPosition.latitude, lng: context.state.mapDefaultPosition.longitude }}
                center={{ 
                    lat: context.state.mapCenter?context.state.mapCenter.latitude:context.state.mapDefaultPosition.latitude,
                    lng: context.state.mapCenter?context.state.mapCenter.longitude:context.state.mapDefaultPosition.longitude }}
                >
                    {context.state.showMarker?
                        <Fragment>
                                <Marker
                                    key={context.state.marker.centre_id}
                                    position={{
                                        lat: context.state.marker.latitude,
                                        lng: context.state.marker.longitude
                                    }}
                                />
                                <InfoWindow
                                    position={{
                                        lat: context.state.marker.latitude,
                                        lng: context.state.marker.longitude
                                    }}
                                    
                                    className="bla"
                                    
                                >
                                    <Card className="fitness-center fitness-center-marker" bordered={false}>
                                        <p className="fitness-center-name">{context.state.marker.name}</p>
                                        <p className="fitness-center-address">{context.state.marker.address}</p>
                                        <p className="fitness-center-facilities"></p>
                                    </Card>                            
                                </InfoWindow>                        
                        </Fragment>
                    :''}
                </GoogleMap>
            )
        }
        </FitnessCenterContext.Consumer>
    )
}

const Map = withScriptjs(withGoogleMap(MapDefault));

export default Map;