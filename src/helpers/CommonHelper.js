import { toast } from 'react-toastify'
import translate from '../languages/translater'

const commonHelpers = {
  showMsg(msg, type, lang) {
    const toastStyle = {
      color: '#4a4a4a',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 600,
      background: '#f6f6f6',
      letterSpacing: '0.5px'
    }
    switch (type) {
      case 'error':
        toast.error(msg, { style: toastStyle })
        break;
      case 'success':
        toast.success(msg, { style: toastStyle })
        break;
      case 'info':
        toast.info(msg, { style: toastStyle })
        break;
      case 'warning':
        toast.warning(msg, { style: toastStyle })
        break;
      default:
        toast.error(translate('somethingWrong'), { style: toastStyle })
        break
    }
    return
  },

  checkEmptyInput(input) {
    const result = input && input !== '' ? true : false
    return result
  },

  checkIsAlphabet(input) {
    const regEx = /[a-zA-Z]/i
    const result = regEx.test(input)
    return result
  },

  checkIsEmail(input) {
    const regEx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
    const result = regEx.test(input)
    return result
  },

  sum(array) {
    let result = 0
    if (array && array.length > 0) {
      result = array.reduce((elem1, elem2) => { return elem1 + elem2 })
    }
    return result
  },

  multiply(array) {
    let result = 0
    if (array && array.length > 0) {
      result = array.reduce((elem1, elem2) => { return elem1 * elem2 })
    }
    return result
  }

  // encryptPassword(str) {
  //     const result = hash(str, 10)
  //     return result
  // }
}

export default commonHelpers