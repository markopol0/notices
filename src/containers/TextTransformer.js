import { connect } from 'react-redux'
import TextTransformer from '../components/TextTransformer'
import { transformToLowerCase, transformToUpperCase, toggleSnackbar } from '../store/textTransform'

const mapStateToProps = state => ({
    transformedValue: state.textTransform.transformedValue,
    error: state.textTransform.error,
    isLoading: state.textTransform.isLoading,
    snackbarOpen: state.textTransform.snackbarOpen
})

export default connect(mapStateToProps, { transformToLowerCase, transformToUpperCase, toggleSnackbar })(TextTransformer)