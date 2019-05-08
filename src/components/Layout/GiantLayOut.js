// import { connect } from 'dva';
// import React, { Component } from 'react';
// import { Link, routerRedux } from 'dva/router';
// import {Avatar, Badge, Breadcrumb, Dropdown, Icon, Layout, Menu} from "antd";
// import User from "../../routes/User";
//
// const { Content, Footer, Sider, Header } = Layout;
//
// class GiantLayOut extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLogoutShow: false,
//       dropWin: <div />,
//       visible: false,
//       activeMenuKey: 0 };
//   }
//
//   componentDidMount() {
//     document.body.addEventListener('click', this.handleClick, false);
//   }
//
//   componentWillUnmount() {
//     document.body.removeEventListener('click', this.handleClick, false);
//   }
//   // const menu = () => (
//   //   <Menu>
//   //     <Menu.Item>
//   //       <a onClick={null}>个人中心</a>
//   //     </Menu.Item>
//   //     <Menu.Item>
//   //       <a onClick={null}>退出</a>
//   //     </Menu.Item>
//   //   </Menu>
//   // );
//
//   render() {
//     return (
//       <Layout style={{ minHeight: '100vh' }}>
//         <Sider
//           collapsible
//           collapsed={this.state.collapsed}
//           onCollapse={this.onCollapse}
//         >
//           <div className="logo" />
//           <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" onClick={null}>
//             <Menu.Item key="1">
//               <Icon type="pie-chart" />
//               <span>用户列表</span>
//             </Menu.Item>
//             <Menu.Item key="2">
//               <Icon type="pie-chart" />
//               <span>我的好友</span>
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         <Layout>
//           <Header style={{ background: '#fff', padding: 0 }}>
//             <div style={{marginLeft: 1670}}>
//               <Dropdown overlay={null} placement="bottomLeft" >
//               <span>
//                   <Badge count={1}><Avatar shape="square" icon="user" /></Badge>
//                 </span>
//               </Dropdown>
//             </div>
//           </Header>
//           <Content style={{ margin: '0 16px' }}>
//             <Breadcrumb style={{ margin: '16px 0' }}>
//             </Breadcrumb>
//             <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
//               <User />
//             </div>
//           </Content>
//           <Footer style={{ textAlign: 'center' }}>
//             用户系统 ©2018 Created by guonanqing
//           </Footer>
//         </Layout>
//       </Layout>
//     );
//   }
// }
//
// export default connect()(GiantLayOut);
