import React, { Component } from "react";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { Alert } from "reactstrap";
import {
  getCommentsRequest,
  getRepliesRequest,
  handleSorting,
  handleError,
} from "../actions/comments";
import CommentsList from "./CommentsList";
import Sort from "./Sort";
import NewPostIdForm from "./NewPostIdForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibility: "none",
      isLoading: true,
    };
    this.props.getCommentsRequest({ objectId: this.props.comments.objectId });
  }
  handleRequestReplies = (article_id, comment_id) => {
    this.props.getRepliesRequest({
      objectId: article_id,
      commentId: Number(comment_id),
    });
  };
  handleSorting = (typeSort) => {
    this.props.handleSorting(typeSort);
    this.props.getCommentsRequest({ objectId: this.props.comments.objectId });
  };
  onSubmitPostId = (objectId) => {
    this.props.getCommentsRequest({ objectId });
  };
  handleToggleUIInputField = (e) => {
    let currentNode = e.target;
    let flag = false;
    while (currentNode) {
      if (currentNode === document.querySelector("form")) {
        flag = true;
        break;
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    if (!flag) this.setState({ isVisibility: "none" });
  };
  handleToggleOnUIInputField = () => {
    this.setState({ isVisibility: "block" });
  };
  handleCloseAlert = () => {
    this.props.handleError({ error: "" });
  };
  render() {
    let comments = this.props.comments;
    return (
      <div style={{ width: "100%" }} onClick={this.handleToggleUIInputField}>
        <div style={{ maxWidth: "1130px", margin: "0 auto" }}>
          <Alert
            style={{ maxWidth: "calc(100% - 365px)" }}
            isOpen={!!this.props.comments.error}
            color="danger"
            toggle={this.handleCloseAlert}
          >
            {this.props.comments.error}
          </Alert>
          <NewPostIdForm
            onSubmitPostId={this.onSubmitPostId}
            handleToggleOn={this.handleToggleOnUIInputField}
            isVisibility={this.state.isVisibility}
          />
          <Sort sorting={comments.sort} handleSorting={this.handleSorting} />
          {this.props.comments.isLoading === true ? (
            <Skeleton height={500} />
          ) : (
            <CommentsList
              comments={comments}
              handleRequestReplies={this.handleRequestReplies}
              isLoading={this.props.comments.isLoading}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(({ comments }) => ({ comments }), {
  getCommentsRequest,
  getRepliesRequest,
  handleSorting,
  handleError,
})(App);
