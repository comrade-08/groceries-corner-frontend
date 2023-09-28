import React from 'react'
import translate from '../languages/translater'
import { Row } from 'react-bootstrap'

const Footer = (props) => {
    return (
        <div className='py-4 footer container-fluid'>
            <div className='container'>
                <Row>
                    <div className='text-end'>
                        <a className='support-footer' href={`mailto:${translate('supportFooter', props.lang)}`}>{
                            translate('supportFooter', props.lang)
                        }</a>
                    </div>
                </Row>
            </div>
        </div>
    )
}

export default Footer