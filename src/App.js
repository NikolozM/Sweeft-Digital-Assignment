import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import User from "../src/components/User";
import useUserSearch from "./useUserSearch";

function App() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(28);
  const [more,setMore] = useState(true);

  const { users, hasMore, loading, error } = useUserSearch(
    page,
    size
  );

  const observer = useRef();

  const lastUserRef = useCallback(
    (node) => {
        console.log(node)
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && more) {
            console.log('visible')
            setPage((prevPage) => prevPage + 1);
          }else{
            setPage((prevPage) => prevPage)
          }
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, more]
  );

  return (
    <>
      <div className="media-scroller">
        {users.map((user) =>
          user.map((name, index) => {
            if (name.id === 1000){
                setMore(false)
            }
            if (user.length === index + 1) {
              return (
                <div className="column">
                  <img
                    src={name.imageUrl}
                    alt=''
                  ></img>
                  <span ref={lastUserRef}>{name.prefix}.{name.name} {name.lastName}</span>
                  <p>{name.title}</p>
                </div>
              );
            } else {
              return (
                <div className="column">
                  <img
                    src={name.imageUrl}
                    alt=''
                  ></img>
                  <span>{name.prefix} {name.name} {name.lastName}</span>
                  <p>{name.title}</p>
                </div>
              );
            }
          })
        )}
      </div>

      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </>
  );
}

export default App;
