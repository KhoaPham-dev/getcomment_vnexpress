import axios from "axios";
import { result, replies } from "./data";

export const getComments = ({ objectId }) => {
  return axios.get("get", {
    params: {
      limit: 100,
      siteid: 1000000,
      objecttype: 1,
      objectid: objectId,
    },
  });
  //return result;
};
export const getReplies = ({ objectId, commentId }) => {
  return axios.get("getreplay", {
    params: {
      limit: 100,
      siteid: 1000000,
      objecttype: 1,
      objectid: objectId,
      id: commentId,
    },
  });
  //return replies;
};
