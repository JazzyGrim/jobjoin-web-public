import React from 'react'

const StatusSlider = ( props ) => {

    return (
            <div id="slider-container">
                { props.label && <label>{ props.label }</label> }
                <div id="status-slider">
                    <div id="slider" style={ props.status ? { left: '50%', borderBottomLeftRadius: '0', borderTopLeftRadius: '0', borderBottomRightRadius: '5px', borderTopRightRadius: '5px' } : { left: 0 } }></div>
                    <div id="side" onClick={ ( ) => props.setSlider( props.name, 0 ) }>
                        <h3 id={ !props.status ? "active" : "" }>{ props.leftText }</h3>
                    </div>
                    <div id="side" onClick={ ( ) => props.setSlider( props.name, 1 ) } >
                        <h3 id={ props.status ? "active" : "" }>{ props.rightText }</h3>
                    </div>
                </div>
            </div>
    )
}

export default StatusSlider