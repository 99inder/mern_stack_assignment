import React from 'react'

export default function Alert(props) {

    return (
        <div className="my-2" style={{ height: '55px', textAlign: 'center'}}>
            {
                props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                    <strong>{props.alert.type === 'danger'? "Error " : "Hurray! "}</strong> : {props.alert.message}.
                </div>
            }
        </div>
    )
}