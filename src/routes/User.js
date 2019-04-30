import React from 'react';
import { connect } from 'dva';
import UserList from '../components/UserList';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
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
  let {users} = user.users;
  if(users === undefined){
    users = [];
  }
  function handleDelete(id) {
    dispatch({
      type: 'user/delete',
      payload: id,
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
    dispatch({ type: 'user/queryUser', payload: "" })
  }
  function loginOut(){
      dispatch({ type: 'user/loginOut'})
  }
  return (
    <div>
       <Form>
         <FormItem>
           {getFieldDecorator('query',{

           })(<Input placeholder="请输入" style={{width:'150px',marginBottom:'15px'}}/>)}

         </FormItem>
         <FormItem>
           <Button icon="search" onClick={searchUser}>查询</Button>
           <Button icon="sync" onClick={lodingUser}>刷新</Button>
           <Button icon="logout" onClick={loginOut}>登出</Button>
         </FormItem>
        </Form>
      <UserList onDelete={handleDelete} filteredInfo={user.filteredInfo} users={users} moduleUser={user.moduleUser} sortedInfo={user.sortedInfo} visible={user.visible} disabled={user.disabled}/>
    </div>
  );
};
User.propTypes = {
  form: PropTypes.object,
}

export default connect(user => user)(Form.create()(User));
