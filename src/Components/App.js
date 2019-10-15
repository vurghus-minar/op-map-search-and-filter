import React from 'react';
import {FitnessCenterStore} from '../store/FitnessCenterContext';

import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';

import SideBar from './SideBar';
import Map from './Map';
const { Header, Content } = Layout;

const App = () => {
    const { dispatch } = FitnessCenterStore();

    const showDrawer = () => {
        dispatch({ type: "SHOW_DRAWER" });
    };

    const resetMap = () => {
        dispatch({ type: "RESET_MAP" });
    };

    return (
        
        <Layout className="layout">
            <Header>
                <div className="logo"><h1>Fitness Center Search</h1></div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1" onClick={showDrawer}>
                        <Icon type="search" />
                        <span className="nav-text">Search and Filter</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={resetMap}>
                        <Icon type="reload" />
                        <span className="nav-text">Reset Map</span>
                    </Menu.Item>
                </Menu>
            </Header>

            <Content style={{ marginTop: '16px', padding: '0 50px' }}>
                <Layout style={{ padding: '24px 0', background: '#fff', boxShadow: '3px 2px 5px rgba(0,0,0,0.3)' }}>
                    <SideBar/>
                    <Content style={{ padding: '0 24px', minHeight: '300px', }}>
                        <Map />
                            
                    </Content>
                </Layout>
            </Content>
        </Layout>        

    );
};

export default App;
