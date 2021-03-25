const area: any = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
  91: '国外',
};

function deal(error: any, callback: Function, defMsg: string) {
  if (error) {
    callback(defMsg || '不合法');
  } else {
    callback();
  }
}

function dealRegex(regex: RegExp, val: string, callback: Function, defMsg: string) {
  var reg = regex;
  if (!reg) {
    callback('验证规则错误');
  } else {
    if (typeof reg == 'string') {
      reg = new RegExp(reg);
    }
    deal(!reg.test(val), callback, defMsg);
  }
}

function dealIdCard(val: any, callback: Function, defMsg: string) {
  if (val) {
    const f = (v: string, i: number) => parseInt(v.substr(i, 1));
    if (val.length != 15 && val.length != 18 && val.length != 8) {
      return callback(defMsg || '不合法1');
    } else if (val.length == 18) {
      var a = val.substr(0, 2);
      if (!area[a as string]) {
        return callback(defMsg || '不合法2');
      }
      var yyyy = val.substr(6, 4), mm = val.substr(10, 2), dd = val.substr(12, 2);
      var DD = new Date(yyyy + '/' + mm + '/' + dd);
      if (!(DD.getFullYear() == yyyy && (DD.getMonth() + 1) == mm && DD.getDate() == dd)) {
        return callback(defMsg || '不合法3');
      }
      var S = (f(val, 0) + f(val, 10)) * 7 + (f(val, 1) + f(val, 11)) * 9 + (f(val, 2) + f(val, 12)) * 10 +
          (f(val, 3) + f(val, 13)) * 5
          + (f(val, 4) + f(val, 14)) * 8 + (f(val, 5) + f(val, 15)) * 4 + (f(val, 6) + f(val, 16)) * 2 + f(val, 7) * 1 +
          f(val, 8) * 6 + f(val, 9) * 3;
      if (val.substr(17, 1) !== '10X98765432'.substr((S % 11), 1)) {
        return callback(defMsg || '不合法4');
      }
    } else if (val.length == 15) {
      var a = val.substr(0, 2);
      if (!area[parseInt(a)]) {
        return callback(defMsg || '不合法5');
      }
      var yy = val.substr(6, 2), mm = val.substr(8, 2), dd = val.substr(10, 2);
      var DD = new Date('19' + yy + '/' + mm + '/' + dd);
      if (!((DD as any).getYear() == yy && (DD.getMonth() + 1) == mm && DD.getDate() == dd)) {
        return callback(defMsg || '不合法6');
      }
    } else {
      if (!/^[A-Z]\d{6}[A0-9]$/.test(val)) {
        return callback(defMsg || '不合法7');
      }
      var S = ((val.substr(0, 1).charCodeAt() - 64) * 8 + f(val, 1) * 7 + f(val, 2) * 6 + f(val, 3) * 5 + f(val, 4) *
          4 + f(val, 5) * 3 + f(val, 6) * 2) % 11;
      if (!((S == 0 && val.substr(7, 1) == '0') || (S == 1 && val.substr(7, 1) == 'A') || (f(val, 7) == (11 - S)))) {
        return callback(defMsg || '不合法8');
      }
    }
  }
  callback();
}

export const idCard = (val: string, callback: Function) => {
  dealIdCard(val, callback, '不是合法的身份证号');
};//"不是合法的身份证号"

export const email = (val: string, callback: Function) => {
  dealRegex(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      val, callback, '不是合法的邮箱');
};

export const businessLicenseVal = (val: string, callback: Function) => {
  dealRegex(/^[A-Z0-9]{12,18}$/, val, callback, '不是合法的营业执照号');
};

export const mobile = (val: string, callback: Function) => {
  dealRegex(/^1[1-9]\d{9}$/, val, callback, '不是合法的手机号');
};

export const valideNum = (value: any) => {
  return /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test(value);
};

export const mobileOrEmail = (val: string, callback: Function) => {
  var mReg = /^1[1-9]\d{9}$/;
  var eReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!mReg.test(val) && !eReg.test(val)) {
    callback('不是合法的手机/邮箱')
  } else {
    callback()
  }
};