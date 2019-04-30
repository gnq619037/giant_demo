import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      debugger
      if (errors) {
        return
      }

      dispatch({ type: 'login/login', payload: values })
    })
  }
  return(
    <div style={{paddingTop:'250px'}}>
      <div style={{width:'350px',height:'280px',margin:'0 auto',border:'2px solid #A0A0A0',borderRadius:'5px'}}>
      <Form className="login-form" style={{width:'300px',height:'280px',margin:'0 auto',marginTop:'25px'}}>
        <h1>欢迎登录</h1>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message:'用户名不能为空'
              },
            ],
          })(  <Input placeholder="请输入用户名" onPressEnter={handleOk} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message:'密码不能为空'
              },
            ],
          })(<Input type="password" placeholder="请输入密码" onPressEnter={handleOk} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
        </FormItem>
        <FormItem>
          {/* <a className="login-form-forgot" href="">忘记密码</a> */}
          <Button onClick={handleOk} type="primary" loading={loading.effects.login} className="login-form-button" style={{float:'right'}}>
            登录
          </Button>
        </FormItem>
      </Form>
      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ loading }) => ({ loading }))(Form.create()(Login))
