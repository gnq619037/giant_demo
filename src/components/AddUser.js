// import { Modal, Button, Input,Form, Checkbox,DatePicker,Select,C  } from 'antd';
// import React from 'react';
// const FormItem = Form.Item;
// const formItemLayout = {
//   labelCol: { span: 4 },
//   wrapperCol: { span: 8 },
// };
// const formTailLayout = {
//   labelCol: { span: 4 },
//   wrapperCol: { span: 8, offset: 4 },
// };
// const AddUser = ({state}) => {
//   state = { visible: false }
//   const showModal = () => {
//     this.setState({
//       visible: true,
//     });
//   }
//   const hideModal = () => {
//     this.setState({
//       visible: false,
//     });
//   }
//   return (
//     <div>
//       <Button type="primary" onClick={this.showModal}>新增</Button>
//       <Modal title="详细信息" visible={visible} onOk={handleOk} onCancel={handleCancel}>
//         <FormItem {...formItemLayout} label="姓名">
//         <Input placeholder="请输入姓名" />
//
//       </FormItem>
//       {/* <FormItem {...formItemLayout} label="密码">
//         {getFieldDecorator('password',{
//           rules:[
//             {
//               min:8,
//               max:15,
//               message:'密码长度请保持在8~15个字符'
//             }
//           ]
//         })(<Input placeholder="Please input your nickname" />)}
//       </FormItem> */}
//       <FormItem {...formItemLayout} label="密码">
//        <Input type="password" />
//      </FormItem>
//      <FormItem {...formItemLayout} label="确认密码">
//        <Input type="password"
//          // onBlur={handleConfirmBlur}
//        />
//      </FormItem>
//       <FormItem {...formItemLayout} label="性别">
//         <Select  style={{width:'120px'}} onChange={this.handleCurrencyChange}>
//           <Option value="1">男</Option>
//           <Option value="2">女</Option>
//         </Select>
//       </FormItem>
//       <FormItem {...formItemLayout} label="年纪">
//         <Input placeholder="" />
//
//       </FormItem>
//       <FormItem label="出生日期" {...formItemLayout}>
//        <Col span={19}>
//          <FormItem style={{width:"120px"}}>
//            <DatePicker />
//          </FormItem>
//        </Col>
//      </FormItem>
//       <FormItem {...formItemLayout} label="手机号码">
//         <Input placeholder="Please input your nickname" />
//       </FormItem>
//       </Modal>
//     </div>
//   );
// }
// // class AddUser extends React.Component {
// //   state = { visible: false }
// //   showModal = () => {
// //     this.setState({
// //       visible: true,
// //     });
// //   }
// //   hideModal = () => {
// //     this.setState({
// //       visible: false,
// //     });
// //   }
// //   render() {
// //     return (
// //       <div>
// //         <Button type="primary" onClick={this.showModal}>新增</Button>
// //         <Modal
// //           title="Modal"
// //           visible={this.state.visible}
// //           onOk={this.hideModal}
// //           onCancel={this.hideModal}
// //           okText="确认"
// //           cancelText="取消"
// //         >
// //           <FormItem {...formItemLayout} label="姓名">
// //           <Input placeholder="请输入姓名" />
// //         </FormItem>
// //         <FormItem {...formItemLayout} label="Nickname">
// //           <Input placeholder="Please input your nickname" />
// //         </FormItem>
// //         </Modal>
// //       </div>
// //     );
// //   }
// // }
//
// function confirm() {
//   Modal.confirm({
//     title: 'Confirm',
//     content: 'Bla bla ...',
//     okText: '确认',
//     cancelText: '取消',
//   });
// }
//
// export default AddUser;
