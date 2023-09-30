import React from 'react'
import nodataFoundImage from '../images/no-data-found.png'
import { Image } from 'react-bootstrap'
import translate from '../languages/translater'
import { useSelector } from 'react-redux'

const NodataFound = () => {
  const { lang } = useSelector((state) => state.userReducer)

  return (
    <div className='container'>
      <Image className='no-data-img' src={nodataFoundImage} fluid/>
      <p className='no-data'>{translate('noDataFound', lang)}</p>
    </div>
  )
}

export default NodataFound