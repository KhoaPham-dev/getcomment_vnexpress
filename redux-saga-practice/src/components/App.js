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
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibility: "none",
      isLoading: true,
    };
    this.props.getCommentsRequest({
      objectId: this.props.comments.objectId,
      offset: this.props.comments.offset,
      sort: this.props.comments.sort,
    });
  }
  handleRequestReplies = (article_id, comment_id) => {
    let index = this.props.comments.items.items.findIndex((e) => {
      return e.comment_id === comment_id;
    });
    let currLimit = this.props.comments.items.items[index].replys.items.length;
    this.props.getRepliesRequest({
      objectId: article_id,
      commentId: Number(comment_id),
      limit: currLimit + 12,
      sort: this.props.comments.sort,
    });
  };
  handleSorting = (typeSort) => {
    this.props.handleSorting({
      objectId: this.props.comments.objectId,
      offset: 0,
      sort: typeSort,
    });
  };
  onSubmitPostId = (objectId) => {
    this.props.getCommentsRequest({
      objectId,
      offset: 0,
      sort: this.props.comments.sort,
    });
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
  handleLoadMore = (offset) => {
    this.props.getCommentsRequest({
      objectId: this.props.comments.objectId,
      offset,
      forWhat: "loadmore",
      sort: this.props.comments.sort,
    });
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
          {this.props.comments.items.items ? (
            <div className="total-item">
              <span className="total-item__total">
                Ý kiến ({this.props.comments.items.totalitem})
              </span>
            </div>
          ) : null}
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
              offset={this.props.comments.offset}
              handleLoadMore={this.handleLoadMore}
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
