import { useEffect, useState } from "react";
import axios from "axios";

export function useUserSearch(page, size) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      cancelToken: new axios.CancelToken(
        (c) => (cancel = c)
      ),
      url: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${size}`,
    })
      .then((res) => {
        setUsers((prevUsers) => {
          return [
            ...new Set([
              ...prevUsers,
              res.data.list.map((user) => user),
            ]),
          ];
        });
        setHasMore(res.data.list.length > 0);
        setLoading(false);
        console.log(users);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [page]);
  return { loading, error, users, hasMore };
}

// one user search

export function useUserInfo(id) {
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setError(false);
    let cancel;
    axios({
      method: "GET",
      cancelToken: new axios.CancelToken(
        (c) => (cancel = c)
      ),
      url: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`,
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [id]);
  return { error, user };
}

// userFriends data

export function useUserFriendsSearch(id, page, size) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userFriends, setUserFriends] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      cancelToken: new axios.CancelToken(
        (c) => (cancel = c)
      ),
      url: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/${size}`,
    })
      .then((res) => {
        setUserFriends((prevUserFriends) => {
          return [
            ...new Set([
              ...prevUserFriends,
              res.data.list.map((user) => user),
            ]),
          ];
        });
        setHasMore(res.data.list.length > 0);
        setLoading(false);
        console.log("daaaaaaadadadaa");
        console.log(res.data.pagination.total);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [id, page]);
  return {
    loading,
    error,
    userFriends,
    hasMore,
    setUserFriends,
  };
}
