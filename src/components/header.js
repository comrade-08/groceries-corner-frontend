import React from 'react'
import translate from '../languages/translater'

const Header = (props) => {

  return (
    <div className='text-center py-3 header'>
      {
        translate('headerContent', props.lang)
      }
    </div>
  )
}

export default Header