import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import translate from '../languages/translater'
import { useSelector } from 'react-redux'

const NavBar = () => {
    const profileRef = React.createRef()
    const productRef = React.createRef()
    const { lang } = useSelector((state) => state.userReducer)

    const handleNavLinkStyle = (type) => {
        const profile = profileRef.current.classList
        const product = productRef.current.classList
        if (type === 'profile') {
            product.remove('active')
            profile.add('active')
        } else if (type === 'products') {
            profile.remove('active')
            product.add('active')
        }
    }

    return (
        <Navbar className='navbar-parent' expand="lg">
            <Container>
                <Link className='navbar-brand' to='/dashboard/profile'>{translate('headerContent', lang)}</Link>
                <Navbar.Toggle className='toggle-btn' aria-controls="togglebtn" />
                <Navbar.Collapse id="togglebtn">
                    <Nav className="">
                        <Link ref={profileRef} className='nav-link mx-2 active' to='/dashboard/profile' onClick={() => handleNavLinkStyle('profile')}>{translate('profileLink', lang)}</Link>
                        <Link ref={productRef} className='nav-link mx-2' to='/dashboard/products' onClick={() => handleNavLinkStyle('products')}>{translate('productLink', lang)}</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar