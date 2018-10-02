import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
// We need to import our action creator functions from the reducers. Make sure to destructure because they are all an 'export' and not an 'export default'
import { addGuest, removeGuest, editGuest } from './dux/guestList';
import EditGuest from './components/EditGuest';

class App extends Component {
  constructor() {
    super();
    this.state = {
      guestInput: '',
      guestEditInput: '',
      guestEditIndex: 0,
      editing: false
    }
  }

  // Just a simple input handler for our input that will update state with a new guest to add
  handleGuestInput = (e) => {
    this.setState({
      guestInput: e.target.value
    })
  }

  // This method takes the new guest value off of state and executes the action creater from the reducer to add a new guest to the array on redux state.
  addGuestToList = () => {
    // Don't forget to execute this method off of props
    this.props.addToGuestList(this.state.guestInput);
    this.setState({
      guestInput: ''
    })
  }

  // This method takes in the guest to remove as an argument and passes that data as an argument to the action creator. The logic in our reducer switch statement "REMOVE_GUEST" case handles removing the 
  removeGuestFromList = (guest) => {
    this.props.removeFromGuestList(guest)
  }
 
  // This method opens our modal and sets the guest that we want to edit to state as well as their index in the array. We capture this data in the .map in the render method before the return.
  toggleEditing = (guest, index) => {
    this.setState({
      guestEditInput: guest,
      guestEditIndex: index,
      editing: true
    })
  }

  // This method is an input handler that sets state with the data from the input in the editing modal. This method is passed through props to the EditGuest component and then put in the onChange.
  handleEditChange = (e) => {
    this.setState({
      guestEditInput: e.target.value
    })
  }

  // This method resets our guestEdit values to their defaults and closes the modal.
  handleCancel = () => {
    this.setState({
      guestEditInput: '',
      guestEditIndex: 0,
      editing: false
    })
  }

  // This method takes the data that we need to edit the guest including the value from the input and also the index that was set to state. We then execute the editGuestName action creator with those two items as arguements that will then be set to the payload of the action.
  handleSubmit = () => {
    let { guestEditInput, guestEditIndex } = this.state;
    this.props.editGuestName(guestEditInput, guestEditIndex);
    this.handleCancel()
  }

  render() {

    // Here we map over our array off of props. This data is provided by redux as a result of our mapStateToProps function below which gets passed into the connect() function.
    let displayedGuests = this.props.guestList.map( (guest, i) => {
      return (
        <div key={ i } className="list-item">
          <li> { guest } </li>
          <div>
            <button onClick={() => this.toggleEditing(guest, i)} type="" className="">edit</button>
            <button onClick={() => this.removeGuestFromList(guest)} type="" className="">Remove</button>
          </div>
        </div>
      )
    })

    return (
      <div className="App">
        <h1>DevMountain Hackathon</h1>
        <h3>Guest List:</h3>
        <ul>
          { displayedGuests }
        </ul>
        <div className="add-guest">
          Add guest: <input type="" onChange={ (e) => this.handleGuestInput(e) } value={ this.state.guestInput } className=""/>
          <button onClick={ this.addGuestToList } type="" className="">Add</button>
        </div>
        {
          // This may look weird: since this.state.editing is a boolean, the && operator prevents the EditGuest component from being rendered if this.state.editing === false
          this.state.editing && <EditGuest 
            cancel={this.handleCancel} 
            edit={this.handleEditChange} 
            submit={this.handleSubmit}
            guestToEdit={this.state.guestEditInput}
          />
        }
      </div>
    );
  }
}

// The mapStateToProps function takes in an updated value of state as an argument and returns an object. The name of the property of this object will determine how we reference the data off of props, and the value is the property off of redux state that we want to put on props.
function mapStateToProps(state) {
  return {
    guestList: state.guests
  }
}

// This action creators object will take the action creators that we import and place them on props. The property name will be how we will reference the action creator on props, the value is the action creator function that is imported up top.
const actionCreators = {
  addToGuestList: addGuest,
  removeFromGuestList: removeGuest,
  editGuestName: editGuest
}

// We then export the connect function, pass in our mapStateToProps function as the first argument, our action creators as a second. connect returns another function which we then pass into our app. This is the point where our component connects to the redux store.
export default connect(mapStateToProps, actionCreators)(App);
