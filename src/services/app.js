import { notification, Icon } from 'antd';
import {request, post} from '../utils/request';

export function showTip({ type, tip }) {
  let title = '';
  switch (type) {
    case 'error':
      title = '错误';
      break;
    case 'success':
      title = '成功';
      break;
    case 'info':
      title = '提示';
      break;
    case 'system':
      title = '系统消息';
      break;
    default:
      title = type;
  }
  notification[type]({
    message: title,
    description: tip,
  });
}

export function showMsg({ type, tip, closeSecond }) {
  let title = '';
  let icon = '';
  switch (type) {
    case 1:
      title = '系统消息';
      icon = <Icon type="home" style={{ color: '#108ee9' }} />;
      break;
    case 2:
      title = '用户消息';
      icon = <Icon type="user" style={{ color: '#108ee9' }} />;
      break;
    default:
      title = '';
  }
  notification.open({
    message: title,
    description: tip,
    duration: closeSecond,
    icon: icon,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}
