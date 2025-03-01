import React, {createContext, useReducer, useContext} from 'react';
import PropTypes from "prop-types";

import data from '../data/fitness-centers.json';

const initialState = {
    fitnessCenters: data,
    showMarker: false,
    mapZoomLevel: 10,
    mapDefaultPosition:{
        latitude: 51.5287352,
        longitude: -0.3817821
    },
    marker:{
        latitude: 51.5287352,
        longitude: -0.3817821
    },
    useIPLocator: false,
    showDrawer: false,
};

export const FitnessCenterContext = createContext(initialState);

const reducer = (state, action) => {

    switch (action.type) {
    case 'FILTER_FITNESS_CENTERS':{
        let filters = {};

        action.payload.forEach(function(item){
            filters[item] = true;
        });
        
        const fitnessCenters = state.fitnessCenters.filter(function(item) {
            for (var key in filters) {
                if (item.facilities[key] === undefined || item.facilities[key] !== filters[key])
                    return false;
            }
            return true;
        });

        return {
            ...state,
            fitnessCenters,
            filters,
        };        
    }
    case 'FILTER_FITNESS_CENTERS_BY_LOCATION':{
        let fitnessCenters;
        if(state.filters) {
            let filters = state.filters;
            fitnessCenters = action.payload.filter(function(item) {
                for (var key in filters) {
                    if (item.facilities[key] === undefined || item.facilities[key] !== filters[key])
                        return false;
                }
                return true;
            });
        } else {
            fitnessCenters = action.payload;
        }

        return {
            ...state,
            fitnessCenters
        };
    }
    case 'SET_GEOLOCATION':
        return {
            ...state, 
            mapCenter:{
                latitude: action.payload[0],
                longitude: action.payload[1],
            }
        };
    case 'SET_ADDRESS':
        return {
            ...state,
            mapZoomLevel: 12,
            mapCenter:{
                latitude: action.payload.lat,
                longitude: action.payload.lng,
            }
        };
    case 'RESET_MAP':{
        let newState = Object.assign({}, state);
        delete newState["mapCenter"];
        newState.fitnessCenters = data;
        newState.showMarker = false;
        newState.showDrawer= false;
        newState.mapZoomLevel = 10;
        return newState;
    }
    case 'SHOW_ON_MAP':
        return {
            ...state,
            mapZoomLevel: 12,
            marker: action.payload,
            mapCenter:{
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
            },
            activeCentreID: action.payload.centre_id,
            showMarker: true
        };
    case 'SHOW_DRAWER':{
        return {
            ...state,
            showDrawer: true
        };
    }
    case 'HIDE_DRAWER':{
        return {
            ...state,
            showDrawer: false
        };            
    }
    default:
        return state;
    }
};

export const FitnessCenterProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <FitnessCenterContext.Provider value={{ state, dispatch }}>
            {children}
        </FitnessCenterContext.Provider>
    );
};

FitnessCenterProvider.propTypes = {
    children: PropTypes.node
};

export const FitnessCenterStore = () => {
    const { state, dispatch } = useContext(FitnessCenterContext);
    return { state, dispatch };
};