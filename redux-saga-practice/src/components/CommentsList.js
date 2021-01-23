import React, { Component } from "react";
import { List, Avatar, Space, Skeleton } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./CommentsList.css";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default class CommentsList extends Component {
  state = {
    limit: 5,
  };
  onLoadMore = (page) => {
    this.props.handleLoadMore((page - 1) * 25);
  };
  loadMore = () => {
    return (
      <div className="comment-more-block">
        <a
          className="comment-more-block__btn"
          onClick={() => {
            this.setState({ limit: 25 });
          }}
        >
          Xem thêm
        </a>
      </div>
    );
  };

  render() {
    let comments =
      (this.props.comments.items.items &&
        this.props.comments.items.items.slice(0, this.state.limit)) ||
      [];
    if (this.props.comments.items.items && this.state.limit >= 25) {
      let before = [];
      let i = 0;
      while (
        before.length + comments.length <
        this.props.comments.items.total
      ) {
        if (this.props.comments.offset > before.length)
          before.push(this.props.comments.items.items[i++]);
        else comments.push(this.props.comments.items.items[i++]);
        if (i == 25) i = 0;
      }
      comments = [...before, ...comments];
    }
    let userItems = this.props.comments.userItems;
    return (
      <List
        className="comments-list"
        itemLayout="vertical"
        size="large"
        loadMore={
          this.state.limit < 25 &&
          this.props.comments.items.total > this.state.limit
            ? this.loadMore()
            : null
        }
        pagination={
          this.state.limit >= 25
            ? {
                onChange: (page) => {
                  this.onLoadMore(page);
                },
                pageSize: this.state.limit,
              }
            : null
        }
        dataSource={comments}
        renderItem={(comment) => (
          <section id="cmt-list">
            <List.Item
              style={{ borderBottom: "none", paddingBottom: 0, paddingLeft: 0 }}
              key={comment.comment_id}
              actions={[
                <a className="like" rel={comment.comment_id}>
                  <IconText
                    className="total_like"
                    icon={LikeOutlined}
                    text={comment.userlike}
                    key="list-vertical-like-o"
                  />
                </a>,
                <a
                  className="reply-text"
                  rel={comment.comment_id}
                  parent={comment.comment_id}
                >
                  Trả lời
                </a>,
                <a rel={comment.comment_id} className="share">
                  Chia sẻ
                </a>,
                <span className="time_com">{comment.time}</span>,
                <a className="report_comment" rel={comment.comment_id}>
                  Vi phạm
                </a>,
              ]}
            >
              <Skeleton
                avatar
                title={false}
                loading={
                  this.props.comments.isLoading === "loadmore" ? true : false
                }
                active
              >
                <List.Item.Meta
                  avatar={
                    <div className="avatar">
                      <a className="avatar__content">
                        {comment.userid &&
                        userItems[comment.userid] &&
                        userItems[comment.userid].user_avatar !==
                          "https://s.vnecdn.net/myvne/i/v1/graphics/img_60x60.gif" ? (
                          <Avatar
                            src={`${userItems[comment.userid].user_avatar
                              .split("src")
                              .join("c60x60")}`}
                          />
                        ) : (
                          comment.full_name.substring(0, 1).toUpperCase()
                        )}
                      </a>
                    </div>
                  }
                  title={
                    <div className="content">
                      <a className="content__username">
                        {comment.userid &&
                        userItems[comment.userid] &&
                        userItems[comment.userid].user_fullname
                          ? userItems[comment.userid].user_fullname
                          : comment.full_name}
                      </a>
                    </div>
                  }
                />

                <div className="content">
                  <p
                    className="content__comment"
                    dangerouslySetInnerHTML={{
                      __html: comment.content,
                    }}
                  />
                </div>
              </Skeleton>
            </List.Item>

            {/* show reply */}

            <div className="reply">
              {comment.replys.total && comment.replys.items.length > 0 ? (
                <List
                  itemLayout="vertical"
                  dataSource={comment.replys.items}
                  renderItem={(reply) => (
                    <List.Item
                      style={{
                        borderBottom: "none",
                        paddingBottom: 0,
                        paddingLeft: 0,
                        paddingTop: 0,
                        marginTop: 16,
                      }}
                      key={reply.comment_id}
                      actions={[
                        <a className="like" rel={reply.comment_id}>
                          <IconText
                            className="total_like"
                            icon={LikeOutlined}
                            text={reply.userlike}
                            key="list-vertical-like-o"
                          />
                        </a>,
                        <a
                          className="reply-text"
                          rel={reply.comment_id}
                          parent={reply.comment_id}
                        >
                          Trả lời
                        </a>,
                        <a rel={reply.comment_id} className="share">
                          Chia sẻ
                        </a>,
                        <span className="time_com">{reply.time}</span>,
                        <a className="report_comment" rel={reply.comment_id}>
                          Vi phạm
                        </a>,
                      ]}
                    >
                      <Skeleton
                        avatar
                        title={false}
                        loading={
                          this.props.comments.isLoading === "loadmore"
                            ? true
                            : false
                        }
                        active
                      >
                        <List.Item.Meta
                          avatar={
                            <div className="avatar">
                              <a className="avatar__content">
                                {reply.userid &&
                                userItems[reply.userid] &&
                                userItems[reply.userid].user_avatar !==
                                  "https://s.vnecdn.net/myvne/i/v1/graphics/img_60x60.gif" ? (
                                  <Avatar
                                    src={`${userItems[reply.userid].user_avatar
                                      .split("src")
                                      .join("c60x60")}`}
                                  />
                                ) : (
                                  reply.full_name.substring(0, 1).toUpperCase()
                                )}
                              </a>
                            </div>
                          }
                          title={
                            <div className="content">
                              <a className="content__username">
                                {reply.userid &&
                                userItems[reply.userid] &&
                                userItems[reply.userid].user_fullname
                                  ? userItems[reply.userid].user_fullname
                                  : reply.full_name}
                              </a>
                            </div>
                          }
                        />
                        <div className="content">
                          <p
                            className="content__comment"
                            dangerouslySetInnerHTML={{
                              __html: reply.content,
                            }}
                          />
                        </div>
                      </Skeleton>
                    </List.Item>
                  )}
                />
              ) : null}
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
                <Skeleton
                  avatar
                  title={false}
                  loading={
                    this.props.isLoading === `reply_${comment.comment_id}` ||
                    this.props.isLoading === "loadmore"
                      ? true
                      : false
                  }
                  active
                >
                  <a className="count_reply__text">
                    <span>
                      {comment.replys.total - comment.replys.items.length} trả
                      lời
                    </span>
                  </a>
                </Skeleton>
              </div>
            ) : null}
          </section>
        )}
      />
    );
  }
}
