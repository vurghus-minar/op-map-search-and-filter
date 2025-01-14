import React, { Fragment } from 'react';
import { Card } from 'antd';

import { FitnessCenterStore} from '../store/FitnessCenterContext';

function setFacilitiesLabel(facilities){
    let facilitiesLabels = [];
    if (facilities.hasGym) {
        facilitiesLabels.push('Gym');
    }
    if (facilities.hasPool) {
        facilitiesLabels.push('Swimming Pool');
    }
    if (facilities.hasTennis) {
        facilitiesLabels.push('Tennis');
    }

    return facilitiesLabels.join(' | ');
}


const SearchResult = (props) => {
    const { state, dispatch } = FitnessCenterStore();
    const showOnMap = (fitnessCenter) => {
        dispatch({ type: "SHOW_ON_MAP", payload: fitnessCenter });
    };
    return (
        <Fragment>
            <h3>Fitness Centres found: {props.searchResults.length}</h3>
            <div style={{
                overflow: 'auto',
                height: '70vh',
                width: '275px'
            }}>
                {
                    props.searchResults.map(
                        (fitnessCenter) => {
                            return (
                                <Card
                                    onClick={()=>{
                                        showOnMap(fitnessCenter);}
                                    }
                                    hoverable="true"
                                    className={(state.activeCentreID === fitnessCenter.centre_id) ? 'fitness-center active':'fitness-center'}
                                    key={fitnessCenter.centre_id}
                                    style={{ width: '100%', marginBottom: '10px' }}
                                >
                                    <p className="fitness-center-name">{fitnessCenter.name}</p>
                                    <p className="fitness-center-address">{fitnessCenter.address}</p>
                                    <p className="fitness-center-facilities">{setFacilitiesLabel(fitnessCenter.facilities)}</p>
                                </Card>
                            );
                        }
                    )          
                }
            </div>  
        </Fragment>
        
    );
};

export default SearchResult;