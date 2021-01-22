import axios from "axios";
import { result, replies } from "./data";
import { userProfiles } from "./userProfiles";
export const getComments = ({ objectId, offset, sort }) => {
  return axios.get("get", {
    params: {
      limit: 25,
      offset,
      siteid: 1000000,
      objecttype: 1,
      objectid: objectId,
      sort_by: sort,
    },
    onDownloadProgress: (progressEvent) => {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(progressEvent.lengthComputable);
      console.log(percentCompleted);
    },
  });
  //return result;
};

export const getUserProfiles = (items) => {
  let url =
    "https://cors-anywhere.herokuapp.com/https://my.vnexpress.net/apifrontend/getusersprofile?";
  items.forEach((e) => {
    if (e.userid) url += "myvne_users_id[]=" + e.userid + "&";
  });
  return axios.get(url);
  //return userProfiles;
};

export const getReplies = ({ objectId, commentId, limit, sort }) => {
  return axios.get("getreplay", {
    params: {
      limit: limit,
      siteid: 1000000,
      objecttype: 1,
      objectid: objectId,
      id: commentId,
      sort_by: sort,
    },
  });
  //return replies;
};
