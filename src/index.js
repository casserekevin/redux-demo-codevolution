const redux = require('redux')
const reduxLogger = require('redux-logger')

//Action
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First Redux Action'
    }
}

function buyIceCream(){
    return {
        type: BUY_ICECREAM,
        info: 'First Redux Action'
    }
}



//Reducer
// reducer(previousState, action) => newState
// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// }

const initialCakeState = {
    numOfCakes: 10,
}

const InitialIceCreamState = {
    numOfIceCreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        
        default: 
            return state
    }
}

const iceCreamReducer = (state = InitialIceCreamState, action) => {
    switch(action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }    

        default: 
            return state
    }
}
// reducer has access to the initial state
const rootReducer = redux.combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})


//Store
const store = redux.createStore(rootReducer, redux.applyMiddleware(reduxLogger.createLogger()))
console.log('Initial State: ', store.getState())
// Subscribe a listener to the store
const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()