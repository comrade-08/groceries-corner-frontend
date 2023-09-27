import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = (props) => {
  return (
    <>
      {
        props && props.size === 'small'
          ? (<div className='px-4'>
            <Spinner size='sm'></Spinner>
          </div>)
          : (<div className='px-4'>
            <Spinner size='xl'></Spinner>
          </div>)
      }
    </>
  )
}

export default Loader