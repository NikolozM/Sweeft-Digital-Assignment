import { useEffect, useState } from "react";
import axios from "axios";

export default function useUserSearch(page, size) {
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
