const redux = require('redux')


//Action
const BUY_CAKE = 'BUY_CAKE'

function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First Redux Action'
    }
}



//Reducer
// reducer(previousState, action) => newState
const initialState = {
    numOfCakes: 10
}

const reducer = (state = initialState, action) => {
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


//Store
// reducer has access to the initial state
const store = redux.createStore(reducer)
console.log('Initial State: ', store.getState())
// Subscribe a listener to the store
const unsubscribe = store.subscribe(() => console.log('Updated State: ', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unsubscribe()