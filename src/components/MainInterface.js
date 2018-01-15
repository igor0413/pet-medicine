import React, {Component} from 'react';

class MainInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          "petName": "Buffy",
          "ownerName": "Hassum Harrod",
          "aptDate": "2016-06-20 15:30",
          "aptNotes": "This Chihuahua has not eaten for three days and is lethargic"
        },
        {
          "petName": "Spot",
          "ownerName": "Constance Smith",
          "aptDate": "2016-06-24 08:30",
          "aptNotes": "This German Shepherd is having some back pain"
        },
        {
          "petName": "Goldie",
          "ownerName": "Barot Bellingham",
          "aptDate": "2016-06-22 15:50",
          "aptNotes": "This Goldfish has some weird spots in the belly"
        },
        {
          "petName": "Mitten",
          "ownerName": "Hillary Goldwyn",
          "aptDate": "2016-06-21 9:15",
          "aptNotes": "Cat has excessive hairballs"
        }
      ]

    }
  }

  render() {
    return (
      <div className="interface">
        <div className="item-list media-list">
          <ul className="item-list media-list">
            <li className="pet-info media-body">
              <div className="pet-head">
                <span className="pet-name">{this.state.data[0].petName}</span>
                <span className="apt-date pull-right">{this.state.data[0].aptDate}</span>
              </div>
              <div className="owner-name">
                <span className="label-item">Owner:</span>
                {this.state.data[0].ownerName}
              </div>
              <div className="apt-notes">{this.state.data[0].aptNotes}</div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MainInterface;