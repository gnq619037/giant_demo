import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber,Tooltip,Table, Popconfirm, Button, Modal, Form,Input,Select,Col,DatePicker } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const UserList = ({ onDelete, moduleUser, users, visible, dispatch, sortedInfo,filteredInfo,disabled,
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
 sortedInfo = sortedInfo || {};
   filteredInfo = filteredInfo || {};
  const columns = [{
    key:'username',
    title: '姓名',
    dataIndex: 'username',
    width: 100,
  },
  {
    key:'nickName',
    title: '昵称',
    dataIndex: 'nickName',
    width: 50,
  },{
    key:'address',
    title: '地址',
    dataIndex: 'address',
    width: 100,
  },{
    key:'email',
    title: '邮箱',
    dataIndex: 'email',
    width: 100,
  }, {
    key: 'operation',
    title: '操作',
    width: 150,
    render: (text, record) => {
      return (
        <div>
          <Tooltip placement="topLeft" title="修改操作">
          <Button onClick={showModal} userid={record.id} username={record.username}>修改</Button>
          </Tooltip>
          <Tooltip placement="topLeft" title="删除操作">
          <Popconfirm  placement="top" title="是否删除?" onConfirm={() => onDelete(record.id)}>
            <Button>删除</Button>
          </Popconfirm>
          </Tooltip>
        </div>
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
      <Table
        rowSelection={rowSelection}
        dataSource={users}
        columns={columns}
        rowKey={record => record.userId}
        scroll={{ x: 1500, y: 550 }}
        onChange={handleChange}
        onRowDoubleClick={doubleShow}
      />
      <Modal key={moduleUser.userId} title="详细信息" visible={visible} onOk={handleOk} onCancel={handleCancel} moduleUser={moduleUser}>
        <FormItem style={{display:'none'}} {...formItemLayout}>
          {getFieldDecorator('userId', {
            initialValue:moduleUser.userId,
          })( <Input style={{display:'none'}}/>)}
       </FormItem>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            initialValue:moduleUser.name,
            rules: [
              {
                max: 8,
                message:'姓名长度不能超过8个字符'
              },
            ],
          })( <Input placeholder="请输入姓名" style={{width:'150px'}} disabled={disabled}/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="密码">
       {getFieldDecorator('password', {
          initialValue:moduleUser.password,
         rules: [{
           validator:vailedPassword,
         }, {
         }],
       })(
         <Input type="password" style={{width:'150px'}} disabled={disabled}/>
       )}
     </FormItem>
     <FormItem {...formItemLayout} label="确认密码">
       {getFieldDecorator('confirm', {
         rules: [{
            validator: compareToFirstPassword,
         }, {
         }],
       })(
         <Input type="password" style={{width:'150px'}} disabled={disabled}
         />
       )}
     </FormItem>
      <FormItem {...formItemLayout} label="性别">
        {getFieldDecorator('sex', {
          initialValue:moduleUser.sex,
          setFieldsValue:moduleUser.sex,
          rules: [{
          }, {
          }],
        })(
          <Select allowClear={true} showSearch style={{width:'150px'}} disabled={disabled} >
            <Option value="boy">boy</Option>
            <Option value="girl">girl</Option>
          </Select>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="年纪">
        {getFieldDecorator('age',{
          initialValue:moduleUser.age,
          rules:[
            {
              type:'number',
              validator:vailedAge,
            }
          ]
        })(
          <InputNumber min={1} max={120}  disabled={disabled}/>
      )}

      </FormItem>
      <FormItem label="出生日期" {...formItemLayout}>
       <Col span={19}>
         <FormItem style={{width:"150px"}}>
           {getFieldDecorator('birth', {
             initialValue:moment(moduleUser.birth, dateFormat)
             // setFieldsValue:
           })(
              <DatePicker onChange={onChange} disabled={disabled} format={dateFormat} />
           )}

         </FormItem>
       </Col>
     </FormItem>
      <FormItem {...formItemLayout} label="手机号码">
        {getFieldDecorator('telPhone',{
          initialValue:moduleUser.telPhone,
          rules:[
            {
              validator:vailedPhone,
            }
          ]
        })(<Input placeholder="请输入手机号码" style={{width:'150px'}} disabled={disabled}/>)}

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
