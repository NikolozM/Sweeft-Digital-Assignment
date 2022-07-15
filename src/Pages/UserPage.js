import React, {
  useState,
  useRef,
  useCallback,
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

  const us = [user?.name];

  const [friendLinks, setFriendLinks] = useState([us]);

  console.log(user.name);

  function addFriendLink(user) {
    setFriendLinks((prev) => [
      ...prev,
      <Link to={`/UserPage/${user.id}`}>
        <span onClick={() => {changeUserId(user.id) ; setFriends()}}>
          {user.prefix} {user.name} {user.lastName} {" "}&gt;
        </span>
      </Link>,
    ]);
  }

  function changeUserId(id) {
    setUserId(id);
  }

  const [pages, setPages] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [size, setSize] = useState(20);

  const {
    userFriends,
    setUserFriends,
    hasMore,
    loading,
    error,
  } = useUserFriendsSearch(userId, pages, size);

  function setFriends() {
    setUserFriends([]);
  }

  const observer = useRef();

  const lastUserRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPages((prevPage) => prevPage + 1);
          }
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div
      style={{
        maxWidth: "1200px",
        border: "1px solid #ccc",
        margin: "0 auto",
      }}
    >
      <div>
        <User user={user} />
      </div>

      <div style={{marginLeft:"20px"}}>{friendLinks.map((user) => user)}</div>

      <h2 style={{ marginLeft: "10px" }}>Friends:</h2>

      <div className='media-scroller'>
        {userFriends.map((user) =>
          user.map((name, index) => {
            if (user.length === index + 1) {
              return (
                <div
                  key={name.id}
                  onClick={() => {
                    changeUserId(name.id);
                    addFriendLink(name);
                    setFriends();
                  }}
                >
                  <Link
                    className='link column'
                    to={`/UserPage/${name.id}`}
                  >
                    <img
                      src={name.imageUrl + `?q=${name.id}`}
                      alt=''
                    ></img>
                    <strong>
                      <span ref={lastUserRef}>
                        {name.prefix}.{name.name}{" "}
                        {name.lastName}
                      </span>
                    </strong>
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
                    addFriendLink(name);
                  }}
                >
                  <Link
                    className='link column'
                    to={`/UserPage/${name.id}`}
                  >
                    <img
                      src={name.imageUrl + `?q=${name.id}`}
                      alt=''
                    ></img>
                    <strong>
                      <span>
                        {name.prefix} {name.name}{" "}
                        {name.lastName}
                      </span>
                    </strong>
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
