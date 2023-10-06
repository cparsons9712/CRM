
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


