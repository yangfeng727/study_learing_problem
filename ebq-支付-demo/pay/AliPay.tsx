import * as React from 'react';
import http from '../../http/HttpService';
import {Modal, Toast} from 'antd-mobile';

const alert = Modal.alert;

class AliPay extends React.Component {
  readonly state: any = {
    query: {},
    aliForm: null,
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.getPayInfo();
  }

  private getPayInfo() {
    const query = (this.props as any).router.location.query;
    http.getAliPayInfo(query).then((res: any) => {
      if (!res.success) return Toast.fail(res.msg, 2);
      // this.setState({aliForm: res.data});//h5支付
      // 如果jsbridge已经注入则直接调用
      if ((window as any).AlipayJSBridge) {
        this.aliTradePay(res.data);
      } else {
        // 如果没有注入则监听注入的事件
        document.addEventListener('AlipayJSBridgeReady', () => this.aliTradePay(res.data), false);
      }
    });
  }

  private aliTradePay(data: any) {
    (window as any).AlipayJSBridge.call('tradePay', JSON.parse(data.pay_info), (result: any) => {
      alert('支付提示', '是否完成支付', [
        {text: '否', onPress: () => this.aliTradePay(data)},
        {text: '是', onPress: () => location.href = data.backUrl},
      ]);
    });
  }

  render() {
    return (
        <div dangerouslySetInnerHTML={{__html: this.state.aliForm}}></div>
    );
  }

}

export default AliPay;
