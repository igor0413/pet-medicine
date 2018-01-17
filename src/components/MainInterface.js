import React, {Component} from 'react';
import AptList from './AptList'
import lodash from 'lodash';
import AddAppointment from './AddAppointment'
import SearchAppointments from './SearchAppointments'
import myData from '../assets/data'

class MainInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aptBodyVisible: false,
      orderBy: 'petName',
      orderDir: 'asc',
      queryText: '',
      myAppointments: []
    }
  }

  componentDidMount() {
    this.setState({
      myAppointments: myData
    });
    // this.serverRequest = $.get('./dist/data.json', result => {
    //   let tempApts;
    //   tempApts = result;
    //   this.setState({
    //     myAppointments: tempApts
    //   });
    // })
  }

  // componentWillUnmount() {
  //   this.serverRequest.abort();
  // }

  deleteMessage(item) {
    let allApts = this.state.myAppointments;
    let newApts = lodash.without(allApts, item);
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

  reOrder(orderBy, orderDir) {
    this.setState({
      orderBy,
      orderDir
    })
  }

  onSearchApts(q) {
    this.setState({
      queryText: q
    })
  }

  render() {
    let orderDir = this.state.orderDir
    let orderBy = this.state.orderBy
    let filteredApts = []
    let queryText = this.state.queryText
    let myAppointments = this.state.myAppointments

    myAppointments.forEach(function(item) {
      if(
        (item.petName.toLowerCase().indexOf(queryText)!==-1) ||
        (item.ownerName.toLowerCase().indexOf(queryText)!==-1) ||
        (item.aptDate.toLowerCase().indexOf(queryText)!==-1) ||
        (item.aptNotes.toLowerCase().indexOf(queryText)!==-1)
      ) {
        filteredApts.push(item);
      }
    });

    filteredApts = lodash.orderBy(filteredApts, (item) => {
      return item[orderBy].toLowerCase()
    }, orderDir)
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
        <SearchAppointments orderBy={this.state.orderBy}
                            orderDir={this.state.orderDir}
                            onReOrder={this.reOrder.bind(this)}
                            onSearch={this.onSearchApts.bind(this)}
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
