import React from 'react';
import { connect } from 'dva';
import UserList from '../components/UserList';
import { Form, Input, Button, Layout } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import appStyles from './app.less';

const FormItem = Form.Item;
const {
  Header, Footer, Sider, Content,
} = Layout;
const User = ({
  dispatch,
  user,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldValue,
    resetFields,
  },
}) => {
  let {users, cities} = user;
  if(users === undefined){
    users = [];
  }
  function handleDelete(id) {
    dispatch({
      type: 'user/delete',
      payload: {"id": id},
    });
  }
  function searchUser () {
    let query = getFieldValue("query");
    if(query === undefined){
      query = {'pageNum':1,'pageSize':10};
    }
    dispatch({ type: 'user/queryUser', payload: query })
  }
  function lodingUser (e) {
    resetFields();
    dispatch({ type: 'user/queryUser', payload: {'pageNum':1,'pageSize':10} })
  }
  function loginOut(){
      dispatch({ type: 'user/loginOut'})
  }
  const freshData = () => {
    dispatch({
      type: 'user/updateState',
      payload: {
        reload: true,
      },
    });
  };
  return (
    <Content className={styles.contentContent} style={{ marginTop: -15 }} >
      <div className={styles.mtitle}>
        <span>用户信息</span>
        <div className={appStyles.nav_freshBtn}>
          <Button style={{ position: 'absolute', marginLeft: 270, marginTop: 41 }} onClick={freshData} />
        </div>
      </div>
      <div className={styles.contentdiv}>
        <UserList
          onDelete={handleDelete}
          filteredInfo={user.filteredInfo}
          users={users}
          cities={cities}
          moduleUser={user.moduleUser}
          sortedInfo={user.sortedInfo}
          visible={user.visible}
          disabled={user.disabled}
          reload={user.reload}
        />
      </div>
    </Content>
  );
};
User.propTypes = {
  form: PropTypes.object,
}

export default connect(user => user)(Form.create()(User));
