import React from 'react'
import { TextField, InputAdornment, IconButton, Grid } from "@material-ui/core"

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
function Input({ half, name, handlechange, label, type, autoFocus, handleShowPassowrd }) {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                label={label}
                onChange={handlechange}
                variant="outlined"
                required
                fullWidth
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassowrd}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null}

            />
        </Grid>
    )
}

export default Input
