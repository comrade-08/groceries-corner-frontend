import React, { useEffect, useState } from 'react'
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
  const stocksRef = React.createRef()
  const usersRef = React.createRef()
  const nothingRef = React.createRef()
  const { lang } = useSelector((state) => state.userReducer)
  const location = useLocation()
  const navigate = useNavigate()
  const initialState = {
    id: '',
    userName: '',
    mobileNumber: '',
    address: '',
    password: '',
    language: '',
    incompleteOrders: [],
    ordersHistory: [],
    wishList: [],
    isAdmin: false
  }

  const [user, setUser] = useState(initialState)

  useEffect(() => {
    session.getUserData().then((user) => {
      setUser(JSON.parse(user))
    })
    const path = location.pathname
    let type
    switch (path) {
      case '/orders-history':
        type = 'ordersHistory'
        break;
      case '/profile':
        type = 'profile'
        break;
      case '/products':
        type = 'products'
        break;
      case '/cart':
        type = 'cart'
        break;
      case '/admin/stocks':
        type = 'stocks'
        break;
      case '/admin/users':
        type = 'users'
        break;
      default:
        type = ''
        break;
    }
    console.log(type, 'type')
    handleNavLinkStyle(type)
    // eslint-disable-next-line
  }, [])

  const handleNavLinkStyle = (type) => {
    const profile = !user.isAdmin ? profileRef.current.classList : nothingRef.current.classList
    const product = !user.isAdmin ? productRef.current.classList : nothingRef.current.classList
    const cart = !user.isAdmin ? cartRef.current.classList : nothingRef.current.classList
    const ordersHistory = !user.isAdmin ? ordersHistoryRef.current.classList : nothingRef.current.classList
    const stocks = user.isAdmin ? stocksRef.current.classList : nothingRef.current.classList
    const users = user.isAdmin ? usersRef.current.classList : nothingRef.current.classList

    const removeClasses = () => {
      product.remove('active')
      profile.remove('active')
      cart.remove('active')
      ordersHistory.remove('active')
      stocks.remove('active')
      users.remove('active')
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
    } else if (type === 'stocks') {
      removeClasses()
      stocks.add('active')
    } else if (type === 'users') {
      removeClasses()
      users.add('active')
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
            {
              user.isAdmin ? (
                <>
                  {/* admin links */}
                  <Link ref={stocksRef} className='nav-link mx-3 active' to='/admin/stocks' onClick={() => handleNavLinkStyle('stocks')}>{translate('stocksLink', lang)}</Link>
                  <Link ref={usersRef} className='nav-link mx-3' to='/admin/users' onClick={() => handleNavLinkStyle('users')}>{translate('usersLink', lang)}</Link>
                </>
              ) : (
                <>
                  {/* user links */}
                  <Link ref={profileRef} className='nav-link mx-3 active' to='/profile' onClick={() => handleNavLinkStyle('profile')}>{translate('profileLink', lang)}</Link>
                  <Link ref={productRef} className='nav-link mx-3' to='/products' onClick={() => handleNavLinkStyle('products')}>{translate('productLink', lang)}</Link>
                  <Link ref={cartRef} className='nav-link mx-3' to='/cart' onClick={() => handleNavLinkStyle('cart')}>{translate('cartLink', lang)}</Link>
                  <Link ref={ordersHistoryRef} className='nav-link mx-3' to='/orders-history' onClick={() => handleNavLinkStyle('ordersHistory')}>{translate('ordersHistoryLink', lang)}</Link>
                  <Link className='nav-link mx-3' to='' onClick={(e) => handleLogOut(e)}>{translate('logOutLink', lang)}</Link>
                </>
              )
            }

            <div ref={nothingRef}></div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar