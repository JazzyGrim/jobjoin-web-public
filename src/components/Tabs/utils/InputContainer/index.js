import React from 'react'

const InputContainer = ( props ) => {

    return (
            <div className="input-container" id={ props.id }>
                <input type="text" placeholder="&nbsp;" onFocus={ props.onFocus } readOnly={ props.readOnly || false } value={ props.value } name={ props.name } onChange={ props.handleChange } />
                <span className="input-label">{ props.label }</span>
                <span className="input-border"></span>
            </div>
    )
}

export default InputContainer