import React from 'react';
import { connect } from 'dva';
import { Form, Icon } from 'antd';

const Error = ({
  loading,
}) => {

  return(

    <div style={{paddingTop:'250px'}}>
      <div style={{width:'350px',height:'280px',margin:'0 auto'}}>
      <Form className="login-form" style={{width:'300px',height:'280px',margin:'0 auto',marginTop:'25px'}}>
        <h1><Icon type="frown"/>  404 页面找不到</h1>
      </Form>
      </div>
    </div>
  )
}


export default connect(({ loading }) => ({ loading }))(Error)
