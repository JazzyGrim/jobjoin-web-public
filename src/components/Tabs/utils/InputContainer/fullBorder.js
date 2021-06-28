import React from 'react'
import './fullBorder.css'

const InputContainer = ( props ) => {

    return (
            <div className="full-input-container">
            <label>{ props.label }</label>
            <input type="text" placeholder={ props.placeholder } onFocus={ props.onFocus } readOnly={ props.readOnly || false } value={ props.value } name={ props.name } onChange={ props.handleChange } />
            </div>
    )
}

export default InputContainer