import React, {Component} from 'react';
import AptList from './AptList'
import { without } from 'lodash';
import AddAppointment from './AddAppointment'

class MainInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aptBodyVisible: false,
      myAppointments: []
    }
  }

  componentDidMount() {
    this.serverRequest = $.get('./dist/data.json', result => {
      let tempApts;
      tempApts = result;
      this.setState({
        myAppointments: tempApts
      });
    })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  deleteMessage(item) {
    let allApts = this.state.myAppointments;
    let newApts = without(allApts, item);
    this.setState({
      myAppointments: newApts
    });
  }

  toggleAddDisplay() {
    let tempVisibility = !this.state.aptBodyVisible
    this.setState({
      aptBodyVisible: tempVisibility
    })
  }

  addItem(tempItem) {
    let tempApts = this.state.myAppointments
    tempApts.push(tempItem)
    this.setState({
      myAppointments: tempApts
    })
  }

  render() {
    let filteredApts = this.state.myAppointments;
    filteredApts = filteredApts.map((item, index) => {
      return (
        <AptList key={index} singleItem = {item} whichItem={item} onDelete={this.deleteMessage.bind(this)}/>
      )
    })
    return (
      <div className="interface">
        <AddAppointment bodyVisible={this.state.aptBodyVisible}
                        handleToggle={this.toggleAddDisplay.bind(this)}
                        addApt = {this.addItem.bind(this)}
        />
        <div className="item-list media-list">
          <ul className="item-list media-list">
            {filteredApts}
          </ul>
        </div>
      </div>
    );
  }
}

export default MainInterface;
