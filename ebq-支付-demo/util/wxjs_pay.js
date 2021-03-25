const onBridgeReady = (payData, callback) => {
  window.WeixinJSBridge && window.WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        'appId': payData.appId,     //公众号名称，由商户传入
        'timeStamp': payData.timeStamp,         //时间戳，自1970年以来的秒数
        'nonceStr': payData.nonceStr, //随机串
        'package': payData.package,
        'signType': payData.signType,         //微信签名方式：
        'paySign': payData.paySign, //微信签名
      }, (res) => {
        if (res.errMsg === 'get_brand_wcpay_request:ok' || res.err_msg === "get_brand_wcpay_request:ok") {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          callback();
        } else {
          callback(res.errMsg || res.err_msg);
        }
      });
};

export const initWxPay = (payData, callback) => {
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady',
          () => onBridgeReady(payData, callback), false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady',
          () => onBridgeReady(payData, callback));
      document.attachEvent('onWeixinJSBridgeReady',
          () => onBridgeReady(payData, callback));
    }
  } else {
    onBridgeReady(payData, callback);
  }
};
// export const isWeiXin = () => {
//   let ua = window.navigator.userAgent;
//   return ua.match(/MicroMessenger/i) === 'micromessenger';
// };
