import React from 'react';
import { connect } from 'dva';
import Graph from 'react-graph-vis';
import {Form, Input, Button, Layout, Menu, Icon, Dropdown, Badge, Avatar, Breadcrumb} from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import appStyles from './app.less';
import User from "./User";

const FormItem = Form.Item;
const {
  Header, Footer, Sider, Content,
} = Layout;
const options = {
  height: '100%',
  width: '100%',
  clickToUse: true, // 点击某个节点，其他节点阴影显示，默认false
  nodes: {
    borderWidth: 2, // 节点边框粗细
    color: {
      // border: '#FF4040', // 设置节点边框色
      // background: '#eeeeee', // 设置节点背景色
      highlight: {
        border: '#00FF00', // 设置节点边框点击后的高光色
        background: '#ffffff', // 设置节点背景点击后的高光色
      },
    },
    shadow: true,
  },
  edges: {
    width: 2,
    length: 300,
    shadow: true,
  },
  autoResize: true, // 自适应大小
  layout: {
    hierarchical: {
      direction: 'DU', // 按箭头指向排列 DU向下排
      levelSeparation: 150, // 两个层级之间的距离
    },
  },
};
const Relation = ({dispatch, relation, form: {
  getFieldDecorator,
  validateFieldsAndScroll,
  getFieldValue,
  resetFields,
},}) => {
  let {userNodeData} = relation;
  if(userNodeData === undefined){
    userNodeData = [
      {
        'id': 1,
        'label': 'guonanqing'
      },{
        'id': 2,
        'label': 'caihuiping'
      }
    ];
  }
  const nodeData = [
    {
     'id': 1,
     'label': 'guonanqing'
    },{
      'id': 2,
      'label': 'caihuiping'
    }
  ];
  const relationData = [
    {
      'from': 1,
      'to':3
    }
  ];
  const events = {
    select(event) {
    },
  };
  const graphData = { nodes: userNodeData, edges: relationData };
  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={null}>个人中心</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={null}>退出</a>
      </Menu.Item>
    </Menu>
  );
  const handleClick = (e) => {
    console.log('app');
    dispatch({ type:'user/toPath', payload: e.key })
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        // collapsed={this.state.collapsed}
        // onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" onClick={handleClick}>
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
            <div className={styles.graph}>
              <Graph graph={graphData} options={options} events={events} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          用户系统 ©2018 Created by guonanqing
        </Footer>
      </Layout>
    </Layout>
  );
};
Relation.propTypes = {
  form: PropTypes.object,
}

export default connect(relation => relation)(Form.create()(Relation));
