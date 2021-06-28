import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const InputContainer = ( props ) => {

    return (
            <div className="input-container">
                <FontAwesomeIcon icon={ props.icon } color="#111111" size="lg" fixedWidth />
                <input
                    type={ props.type || "text" }
                    placeholder={ props.placeholder }
                    onChange={ props.onChange }
                    value={ props.value }
                    name={ props.name }
                    onKeyDown={ props.onKeyDown }
                />
            </div>
    )
}

export default InputContainer