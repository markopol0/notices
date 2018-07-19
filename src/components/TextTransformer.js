import React, { Component } from 'react'
import PropTypes from 'prop-types'


import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

export default class TextTransformer extends Component {
    state = {
        currentValue: ''
    }

    static propTypes = {
        mode: PropTypes.oneOf(['lower', 'upper']),
        transformToLowerCase: PropTypes.func.isRequired,
        transformToUpperCase: PropTypes.func.isRequired,
        toggleSnackbar: PropTypes.func.isRequired,
        transformedValue: PropTypes.string,
        error: PropTypes.string,
        snackbarOpen: PropTypes.bool
    }

    
    handleCloseSnackbar = (event, reason) => {
        const { toggleSnackbar } = this.props
        
        if (reason === 'clickaway') {
          return;
        }

        toggleSnackbar(false)
    };
    handleChange = e => this.setState({ currentValue: e.target.value })

    handleSubmit = e => {
        const { transformToLowerCase, transformToUpperCase, toggleSnackbar, mode } = this.props
        const { currentValue } = this.state
        const action = mode === 'upper' ? transformToUpperCase : transformToLowerCase
        e.preventDefault()
        toggleSnackbar(true)
        action(currentValue)

    }

    render() {
        const { currentValue } = this.state
        const { transformedValue, isLoading, error, snackbarOpen } = this.props
        return (
            <div className="TextTransformer-container">
                <form onSubmit={this.handleSubmit}>
                    <input value={currentValue} type="text" placeholder="Enter text to transform" onChange={this.handleChange} />
                    <button type="submit">Transform Text</button>
                </form>
                <p>Transformed Text: {transformedValue}</p>


                <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={this.handleCloseSnackbar}
                ContentProps={{
                    'aria-describedby': 'message-id',
                    style:{backgroundColor: isLoading? blue[500] : error ? red[500] : green[500]}
                }}
                message={<span id="message-id">{isLoading? 'Loading...' : error ? 'Something went wrong' : 'Text transformed successfully!'}</span>}
                action={[
                
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        // className={classes.close}
                        onClick={this.handleCloseSnackbar}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
                />
            </div>
        )
    }
}