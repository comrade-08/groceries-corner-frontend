import React, { useEffect } from 'react'
import session from '../helpers/session'
import { useNavigate } from 'react-router-dom'
import { Button, Form, FormControl, Image, Row } from 'react-bootstrap'
import translate from '../languages/translater'
import Fallback from '../images/fallback(2).jpg'

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
        <>
            <div className='container products-grand-parent'>
                <div className='my-5 rounded orders-parent'>
                    <div className='p-4 orders-head text-center text-md-start'>
                        {translate('productsHead')}
                    </div>
                    <div>
                        <Form className='p-3'>
                            <FormControl placeholder='Search Products' type='text' className='search rounded-pill' id='search' name='search' />
                        </Form>
                    </div>
                    <div className='product-parent p-3 px-md-5 pb-md-5'>
                        <Row className='justify-content-center'>
                            <div className='mb-5 mb-md-0 col-12 col-sm-10 col-md-4 col-xl-6'>
                                <div className=''>
                                    <Image src={'image'} className='product-image img-fluid' onError={(e) => fallBackImage(e)} />
                                </div>
                                <div className='single-desc-parent text-center p-2'>
                                    <div className='d-md-flex justify-content-between'>
                                        <p className='single-desc'><i className="bi bi-currency-rupee"></i>12,345</p>
                                        <p className='single-desc'>
                                            <i className="bi bi-star"></i>
                                            <i className="bi bi-star"></i>
                                            <i className="bi bi-star"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </p>
                                    </div>
                                    <div>
                                        <p className='single-desc'>HP LaserJet Pro P1108 Single Function Monochrome Laser</p>
                                    </div>
                                    <div className='text-md-end p-2'>
                                        <Button className='btn-common rounded-md-pill px-3'>Add to Cart</Button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-sm-10 col-md-4 col-xl-6'>
                                <div className=''>
                                    <Image src={'image'} className='product-image img-fluid' onError={(e) => fallBackImage(e)} />
                                </div>
                                <div className='single-desc-parent text-center p-2'>
                                    <div className='d-md-flex justify-content-between'>
                                        <p className='single-desc'><i className="bi bi-currency-rupee"></i>12,345</p>
                                        <p className='single-desc'>
                                            <i className="bi bi-star"></i>
                                            <i className="bi bi-star"></i>
                                            <i className="bi bi-star"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </p>
                                    </div>
                                    <div>
                                        <p className='single-desc'>HP LaserJet Pro P1108 Single Function Monochrome Laser</p>
                                    </div>
                                    <div className='text-md-end p-2'>
                                        <Button className='btn-common rounded-md-pill px-3'>Add to Cart</Button>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products