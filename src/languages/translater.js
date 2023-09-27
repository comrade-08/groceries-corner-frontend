import en from './en.json'
import tam from './tam.json'

const translate = (input_key, lang) => {
  let result
  if (lang === 'tam') {
    result = tam[input_key] ? tam[input_key] : null
  } else {
    result = en[input_key] ? en[input_key] : null
  }

  if (result) {
    return result
  }

  return input_key
}

export default translate