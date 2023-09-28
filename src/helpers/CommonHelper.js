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
    }

    // encryptPassword(str) {
    //     const result = hash(str, 10)
    //     return result
    // }
}

export default commonHelpers