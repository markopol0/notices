import axios from 'axios'

const TRANSFORM_VALUE_LOAD = 'TRANSFORM_VALUE_LOAD'
const TRANSFORM_VALUE_SUCCESS = 'TRANSFORM_VALUE_SUCCESS'
const TRANSFORM_VALUE_ERROR = 'TRANSFORM_VALUE_ERROR'

const TOGGLE_SNACKBAR = 'TOGGLE_SNACKBAR'

const LOWERCASE_ENDPOINT = '/api/lowercase'
const UPPERCASE_ENDPOINT = '/api/uppercase'

const UPPERCASE = 'uppercase'
const LOWERCASE = 'lowercase'

const transformText = (input, mode = LOWERCASE) => dispatch => {
    mode = mode.toLowerCase()
    const endpoint = mode === UPPERCASE ? UPPERCASE_ENDPOINT : LOWERCASE_ENDPOINT

    dispatch({ type: TRANSFORM_VALUE_LOAD })
    axios.post(endpoint, { input })
        .then(res => dispatch({ type: TRANSFORM_VALUE_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: TRANSFORM_VALUE_ERROR, payload: err }))
}
const toggle = (input) => dispatch => {
    dispatch({ type: TOGGLE_SNACKBAR, payload: input})
}

export const transformToLowerCase = input => transformText(input)
export const transformToUpperCase = input => transformText(input, UPPERCASE)
export const toggleSnackbar = input => toggle(input)

const initialState = {
    transformedValue: '',
    snackbarOpen: false,
    isLoading: false,
    error: null
}

export default function textTransform(state = initialState, { type, payload }) {
    switch (type) {
        case TRANSFORM_VALUE_LOAD:
            return { ...state, isLoading: true, transformedValue: '' }
        case TRANSFORM_VALUE_SUCCESS:
            return { ...state, isLoading: false, error:'', transformedValue: payload.output }
        case TRANSFORM_VALUE_ERROR:
            return { ...state, isLoading: false, error: payload.message }
        case TOGGLE_SNACKBAR:
            return { ...state, snackbarOpen: payload }

        default: return state
    }
}