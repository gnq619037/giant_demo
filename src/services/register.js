import { notification } from 'antd';
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
    default:
      title = type;
  }
  notification[type]({
    message: title,
    description: tip,
  });
}
