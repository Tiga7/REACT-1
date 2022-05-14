import React, { Component } from 'react';
import BaseCord from './baseCord';
import '../css/room.css'
import { Layout, Breadcrumb } from 'antd';



const { Content, Footer } = Layout;


class Room extends Component {
    state = { 
        checkCode:'1',
    }
    
    render() { 
        return (    
            <React.Fragment>
                <BaseCord>
                <Layout className="layout">
                    <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    </Breadcrumb>
                    
                    
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    </Footer>
                </Layout>
                </BaseCord>
            </React.Fragment>
        );
    }
}
 
export default Room;
