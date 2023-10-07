import React, { useEffect, useState } from 'react'
import session from '../helpers/session'
import { useNavigate } from 'react-router-dom'
import { Button, FormControl, Image, Row } from 'react-bootstrap'
import translate from '../languages/translater'
import Fallback from '../images/fallback(2).jpg'
import { Rating } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/productReducer'
import { Carousel } from 'react-responsive-carousel'
import NodataFound from './NodataFound'

const Products = () => {
  const { productsData } = useSelector((state) => state.productReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [products, setProducts] = useState([])
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (!session.isLoginUser()) {
      navigate('/')
    } else {
      session.getUserData().then((userData) => {
        const user = JSON.parse(userData)
        dispatch(getProducts(user))
      })
      // setProducts(productsData)
      // console.log(productsData)
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
              {
                productsData && productsData.length > 0 ? (
                  <>
                    <div className='mb-3'>
                      <FormControl type="text" id='search' className='search' placeholder="Search Products" aria-label="Search Products" aria-describedby="search" />
                    </div>
                    <div className='container'>
                      <Row className=''>
                        {
                          productsData.map((item, i) => {
                            return (
                              <div className='col-12 col-sm-6 col-md-4 col-xl-3 mb-3' key={i}>
                                <div className='m-1 border rounded'>
                                  <div className='p-1 pb-0 image-carousel'>
                                    <Carousel showThumbs={false} infiniteLoop autoPlay className='image-carousel' showStatus={false}>
                                      {
                                        item.images.map((image, i) => {
                                          return (
                                            <div className=''>
                                              <Image src={image} className='rounded' onError={(e) => fallBackImage(e)} />
                                            </div>
                                          )
                                        })
                                      }
                                    </Carousel>
                                  </div>
                                  <div className='single-desc-parent text-center p-2'>
                                    <div className='d-md-flex justify-content-between'>
                                      <p className=''><i className="bi bi-currency-rupee"></i>{item.price}</p>
                                      <Rating
                                        key={i}
                                        size='small'
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(e, value) => {
                                          setRating(value)
                                        }}
                                      />

                                    </div>
                                    <div>
                                      <p className='product-name'>{item.name}</p>
                                      <p className='product-description'>{item.description}</p>
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
                  </>
                ) : (
                  <div className='text-center no-data-products rounded'>
                    <NodataFound />
                  </div>
                )

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products