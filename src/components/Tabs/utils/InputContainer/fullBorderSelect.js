import React from 'react'
import './fullBorder.css'

const InputContainer = ( props ) => {

    return (
            <div className="full-input-container">
            <label>{ props.label }</label>
            <select id="cars" onFocus={ props.onFocus } value={ props.value } onChange={ props.handleChange }>
                <option value="" disabled selected>{ props.placeholder }</option>
                { props.options.map( option => {
                    return <option value={ option.value }>{ option.text }</option>
                } ) }
            </select>
            {/* <input type="text" placeholder={ props.placeholder } onFocus={ props.onFocus } readOnly={ props.readOnly || false } value={ props.value } name={ props.name } onChange={ props.handleChange } /> */}
            </div>
    )
}

export default InputContainer