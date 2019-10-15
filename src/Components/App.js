import React from 'react';
import {FitnessCenterProvider} from '../store/FitnessCenterContext';

import { Layout } from 'antd';
import 'antd/dist/antd.css';

import SideBar from './SideBar';
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
                        <SideBar/>
                        <Content style={{ padding: '0 24px', minHeight: '300px', }}>
                            <Map />
                            
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
