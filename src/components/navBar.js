import React, { useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import translate from '../languages/translater'
import { useSelector } from 'react-redux'
import session from '../helpers/session'

const NavBar = (props) => {
  const profileRef = React.createRef()
  const productRef = React.createRef()
  const cartRef = React.createRef()
  const ordersHistoryRef = React.createRef()
  const { lang } = useSelector((state) => state.userReducer)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const path = location.pathname
    let type
    if (path === '/orders-history') {
      type = 'ordersHistory'
    } else if (path === '/profile') {
      type = 'profile'
    } else if (path === '/products') {
      type = 'products'
    } else if (path === '/cart') {
      type = 'cart'
    }

    handleNavLinkStyle(type)
    // eslint-disable-next-line
  }, [])

  const handleNavLinkStyle = (type) => {
    const profile = profileRef.current.classList
    const product = productRef.current.classList
    const cart = cartRef.current.classList
    const ordersHistory = ordersHistoryRef.current.classList

    const removeClasses = () => {
      product.remove('active')
      profile.remove('active')
      cart.remove('active')
      ordersHistory.remove('active')
    }
    if (type === 'profile') {
      removeClasses()
      profile.add('active')
    } else if (type === 'products') {
      removeClasses()
      product.add('active')
    } else if (type === 'cart') {
      removeClasses()
      cart.add('active')
    } else if (type === 'ordersHistory') {
      removeClasses()
      ordersHistory.add('active')
    }
  }

  const handleLogOut = () => {
    const result = session.clearUnneccessaryData()
    if (result) {
      props.setisLoginUser()
      navigate('/')
    }
  }

  return (
    <Navbar className='navbar-parent' expand="lg">
      <Container fluid>
        <Link className='navbar-brand px-3 py-3' to='/profile' onClick={() => handleNavLinkStyle('profile')}>{translate('headerContent', lang)}</Link>
        <Navbar.Toggle className='toggle-btn' aria-controls="togglebtn" />
        <Navbar.Collapse id="togglebtn">
          <Nav className="">
            <Link ref={profileRef} className='nav-link mx-3 active' to='/profile' onClick={() => handleNavLinkStyle('profile')}>{translate('profileLink', lang)}</Link>
            <Link ref={productRef} className='nav-link mx-3' to='/products' onClick={() => handleNavLinkStyle('products')}>{translate('productLink', lang)}</Link>
            <Link ref={cartRef} className='nav-link mx-3' to='/cart' onClick={() => handleNavLinkStyle('cart')}>{translate('cartLink', lang)}</Link>
            <Link ref={ordersHistoryRef} className='nav-link mx-3' to='/orders-history' onClick={() => handleNavLinkStyle('ordersHistory')}>{translate('ordersHistoryLink', lang)}</Link>
            <Link className='nav-link mx-3' to='' onClick={(e) => handleLogOut(e)}>{translate('logOutLink', lang)}</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar