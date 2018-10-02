// We initialize state just like the local state in our React components so that there is always a defined property to reference, even before data is retreived.
const initialState = {
    guests: ['Tony Stark', 'Steve Rodgers', ' Nick Fury', 'Natasha Romanova', 'Clint Barton', 'Bruce Banner', 'Wanda Maximoff']
}

// We define string constants so that our types will have 'one source of truth' for a value that will be used in multiple places (reducer switch statement and action creators). We also get some nifty auto-complete out of it. TLDR: it helps with keeping code consistent and debugging.
const ADD_GUEST = 'ADD_GUEST';
const REMOVE_GUEST = 'REMOVE_GUEST';
const EDIT_GUEST = 'EDIT_GUEST';

// We provide a default parameter to the reducer so that if this function ever runs without a parameter(like on start up) the state will always be defined as the value of the initialState object.
export default function reducer(state = initialState, action) {
    // We are using a switch statement so that we can execute different code based on the action's type as it is passed into the reducer
    switch(action.type) {
        // Our string constant reference goes as a case in our switch statement.
        case ADD_GUEST: {
            // keep redux state immutable by using Object.assign. This will help our components know when to re-render because it will trigger that new props are received.
            return Object.assign({}, state, {guests: [...state.guests, action.payload]})
            // We are merging the old value of state into an empty object, and then merging another object to override that properties old data with our new data. We are defining a new array, spreading the current contents of state.guests into the new array, and then adding the new item to the end.
        }

        case REMOVE_GUEST: {
            // We are using a .filter to only allow items that are not the payload to stay in the array. In short, we are removing one guest from the array since there should only be one match. .filter returns a new array which helps keep our data immutable.
            let newGuestList = state.guests.filter( guest => {
                return guest !== action.payload;
            })
            return Object.assign({}, state, {guests: newGuestList})
        }

        case EDIT_GUEST: {
            // we copy our array by defining a new array and spreading the values into it.
            let newGuestList = [...state.guests];
            // This action creator's payload is an object itself with an index and a name property. The action creator will be invoked off of props in the component with the guest name and the index. We access the correct guest by referencing the array at the index sent on the payload and set the new value to the name property on the payload object.
            newGuestList[action.payload.index] = action.payload.name;
            return Object.assign({}, state, {guests: newGuestList});
        }

        // We set a default case so that we are always at least returning an unmodified version of state if none of the case statements match.
        default: {
            return state; 
        }
        
    }
}

// we EXPORT, not export default our action creators. When we import the action creator, we will need to destructure it by name. i.e:
// import { addGuest } from './dux/guestList'
export function addGuest(guest) {
    return {
        type: ADD_GUEST,
        payload: guest
    }
}

export function removeGuest(guest) {
    return {
        type: REMOVE_GUEST,
        payload: guest
    }
}

// Since we need to pieces of data on the payload, we make the payload of this action an object so that we can store both the index and the guest. The action creator will be invoked with two arguments: first the guest, and second the index.
export function editGuest(guest, index) {
    return {
        type: EDIT_GUEST,
        payload: {
            index: index,
            name: guest
        }
    }
}