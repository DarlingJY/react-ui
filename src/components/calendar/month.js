import moment from 'moment'
function calendar(value) {
  let year = !!value ? moment(value).format('YYYY') : moment().format('YYYY');
  let month = !!value ? moment(value).format('MM') : moment().format('MM');
  let arr = [];
  let arrStr = [];
  let days = new Date(year, month, 0).getDate();//获取当前月的天数
  for (let i = 1; i <= days; i++) {
    // if (i < 10) {
    //   arr.push('0' + i)
    // } else {
    arr.push(i)
    // }
  }

  //计算规则
  // if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
  //   arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];//
  // } else if (month == 4 || month == 6 || month == 9 || month == 11) {
  //   arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];//
  // } else {
  //   if (year % 40 && year % 100 != 0 || year % 4000) {
  //     arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'];//闰年29天
  //   } else {
  //     arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];//平年28天
  //   }
  // }
  function week(item) {
    switch (moment(item).format('dddd')) {
      case 'Sunday': arrStr = [];//星期天
        break;
      case 'Monday': arrStr = [''];
        break;
      case 'Tuesday': arrStr = ['', ''];
        break;
      case 'Wednesday': arrStr = ['', '', ''];
        break;
      case 'Thursday': arrStr = ['', '', '', ''];
        break;
      case 'Friday': arrStr = ['', '', '', '', ''];
        break;
      case 'Saturday': arrStr = ['', '', '', '', '', ''];
        break;
    }

  }
  week(year + month + '01');

  let date = [...arrStr, ...arr];
  return date;
}


/**
 * 获取距离当前日期的第n个月 
 * 
 * @date 格式为yyyy-mm-dd的日期，如：2020-01-25 
 */
function getMonth(date, n) {
  date = !!date ? date : moment().format('YYYY-MM-DD');
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份  
  var month = arr[1]; //获取当前日期的月份  
  var day = arr[2]; //获取当前日期的日  
  var year2 = year;
  var month2 = parseInt(month) + n;
  if (n === 0) return new Date(date)
  if (month2 === 0) {
    month2 = 12
    year2 = parseInt(year2) - 1
  } else {
    year2 = parseInt(year2) + Math.floor(month2 / 12);
    month2 = month2 <= 12 && month2 > 0 ? month2 : (12 + (month2 % 12)) % 12;
  }


  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();//获取计算出的月的天数
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2 + '-' + day2;
  return new Date(t2);
}



export default { calendar, getMonth }