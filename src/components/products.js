import React, { useEffect } from 'react'
import session from '../helpers/session'
import { useNavigate } from 'react-router-dom'
import { Button, Form, FormControl, Image, InputGroup, Row } from 'react-bootstrap'
import translate from '../languages/translater'
import Fallback from '../images/fallback(2).jpg'
import { Rating } from '@mui/material'

const Products = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (!session.isLoginUser()) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [])

  const fallBackImage = (e) => {
    e.target.src = Fallback
  }

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-lg-10 col-md-12 container'>
          <div className='rounded register-parent'>
            <div className='text-center register-head py-4'>
              {translate('productsHead')}
            </div>
            <div className='p-md-4 p-3'>
              <div className='mb-3'>
                <FormControl type="text" className='search' placeholder="Search Products" aria-label="Search Products" aria-describedby="search" />
              </div>
              <div>
                <Row className=''>
                  {
                    [1, 2, 3, 4, 5].map((item, i) => {
                      return (
                        <div className='col-12 col-sm-6 col-md-4 col-xl-3 mb-3'>
                          <div className='m-1 border rounded'>
                            <div className='rounded p-1'>
                              <Image src={'image'} className='product-image img-fluid' onError={(e) => fallBackImage(e)} />
                            </div>
                            <div className='single-desc-parent text-center p-2'>
                              <div className='d-md-flex justify-content-between'>
                                <p className=''><i className="bi bi-currency-rupee"></i>12,345</p>
                                <p className=''>
                                  <Rating
                                    size='small'
                                    name="simple-controlled"
                                    value={2}
                                  // onChange={(event, newValue) => {
                                  //     setValue(newValue);
                                  // }}
                                  />
                                </p>
                              </div>
                              <div>
                                <p className=''>HP LaserJet Pro P1108 Single Function Monochrome Laser</p>
                              </div>
                              <div className='text-md-end p-2'>
                                <Button className='btn-common rounded-md-pill px-3'>Add to Cart</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products