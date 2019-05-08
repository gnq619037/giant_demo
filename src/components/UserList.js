import React from 'react';
import PropTypes from 'prop-types';
import AQAjaxTable from './DataTable/AQAjaxTable';
import styles from '../routes/index.less';
import {
  InputNumber,
  Tooltip,
  Table,
  Popconfirm,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Col,
  DatePicker,
  Cascader,
  Icon,
  Divider
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const UserList = ({ onDelete, moduleUser, users, cities, visible, dispatch, sortedInfo,filteredInfo,disabled,reload,
  form: {
  getFieldDecorator,
  validateFieldsAndScroll,
  getFieldValue,
  setFieldsValue
}, }) => {

  const handleChange = (pagination, filters, sorter) => {
    dispatch({type: "user/updateTable", payload: {
      filteredInfo: filters,
      sortedInfo: sorter,
    }})
  }
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不一样');
    } else {
      callback();
    }
  }
const vailedAge = (rule, value, callback) => {
  if(value < 1 || value > 120){
    callback("年龄在1~120之间");
  } else {
    callback();
  }
}
const vailedPassword = (rule, value, callback) => {
  let reg = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[#@*&.]).*$/;
  if(value.length<=8 || value.length>=15){
    callback('字符个数在8~15之间');
  } else {
    if(reg.test(value)){
      callback();
    } else {
      callback('密码必须包含大小写字母,数字以及特殊字符！');
    }
  }
}
const doubleShow = (e) => {
  dispatch({type: "user/showModal", payload: {
    visible: true,
    disabled:true,
    userId:e.userId,
    userName:e.name,
    password:e.userPassword,
    telPhone:e.telPhone,
    birth:e.birth,
    age:e.age,
    sex:e.sex,
  }})
}
const vailedPhone = (rule, value, callback) => {
  let regexTelPhone = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
  let regPhone=/^0\d{2,3}-?\d{7,8}$/;
  if(regPhone.test(value) || regexTelPhone.test(value)){
    callback();
  } else {
     callback('请输入正确的号码！');
  }
}


  const showModal = (e) => {
    const userId = e.target.getAttribute("userid");
    const userName = e.target.getAttribute("username");
    dispatch({type: "user/showModal", payload: {
      visible: true,
      disabled:false,
      userId:userId,
      userName:userName,
      password:e.target.getAttribute("password"),
      telPhone:e.target.getAttribute("telphone"),
      birth:e.target.getAttribute("birth"),
      age:e.target.getAttribute("age"),
      sex:e.target.getAttribute("sex")
    }})
  }
  const handleOk = (e) => {
    validateFieldsAndScroll((errors, values) => {
      debugger
      if (errors) {
        return
      }
      dispatch({ type: "user/updateUser", payload: values })
      dispatch({type: "user/hideModal", payload: {visible: false}})
    })
 }
 const handleCancel = (e) => {
    dispatch({type: "user/hideModal", payload: {visible: false}})
 }
 const addFriend = (record) => {
    debugger
    const payload = {
      'startUserGraph': {
        'userName': window.localStorage.getItem('userName'),
      },
      'endUserGraph': {
        'userName': record.username,
      }
    }
   dispatch({ type: "user/addFriend", payload })
 }
 sortedInfo = sortedInfo || {};
   filteredInfo = filteredInfo || {};
  const columns = [{
    key:'username',
    title: '用户名',
    dataIndex: 'username',
    width: 70,
  },
  {
    key:'nickName',
    title: '昵称',
    dataIndex: 'nickName',
    width: 80,
  },{
      key:'telPhone',
      title: '手机号',
      dataIndex: 'telPhone',
      width: 50,
    },{
    key:'email',
    title: '邮箱',
    dataIndex: 'email',
    width: 90,
  },{
      key:'address',
      title: '地址',
      dataIndex: 'address',
      width: 120,
    }, {
    key: 'operation',
    title: '操作',
    width: 150,
    render: (text, record) => {
      return (
        <span>
          <a onClick={showModal} userid={record.id} username={record.username}>修改</a>
          <Divider type="vertical" />
          <a onClick={e => addFriend(record, e)}>添加好友</a>
          <Divider type="vertical" />
          <Popconfirm  placement="top" title="是否删除?" onConfirm={() => onDelete(record.id)} okText="确定" cancelText="取消">
            <a >删除</a>
          </Popconfirm>
        </span>
      );
    },
  }];
  const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};
const onChange=(date, dateString)=> {
  console.log(date, dateString);
}

  return (
    <div>
      <AQAjaxTable
        columns={columns}
        // onRowDoubleClick={onRowDoubleClick}
        rowSelection={rowSelection}
        isCompare isfuzzy pagination
        ajaxUrl={'/user/get/all'}
        fuzzytip="搜索..."
        getdataway="result"
        gettotalway="total"
        rowKey={record => (record.id)}
        reload={reload}
        // advancedQuery={{'pageSize': 10, 'pageNum': 0}}
        scroll={{ x: true, y: document.body.clientHeight - 345 }}
        size="small"
        bordered
        rowClassName={(record, index) => (index % 2 === 0 ? styles.oddRow : styles.evenRow)}
      />
      <Modal key={moduleUser.userId} title="详细信息" visible={visible} onOk={handleOk} onCancel={handleCancel} moduleUser={moduleUser}>
        <FormItem style={{display:'none'}} {...formItemLayout}>
          {getFieldDecorator('id', {
          })( <Input style={{display:'none'}}/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="用户名">
          {getFieldDecorator('username', {
            rules: [
              {
                max: 8,
                message:'姓名长度不能超过8个字符'
              },{
                required: true, message: '请输入用户名！',
              }
            ],
          })( <Input placeholder="请输入用户名" />)}
        </FormItem>
        <FormItem label="昵称" {...formItemLayout}>
          {getFieldDecorator('nickName', {
            rules: [{
              required: true, message: '请输入昵称！',
            }
            ],
          })(
            <Input placeholder="请输入昵称"  />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator('password', {
            rules: [{
              validator:true,
            }, {
              required: true, message: '请输入密码！',
            }],
          })(
            <Input placeholder="请输入密码"  type="password" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="确认密码">
          {getFieldDecorator('confirm', {
            rules: [{
              validator: compareToFirstPassword,
            }, {
              required: true, message: '请再次输入密码！',
            }],
          })(
            <Input placeholder="请再次输入密码"  type="password" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号码">
          {getFieldDecorator('telPhone',{
            rules:[
              {
                validator:vailedPhone,
              },{
                required: true, message: '请输入手机号！',
              }
            ]
          })(<Input placeholder="请输入手机号码" />)}

        </FormItem>
        <FormItem
          {...formItemLayout}
          label="地址"
        >
          {getFieldDecorator('address', {
            // initialValue: ['江西', '吉安', '遂川'],
            rules: [{ type: 'array', message: '请选择地址!' }],
          })(
            <Cascader options={cities} placeholder="请选择地址" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="邮箱">
          {getFieldDecorator('email',{
            rules: [{
              type: 'email', message: '邮箱格式不正确！',
            }, {
              // required: true, message: '请输入邮箱！',
            }],
          })(
            <Input placeholder="请输入邮箱" />
          )}

        </FormItem>
      </Modal>
    </div>
  );
};

UserList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default connect(user => user)(Form.create()(UserList));
