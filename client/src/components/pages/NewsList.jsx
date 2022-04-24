import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_ALL_NEWS } from "../../gql/queries/getAllNews";

import "../../static/css/news.css";

function NewsList() {
  const [news, setNews] = useState([]);
  const { loading } = useQuery(GET_ALL_NEWS, {
    onCompleted: (data) => {
      setNews(data.getAllNews);
    },
  });
  return (
    <>
      <h2 className="mb-2">Новости</h2>
      {news.map((n, idx) => {
        return (
          <div className="about_news mt-2" key={idx}>
            <h3 className="title">{n.title}</h3>
            <div className="author">
              <p className="label">Автор:</p>
              <p>{n.user.firstName} {n.user.lastName}</p>
            </div>
            <div className="article">
              <div className="text">
                <p>
                  {n.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default NewsList;
