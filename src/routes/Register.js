import React from 'react';
import { connect } from 'dva';
import { InputNumber,Tooltip,Table, Popconfirm, Button, Modal, Form,Input,Select,Col,DatePicker,Cascader, Tabs } from 'antd';
import PropTypes from 'prop-types';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
// const formItemLayout = {
//   labelCol: { span: 4 },
//   wrapperCol: { span: 8 },
// };
const residences = [{
  value: '江西',
  label: '江西',
  children: [{
    value: '吉安',
    label: '吉安',
    children: [{
      value: '遂川',
      label: '遂川',
    }],
  }],
}, {
  value: '浙江',
  label: '浙江',
  children: [{
    value: '杭州',
    label: '杭州',
    children: [{
      value: '西湖',
      label: '西湖',
    }],
  }],
}];
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};
const Register = ({
  dispatch,
  register,
  form: {
  getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
  validateFieldsAndScroll,
  getFieldValue,
  setFieldsValue
},
}) => {
  const {cities} = register;
 //  const handleOk = (e) => {
 //    console.log(e);
 //    debugger
 //    dispatch({type: "register/toLogin"})
 // }
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let valuestr = '';
      if (getFieldsValue().value !== undefined) {
        for (let i = 0; i < getFieldsValue().value.length; i += 1) {
          if (i === getFieldsValue().value.length - 1) {
            valuestr += `${getFieldsValue().value[i]}`;
          } else {
            valuestr += `${getFieldsValue().value[i]},`;
          }
        }
      }
      dispatch({
        type: 'register/registerUser',
        payload: {
          id: getFieldsValue().id,
          username: getFieldsValue().username,
          password: getFieldsValue().password,
          nickName: getFieldsValue().nickName,
          email: getFieldsValue().email,
          address: `${getFieldsValue().address[0]}-${getFieldsValue().address[1]}-${getFieldsValue().address[2]}`,
          telPhone: getFieldsValue().telPhone,
        },
      });

      // resetFields();
    });
  };
  const vailedPhone = (rule, value, callback) => {
    let regexTelPhone = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
    let regPhone=/^0\d{2,3}-?\d{7,8}$/;
    if(regPhone.test(value) || regexTelPhone.test(value)){
      callback();
    } else {
      callback('请输入正确的号码！');
    }
  }
 const handleCancel = (e) => {
    dispatch({type: "register/toLogin"})
 }
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不一样');
    } else {
      callback();
    }
  }
  const sendMessage = () => {
    console.log();
  }
  return (
    <div>
      <Modal
        title="用户注册"
        visible
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" size="default" onClick={handleCancel}>取消</Button>,
          <Button key="submit" type="primary" size="default" onClick={handleOk}>
            确定
          </Button>,
        ]}
      >
        <Tabs onChange={null} type="card">
          <TabPane tab="快速注册" key="1">
            <div>
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
              <Button type="primary" style={{float: 'right', marginRight: 80}} onClick={sendMessage}>发送短信</Button>
            </div>
          </TabPane>
          <TabPane tab="普通注册" key="2">
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
                <Cascader options={cities} style={{width: 180}} placeholder="请选择地址" />
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
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};
Register.propTypes = {
  form: PropTypes.object,
}

export default connect(register => register)(Form.create()(Register));
