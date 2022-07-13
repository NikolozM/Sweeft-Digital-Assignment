import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useParams, Link } from "react-router-dom";
import {
  useUserInfo,
  useUserFriendsSearch,
} from "../useUserSearch";
import User from "..//components/User";

export default function UserPage() {
  const { id } = useParams();
  const [userId, setUserId] = useState(id);

  const { user } = useUserInfo(userId);

  function changeUserId(id) {
    setUserId(id);
  }

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(28);

  const {
    userFriends,
    setUserFriends,
    hasMore,
    loading,
    error,
  } = useUserFriendsSearch(userId, page, size);

  function setFriends() {
    setUserFriends([]);
    console.log(userFriends.length);
  }

  const observer = useRef();

  const lastUserRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            console.log(hasMore);
            setPage((prevPage) => prevPage + 1);
          }
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <div>
        <User user={user} />
      </div>

      <div className='media-scroller'>
        {userFriends.map((user) =>
          user.map((name, index) => {
            if (user.length === index + 1) {
              return (
                <div
                  key={name.id}
                  onClick={() => changeUserId(name.id)}
                >
                  <Link
                    className='link column'
                    to={`/UserPage/${name.id}`}
                  >
                    <img src={name.imageUrl} alt=''></img>
                    <span ref={lastUserRef}>
                      {name.prefix}.{name.name}{" "}
                      {name.lastName}
                    </span>
                    <p>{name.title}</p>
                  </Link>
                </div>
              );
            } else {
              return (
                <div
                  key={name.id}
                  onClick={() => {
                    setFriends();
                    changeUserId(name.id);
                  }}
                >
                  <Link
                    className='link column'
                    to={`/UserPage/${name.id}`}
                  >
                    <img src={name.imageUrl} alt=''></img>
                    <span>
                      {name.prefix} {name.name}{" "}
                      {name.lastName}
                    </span>
                    <p>{name.title}</p>
                  </Link>
                </div>
              );
            }
          })
        )}
      </div>

      {loading && (
        <div className='center'>
          <div className='wave'></div>
          <div className='wave'></div>
          <div className='wave'></div>
          <div className='wave'></div>
          <div className='wave'></div>
          <div className='wave'></div>
        </div>
      )}

      <div>{error && "Error"}</div>
    </div>
  );
}
