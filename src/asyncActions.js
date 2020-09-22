const redux = require('redux')
const loggerMiddleware = require('redux-logger')
const thunkMiddleware = require('redux-thunk').default

const axios = require('axios')


const initialState = {
    loading: false,
    users: [],
    error: ''
}


//Actions
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}


//Reducers
const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }    

        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }    
    }
}


//ThunkMiddleware permite criar uma action que return uma função(não precisa ser pura = side effects)
const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            const users = response.data.map((user) => user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch((error) => {
            dispatch(fetchUsersFailure(error.message))
        })
    }
}


//Store
const store = redux.createStore(reducer, redux.applyMiddleware(thunkMiddleware))
// Subscribe a listener to the store
const unsubscribe = store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())

//unsubscribe()