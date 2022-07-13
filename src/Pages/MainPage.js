import React, {
  useState,
  useRef,
  useCallback,
} from "react";
import { useUserSearch } from "../useUserSearch";
import { Link } from "react-router-dom";

export default function MainPage() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(28);

  const { users, hasMore, loading, error } = useUserSearch(
    page,
    size
  );

  const observer = useRef();

  const lastUserRef = useCallback(
    (node) => {
      console.log(node);
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
    <>
      <div className='media-scroller'>
        {users.map((user) =>
          user.map((name, index) => {
            if (user.length === index + 1) {
              return (
                <Link
                  key={name.id}
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
              );
            } else {
              return (
                <Link
                  key={name.id}
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
    </>
  );
}
