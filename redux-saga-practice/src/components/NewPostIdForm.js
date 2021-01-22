import React, { Component } from "react";
import "./NewPostIdForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
export default class NewPostIdForm extends Component {
  state = {
    objectId: 4224611,
  };
  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onSubmitPostId(this.state.objectId);
        }}
      >
        <div className="input">
          <input
            style={
              this.props.isVisibility === "block"
                ? { padding: "10px 0px 56px 10px", height: "101px" }
                : { padding: "10px 0px 10px 10px", height: "55px" }
            }
            onChange={(e) => this.setState({ objectId: e.target.value })}
            onFocus={() => {
              this.props.handleToggleOn();
            }}
            className="input__inputElement"
            placeholder="Ý kiến của bạn"
          />
          <FontAwesomeIcon
            icon={faSmile}
            color="grey"
            className="input__icon"
          />
        </div>
        <div className="submit" style={{ display: this.props.isVisibility }}>
          <button className="submit__smBtn">Gửi</button>
        </div>
      </form>
    );
  }
}
