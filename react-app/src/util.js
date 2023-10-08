
export const validateEmail = (email) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
     return true;
    } else {
      return false;
    }
}

export const fixDate = (date) => {
  // Javascript messes up dates when it converts it to current time zone. This corrects it back to the right day
  date = new Date(date)
  date = date.getTime() + + Math.abs(date.getTimezoneOffset()*60000)
  date = new Date(date)
  return date
}

export const convertDate = (date) => {
  let day = date.slice(5, 7)
  const months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
  let month = months[date.slice(8,11)]
  return `${month}/${day}`
}

export const convertTime = (time) =>{

  time = time.split(":")
  let frame;
  if(+time[0] > 12 ){
    time[0] = String(+time[0] - 12)
    frame = 'PM'
  }
  else{
    frame = 'AM'
  }
  time = time.join(":")
  time += ` ${frame}`
  return time

}

export const convertPhone = (phoneNumber) =>{
  return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)} - ${phoneNumber.slice(6)}`
}

export const convertMonth = (str) =>{
  const months = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr" : "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12",
  }
  return months[str]
}

export const convertDateTime = (date, time) =>{
    let year = date.slice(12,16)
    let monthstr = date.slice(8,11)
    let month = convertMonth(monthstr)
    let day = date.slice(5,7)
    return `${year}-${month}-${day}T${time}:00`
}
