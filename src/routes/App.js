import {Layout, Menu, Breadcrumb, Icon } from 'antd';
import React from 'react';
import { connect } from 'dva';
import User from './User';

const { Content, Footer, Sider } = Layout;
// const App = ({
//   app,
//   dispatch,}) => {
//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider
//         >
//         <div className="logo" />
//         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
//           <Menu.Item key="1">
//             <Icon type="pie-chart" />
//             <span>用户列表</span>
//           </Menu.Item>
//         </Menu>
//       </Sider>
//       <Layout>
//         <Content style={{ margin: '0 16px' }}>
//           <Breadcrumb style={{ margin: '16px 0' }}>
//           </Breadcrumb>
//           <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
//             <User/>
//           </div>
//         </Content>
//         <Footer style={{ textAlign: 'center' }}>
//           用户系统 ©2018 Created by guonanqing
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// }

class App extends React.Component {
  state = {
    collapsed: false,
    user: {},
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>用户列表</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <User/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            用户系统 ©2018 Created by guonanqing
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
// export default connect((app => app) => ({app, loading}))(App);
export default connect(app => app)((App));
