import React, { Component } from "react";
import "./NewPostIdForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
export default class NewPostIdForm extends Component {
  state = {
    isVisibility: "none",
    objectId: 4219024,
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
            onChange={(e) => this.setState({ objectId: e.target.value })}
            onFocus={() => {
              this.setState({ isVisibility: "block" });
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
        <div className="submit" style={{ display: this.state.isVisibility }}>
          <button className="submit__smBtn">Gửi</button>
        </div>
      </form>
    );
  }
}
