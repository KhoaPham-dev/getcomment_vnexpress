import { ListGroupItem, ListGroup } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import "./CommentsList.css";
export default class CommentsList extends Component {
  state = {
    isReachLimit: false,
  };
  onLoadMore = (flag) => {
    flag
      ? this.props.handleLoadMore(this.props.offset + 25)
      : this.props.handleLoadMore(this.props.offset - 25);
  };
  render() {
    let comments = this.props.comments.items.items || [];
    let userItems = this.props.comments.userItems;
    return (
      <ListGroup>
        <section id="cmt-list">
          {comments.map((comment, i) => {
            if (this.state.isReachLimit || i < 5)
              return (
                <ListGroupItem
                  style={{ border: "none", padding: 0 }}
                  key={comment.comment_id}
                >
                  <div className="item">
                    <div className="user">
                      <div className="avatar">
                        <a className="avatar__content">
                          {comment.userid &&
                          userItems[comment.userid] &&
                          userItems[comment.userid].user_avatar !==
                            "https://s.vnecdn.net/myvne/i/v1/graphics/img_60x60.gif" ? (
                            <img
                              src={`${userItems[comment.userid].user_avatar
                                .split("src")
                                .join("c60x60")}`}
                            />
                          ) : (
                            comment.full_name.substring(0, 1).toUpperCase()
                          )}
                        </a>
                      </div>
                      <div className="content">
                        <a className="content__username">
                          {comment.userid &&
                          userItems[comment.userid] &&
                          userItems[comment.userid].user_fullname
                            ? userItems[comment.userid].user_fullname
                            : comment.full_name}
                        </a>
                        &nbsp;
                        <span
                          className="content__comment"
                          dangerouslySetInnerHTML={{
                            __html: comment.content,
                          }}
                        />
                      </div>
                    </div>
                    <div className="behavior">
                      <a className="like" rel={comment.comment_id}>
                        <span className="like__total_like">
                          {comment.userlike}
                        </span>
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </a>
                      <a
                        className="behavior__reply"
                        rel={comment.comment_id}
                        parent={comment.comment_id}
                      >
                        Trả lời
                      </a>
                      <a rel={comment.comment_id} className="behavior__share">
                        Chia sẻ
                      </a>
                      <span className="behavior__time_com">{comment.time}</span>
                      <a
                        className="behavior__report_comment"
                        rel={comment.comment_id}
                      >
                        Vi phạm
                      </a>
                    </div>
                    {/* show reply */}
                    <div className="reply">
                      {comment.replys.total && comment.replys.items.length > 0
                        ? comment.replys.items.map((reply) => {
                            return (
                              <div
                                style={{ border: "none", padding: 0 }}
                                key={reply.comment_id}
                              >
                                <div className="item">
                                  <div className="user">
                                    <div className="avatar">
                                      <a className="avatar__content">
                                        {reply.full_name
                                          .substring(0, 1)
                                          .toUpperCase()}
                                      </a>
                                    </div>
                                    <div className="content">
                                      <a className="content__username">
                                        {reply.full_name}
                                      </a>
                                      &nbsp;
                                      <span
                                        className="content__comment"
                                        dangerouslySetInnerHTML={{
                                          __html: reply.content,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="behavior">
                                    <a className="like" rel={reply.comment_id}>
                                      <span className="like__total_like">
                                        {reply.userlike}
                                      </span>
                                      <FontAwesomeIcon icon={faThumbsUp} />
                                    </a>
                                    <a
                                      className="behavior__reply"
                                      rel={reply.comment_id}
                                      parent={reply.comment_id}
                                    >
                                      Trả lời
                                    </a>
                                    <a
                                      rel={reply.comment_id}
                                      className="behavior__share"
                                    >
                                      Chia sẻ
                                    </a>
                                    <span className="behavior__time_com">
                                      {reply.time}
                                    </span>
                                    <a
                                      className="behavior__report_comment"
                                      rel={reply.comment_id}
                                    >
                                      Vi phạm
                                    </a>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                    {comment.replys.total &&
                    comment.replys.items.length < comment.replys.total ? (
                      <div
                        className="count_reply"
                        onClick={() => {
                          this.props.handleRequestReplies(
                            comment.article_id,
                            comment.comment_id
                          );
                        }}
                      >
                        <a className="count_reply__text">
                          {this.props.isLoading ===
                          `reply_${comment.comment_id}` ? (
                            <Skeleton circle={true} height={50} width={50} />
                          ) : (
                            <span>
                              {comment.replys.total -
                                comment.replys.items.length}{" "}
                              trả lời
                            </span>
                          )}
                        </a>
                      </div>
                    ) : null}
                  </div>
                </ListGroupItem>
              );
          })}
          <div className="comment-more-block">
            {!this.state.isReachLimit ? (
              <a
                className="comment-more-block__btn"
                onClick={() => {
                  this.setState({ isReachLimit: true });
                }}
              >
                Xem thêm
              </a>
            ) : this.props.comments.isLoading === "loadmore" ? (
              <Skeleton className="comment-more-block" height={50} />
            ) : (
              <div className="route-page">
                <span>Trang</span>
                <a
                  className={`route-page__prev ${
                    Math.floor(this.props.comments.offset / 25) <= 0
                      ? "btn-unclick"
                      : null
                  }`}
                  onClick={() => {
                    if (Math.floor(this.props.comments.offset / 25) > 0) {
                      this.onLoadMore(false);
                      this.setState({ scrolling: true });
                    }
                  }}
                ></a>
                <a className="route-page__nth-page">
                  {Math.floor(this.props.comments.offset / 25) + 1}
                </a>
                <a
                  className={`route-page__next ${
                    Math.floor(
                      (this.props.comments.items.total -
                        this.props.comments.offset) /
                        25
                    ) <= 0
                      ? "btn-unclick"
                      : null
                  }`}
                  onClick={() => {
                    if (
                      Math.floor(
                        (this.props.comments.items.total -
                          this.props.comments.offset) /
                          25
                      ) > 0
                    ) {
                      this.onLoadMore(true);
                      this.setState({ scrolling: true });
                    }
                  }}
                ></a>
                {this.state.scrolling
                  ? window.scrollTo({
                      top: document.getElementById("cmt-list").offsetTop - 50,
                      behavior: "smooth",
                    }) || this.setState({ scrolling: false })
                  : null}
              </div>
            )}
          </div>
        </section>
      </ListGroup>
    );
  }
}
