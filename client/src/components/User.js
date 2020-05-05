import React from "react";

const User = ({ data }) => {
  const { contents, title } = data;
  return (
    <div className="User">
      <h3>{title}</h3>
      <p>{contents}</p>
    </div>
  );
};

export default User;
