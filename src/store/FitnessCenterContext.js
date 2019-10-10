import React, {createContext, useReducer, useContext} from 'react';
import PropTypes from "prop-types";

import data from '../data/fitness-centers.json';

const initialState = {
    fitnessCenters: data,
    showMarker: false,
    mapDefaultPosition:{
        latitude: 51.5287352,
        longitude: -0.3817821
    },
    marker:{
        latitude: 51.5287352,
        longitude: -0.3817821
    }
};

export const FitnessCenterContext = createContext(initialState);

const reducer = (state, action) => {

    switch (action.type) {
    case 'FILTER_FITNESS_CENTERS':{
        let filters = {};
        action.payload.forEach(function(item){
            filters[item] = true;
        });

        const fitnessCenters = data.filter(function(item) {
            for (var key in filters) {
                if (item.facilities[key] === undefined || item.facilities[key] !== filters[key])
                    return false;
            }
            return true;
        });

        return {
            ...state,
            fitnessCenters,
            filters
        };        
    }
    case 'GET_GEOLOCATION':
        return {
            ...state, 
            mapCenter:{
                latitude: action.payload[0],
                longitude: action.payload[1],
            }
        };
    case 'RESET_MAP':{
        let newState = Object.assign({}, state);
        delete newState["mapCenter"];
        return newState;        
    }
    case 'SHOW_ON_MAP':
        return {
            ...state, 
            marker: action.payload,
            mapCenter:{
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
            },
            showMarker: true
        };
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