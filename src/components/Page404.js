import React from 'react'
import { Image } from 'react-bootstrap'
import image404 from '../images/page-not-found.png'
import translate from '../languages/translater'
import { useSelector } from 'react-redux'

const Page404 = () => {
  const { lang } = useSelector((state) => state.userReducer)
  
  return (
    <div className='mt-5 container text-center page-not-parent'>
      <Image className='mb-0' src={image404} fluid/>
      <p className='mt-0 page-not-text'>{translate('pageNotFound', lang)}</p>
    </div>
  )
}

export default Page404