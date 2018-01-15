import React, {Component} from 'react';
import AptList from './AptList'
import { without } from 'lodash';

class MainInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    let filteredApts = this.state.myAppointments;
    filteredApts = filteredApts.map((item, index) => {
      return (
        <AptList key={index} singleItem = {item} whichItem={item} onDelete={this.deleteMessage.bind(this)}/>
      )
    })
    return (
      <div className="interface">
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
