import ClipboardJS from 'clipboard';

export const imgHandle = (file, obj) => {
  return new Promise(((resolve, reject) => {
    if (typeof FileReader === 'undefined') return resolve(file);
    let reader = new FileReader();
    let Orientation;
    window.EXIF.getData(file, function() {
      window.EXIF.getAllTags(this);
      Orientation = window.EXIF.getTag(this, 'Orientation');
      reader.readAsDataURL(file);
    });
    reader.onload = function() {
      imgCompress(file, obj || {}, this.result, resolve, Orientation);
    };
  }));
};
export const imgCompress = (file, obj, src, resolve, Orientation) => {
  const img = new Image();
  img.src = src;
  img.onload = function() {
    const that = this;
    // 默认按比例压缩
    let w = that.width,
        h = that.height,
        scale = w / h;
    w = obj.width || w;
    h = obj.height || (w / scale);
    if (obj.maxPx) {
      if (w > obj.maxPx && w > h) {
        h = h * obj.maxPx / w;
        w = obj.maxPx;
      } else {
        w = w * obj.maxPx / h;
        h = obj.maxPx;
      }
    }
    let quality = 0.5;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const anw = document.createAttribute('width');
    const anh = document.createAttribute('height');
    if (Orientation && Orientation !== 1) {
      switch (Orientation) {
        case 6://需要顺时针（向左）90度旋转
          anw.nodeValue = h;
          anh.nodeValue = w;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.translate(h, 0);
          ctx.rotate(Math.PI / 2);
          break;
        case 8://需要逆时针（向右）90度旋转
          anw.nodeValue = h;
          anh.nodeValue = w;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.translate(0, w);
          ctx.rotate(-Math.PI / 2);
          break;
        case 3://需要180度旋转
          anw.nodeValue = w;
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.translate(w, h);
          ctx.rotate(Math.PI);
          break;
        default:
          anw.nodeValue = w;
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          break;
      }
    } else {
      anw.nodeValue = w;
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
    }
    ctx.drawImage(that, 0, 0, w, h);
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality;
    }
    const base64 = canvas.toDataURL( 'image/jpeg', quality);
// 回调函数返回base64的值
    const urlFile = convertBase64UrlToBlob(base64);
    urlFile.name = file.name;
    resolve(urlFile);
  };
};
export const convertBase64UrlToBlob = (urlData) => {
  let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
};

export const copyText = (text, container) => {
  return new Promise(function(resolve, reject) {
    var fake_el = document.createElement('button');
    var clipboard = new ClipboardJS(fake_el, {
      text: function() { return text; },
      action: function() { return 'copy'; },
      container: typeof container === 'object' ? container : document.body,
    });
    clipboard.on('success', function(e) {
      clipboard.destroy();
      resolve(e);
    });
    clipboard.on('error', function(e) {
      clipboard.destroy();
      reject(e);
    });
    fake_el.click();
  });
};
export const isWeChat = () => {
  var matchArr = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
  return matchArr && matchArr[0] && matchArr[0] === 'micromessenger';
};

export const isAliPay = () => {
  var matchArr = window.navigator.userAgent.toLowerCase().match(/Alipay/i);
  return matchArr && matchArr[0] && matchArr[0] === 'alipay';
};

export const IsPC = () => {
  let userAgentInfo = navigator.userAgent;
  let Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag; // true pc端 false 移动端
};

// 20200624定制需求，英文版

/**
 *  模板语言类型(业务通后台定义的值)
 *  @val tmlType的值
 * */
export const getTmlType = (val) => {
  switch (+val) {
    case 2: // 英文
      return 'en';
    case 3: // '中英混合'
      return 'zh-en';
    case 1: // '中文'
    default:
      return 'zh'
  }
};

// 获取地址栏url参数
function GetQueryString(key) {
  try{
    let arr = window.location.hash.split('?')[1].split('&')
    let obj={}
    arr.map(item=>{
      let brr = item.split('=')
      obj[brr[0]]=brr[1]
    })
    return obj[key]
  }
  catch (e) {
    return ''
  }
}

/**
 *  场景：英文版时设置文本有空格，但业务通后台不支持，用特殊字符替代，前端替换成空格显示
 *  将特殊字符替换为空格
 *  @val tmlType的值
 * */
export const reps = (val) => {
  if(!val) return '';
  // 中文不处理
  if(getTmlType(GetQueryString('tmlType'))==='zh') return val;
  // 其他语言替换约定的字符为空格
  let r = new RegExp('000', 'g');
  return val.replace(r,' ')
};
