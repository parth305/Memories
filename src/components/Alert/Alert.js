import React from 'react'
import Alert from "@material-ui/lab/Alert"
function Alerts(props) {
    return (
        <div style={{height:"30px",margin:"15px"}}>
        {props.alert && <Alert severity={props.alert.type}>{props.alert.msg}</Alert>}
        </div>
    )
}

export default Alerts