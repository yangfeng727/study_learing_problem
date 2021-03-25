import * as React from 'react';
import http from '../../http/HttpService';
import {initWxPay} from '../../util/wxjs_pay';
import {Modal, Toast} from 'antd-mobile';
const alert = Modal.alert;

class WxjsPay extends React.Component {
  readonly state: any = {
    query: {},
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.getPayInfo();
  }

  private getPayInfo() {
    const query = (this.props as any).router.location.query;
    http.getWxPayInfo(query).then((res: any) => {
      if (!res.success) return Toast.fail(res.msg, 2);
      //支付成功下单
      initWxPay(JSON.parse(res.data.command), (err_msg: string) => {
        alert('支付提示', '是否完成支付', [
          {text: '否', onPress: () =>  this.getPayInfo()},
          {text: '是', onPress: () =>{
              location.href = res.data.backUrl || query.backUrl
            }},
        ]);
      });
    });
  }

  render() {
    return (
        <div></div>
    );
  }

}

export default WxjsPay;
