import React, { useState, useEffect } from "react";
import User from "./components/User";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/posts")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, []);
  return (
    <div className="App">
      <h2> See Posts</h2>
      <div className="user-container">
        {data.map((u) => (
          <User key={u.id} data={u} />
        ))}
      </div>
    </div>
  );
}

export default App;
