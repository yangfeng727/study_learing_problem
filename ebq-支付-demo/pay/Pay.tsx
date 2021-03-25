import * as React from 'react';
import './Pay.css';
import http from '../../http/HttpService';
import {Icon, NavBar, Toast, Checkbox, Button, Modal, ActivityIndicator} from 'antd-mobile';
import {copyText, isWeChat, isAliPay} from '../../util/util';
import {ReactNode} from 'react';

const CheckboxItem = Checkbox.CheckboxItem;

class Order extends React.Component {
  readonly state: any = {
    query: {},
    payType: '',
    wx_popup: false,
    w_height: '202px',
    loading: false,
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      query: (this.props as any).router.location.query,
      payType: isWeChat() ? 'wxpay' : 'alipay',
    });
  }

  private lastStep() {
    location.href = this.state.query.orderUrl;
  }

  private checkPay(e: any, payType: string) {
    if (e.target.checked) {
      this.setState({
        payType: payType,
      });
    }
  }

  private submitPay() {
    switch (this.state.payType) {
      case 'alipay':
        this.aliPay();
        break;
      case 'wxpay':
        this.wxPay();
        break;
      default:

    }
  }

  private aliPay() {
    if (!isAliPay()) return this.setState({wx_popup: true});
    this.setState({loading: true});
    http.aliOauth({...this.state.query}).then((res: any) => {
      if (!res.success) return Toast.fail(res.msg, 2);
      location.href = res.data;
    }).finally(() => this.setState({loading: false}));
  }

  private wxPay() {
    if (!isWeChat()) return this.setState({wx_popup: true});
    this.setState({loading: true});
    http.wechatOauth({...this.state.query}).then((res: any) => {
      if (!res.success) return Toast.fail(res.msg, 2);
      location.href = res.data;
    }).finally(() => this.setState({loading: false}));
  }

  private copyText() {
    copyText(this.state.query.orderUrl).then(() => {
      Toast.success('复制成功', 2);
    }).catch(err => {
      Toast.fail('你的浏览器不支持复制到剪切板，请手动复制！', 2);
    });
  }

  private getAliPayDom(): ReactNode {
    return !isWeChat() ? <li className="pay_li alipay"
                             onClick={() => this.checkPay({target: {checked: true}}, 'alipay')}>
      <img src="assets/alipay.png" className=""/>
      <span>支付宝支付</span>
      <CheckboxItem className="pay_check" checked={this.state.payType === 'alipay'}
                    onChange={(e: any) => this.checkPay(e, 'alipay')}>
      </CheckboxItem>
    </li> : null;
  }

  private getWeChatPayDom(): ReactNode {
    return !isAliPay() ? <li className="pay_li wxpay"
                             onClick={() => this.checkPay({target: {checked: true}}, 'wxpay')}>
      <img src="assets/wxpay.png" className=""/>
      <span>微信支付</span>
      <CheckboxItem className="pay_check" checked={this.state.payType === 'wxpay'}
                    onChange={(e: any) => this.checkPay(e, 'wxpay')}>
      </CheckboxItem>
    </li> : null;
  }

  render() {
    return (
        <div className="pay">
          <NavBar
              icon={<Icon className="nav_back" size="lg" type="left"/>}
              onLeftClick={this.lastStep.bind(this)}
              mode="dark"
          >支付选择</NavBar>
          <p className="pay_title">支付金额</p>
          <p className="pay_money">￥{this.state.query.payMoney}</p>
          <p className="pay_tip">请选择支付方式</p>
          <ul className="pay_ul">
            {this.getAliPayDom()}
            {this.getWeChatPayDom()}
          </ul>
          <div onClick={this.submitPay.bind(this)} className='submitPayBtn'>确定</div>
          <Modal
              popup
              visible={this.state.wx_popup}
              onClose={() => {this.setState({wx_popup: false});}}
              maskClosable={true}
              animationType="slide-up">
            <div className="wx_pay_popup" style={{height: this.state.w_height}}>
              <h3>请复制链接在{this.state.payType === 'wxpay' ? '微信' : '支付宝'}中打开</h3>
              <p className="pay_url_a">{this.state.query.orderUrl}</p>
              <Button type="primary" className="pay_copy-btn" onClick={this.copyText.bind(this)}>复制链接</Button>
            </div>
          </Modal>
          <ActivityIndicator  //loading
              toast
              text="Loading..."
              animating={this.state.loading}
          />
        </div>
    );
  }

}

export default Order;
