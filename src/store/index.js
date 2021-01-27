import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


const initiateState= {
    tukang: null,
    idTukang: "",
    token: null
}
function reducer (state = initiateState, action) {
    switch (action.type) {
        case 'GET_TUKANG':
            return {...state, tukang: action.payload }  
        case 'GET_ID' :
            return {...state, idTukang: action.payload}  
        case 'SET_TOKEN' :
            return {...state, token: action.payload}  
        default:
            break;
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store