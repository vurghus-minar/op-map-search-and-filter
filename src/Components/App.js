import React from 'react';
import {FitnessCenterProvider} from '../store/FitnessCenterContext';

import { Layout } from 'antd';
import 'antd/dist/antd.css';

import SideMenu from './SideMenu';
import Map from './Map';

const { Header, Content, Footer } = Layout;

const App = () => {
    return (
        <FitnessCenterProvider>
            <Layout className="layout">
                <Header>
                    <h1 className="logo">Fitness Center Search</h1>
                </Header>

                <Content style={{ marginTop: '16px', padding: '0 50px' }}>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <SideMenu/>
                        <Content style={{ padding: '0 24px', minHeight: '300px', }}>
                            <Map 
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </Content>
                    </Layout>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
            Fitness Center Search by Harvey Mungur
                </Footer>
            </Layout>        
        </FitnessCenterProvider>
    );
};

export default App;
