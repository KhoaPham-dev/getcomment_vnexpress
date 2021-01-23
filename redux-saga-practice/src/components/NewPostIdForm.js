import React, { Component } from "react";
import "./NewPostIdForm.css";
import { Form, Button, Input } from "antd";
import { SmileOutlined } from "@ant-design/icons";

export default class NewPostIdForm extends Component {
  state = {
    objectId: 4224611,
  };
  render() {
    return (
      <Form
        onFinish={() => {
          this.props.onSubmitPostId(this.state.objectId);
        }}
      >
        <Form.Item className="input">
          <Input
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
          <SmileOutlined style={{ color: "grey" }} className="input__icon" />
        </Form.Item>
        <Form.Item
          className="submit"
          style={{ display: this.props.isVisibility }}
        >
          <Button type="primary" htmlType="submit" className="submit__smBtn">
            Gửi
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
