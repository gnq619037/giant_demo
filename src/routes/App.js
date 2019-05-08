import {Layout, Menu, Breadcrumb, Icon, Dropdown, Button, Avatar, Badge } from 'antd';
import React from 'react';
import { connect } from 'dva';
import User from './User';
import Relation from './Relation';
import styles from './index.less';
import {routerRedux} from "dva/router";
const { Content, Footer, Sider, Header } = Layout;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  render() {
    const { dispatch, app } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={userCenter}>个人中心</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={loginOut}>退出</a>
        </Menu.Item>
      </Menu>
    );
    function loginOut() {
      console.log(1);
      dispatch({ type: 'user/loginOut'})
    };
    function userCenter() {
      dispatch({ type: 'user/userCenter'})
    }
    const handleClick = (e) => {
      console.log('app');
      dispatch({ type:'user/toPath', payload: e.key })
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleClick}>
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>用户列表</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="pie-chart" />
              <span>我的好友</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div style={{marginLeft: 1670}}>
              <Dropdown overlay={menu} placement="bottomLeft" >
              <span>
                  <Badge count={1}><Avatar shape="square" icon="user" /></Badge>
                </span>
              </Dropdown>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <User />
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
export default connect(app => app)((App));
// import React, { Component } from 'react';
// import { connect } from 'dva';
// import { TopMenu } from '../components/Layout';
// import styles from './app.less';
//
// class App extends Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       isPermission: true,
//     };
//   }
//
//   componentDidMount() {
//     this.timerID = setInterval(
//       () => this.checkSession(),
//       30000,
//     );
//   }
//
//   componentWillReceiveProps(nextProps) {
//     const { app } = nextProps;
//     const { locationPathname, allMenuPaths, menuPaths } = app;
//     if (locationPathname === '/noRight' || (allMenuPaths.includes(locationPathname) && !menuPaths.includes(locationPathname))) {
//       this.setState({
//         isPermission: false,
//       });
//     } else {
//       this.setState({
//         isPermission: true,
//       });
//     }
//   }
//
//   shouldComponentUpdate(nextProps, nextState) {
//     const { isPermission } = nextState;
//     return isPermission;
//   }
//
//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }
//
//   checkSession = () => {
//     const { dispatch } = this.props;
//     dispatch({ type: 'app/checkSession' });
//   }
//
//   render() {
//     const { dispatch, app } = this.props;
//     const { showname, menus, winHeight, isTokenPass, passwordModalVisible, userMassage } = app;
//     let allMenus = [];
//     if (menus.children !== undefined && menus.children !== null) {
//       allMenus = menus.children;
//     }
//
//     // 修改密码模态框props
//     const passwordModalProps = {
//       item: userMassage,
//       visible: passwordModalVisible,
//       title: '密码修改',
//       onOk(data) {
//         dispatch({
//           type: 'app/editPassword',
//           payload: data,
//         });
//       },
//       onCancel() {
//         dispatch({
//           type: 'app/updateState',
//           payload: {
//             passwordModalVisible: false,
//           },
//         });
//       },
//     };
//
//     const headerProps = {
//       passwordModalVisible,
//       passwordModalProps,
//       allMenus,
//       width: winHeight,
//       user: {
//         showname,
//       },
//       logout() {
//         dispatch({ type: 'app/logout' });
//       },
//       editPassword() {
//         dispatch({
//           type: 'app/updateState',
//           payload: {
//             passwordModalVisible: true,
//             isLogoutShow: false,
//           },
//         });
//       },
//     };
//
//
//     return (<div className={styles.nav}>
//       <div className={styles.nav_body}>
//         {this.props.children}
//       </div>
//       }
//     </div>);
//   }
// }
//
// export default connect(app => app)(App);
