import React, { useCallback } from 'react';
import { Layout, Collapse, Checkbox } from 'antd';

import { FitnessCenterStore} from '../store/FitnessCenterContext';

import SearchResult from './SearchResult';
import Location from './Location';

import MapAutoCompleteInput from './MapAutoCompleteInput';

const { Sider, Content } = Layout;
const { Panel } = Collapse;

const SideBar = () => {
  
    const { state, dispatch } = FitnessCenterStore();

    const filter = useCallback((checkedValues) => dispatch({ type: "FILTER_FITNESS_CENTERS", payload: checkedValues }), [
        dispatch
    ]);
  

    return (
        <Sider
            width={300}
            style={{ 
                overflow: 'auto',
                maxHeight: '70vh',
                background: '#fff' 
            }}>
            <Content style={{ padding: '0 24px' }}>

                <h3>Search</h3>

                <MapAutoCompleteInput />

                <Location />
      

                <Collapse defaultActiveKey={['1']} accordion style={{margin: '20px auto'}}>
                    <Panel header="Filters" key="1">
                        <p>Filters</p>
                        <Checkbox.Group
                            className="fitness-center-filters"
                            onChange={filter}
                        >
                            <Checkbox className="fitness-center-filters-checkbox" value="hasPool">Swimming Pool</Checkbox>
                            <Checkbox className="fitness-center-filters-checkbox" value="hasGym">Gym</Checkbox>
                            <Checkbox className="fitness-center-filters-checkbox" value="hasTennis">Tennis</Checkbox>
                        </Checkbox.Group>
                    </Panel>
                </Collapse>

                <h3>Results</h3>

                <SearchResult searchResults={state.fitnessCenters}/>

            </Content>
      
        </Sider>
    );
  
};

export default SideBar;
