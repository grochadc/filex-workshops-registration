import React from "react";

const TeacherSelector: React.FC<any> = () => {
  const setUrl = (teacher) => {
    const href = window.location.href;
    window.location.href = `${href.substr(
      0,
      href.lastIndexOf("/")
    )}/dashboard?teacher=${teacher}`;
  };
  const buttonStyles = {
    margin: "10px",
    backgroundColor: "Transparent",
    backgroundRepeat: "no-repeat",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
    textDecoration: "underline",
  };
  return (
    <div>
      <h3>Choose your name:</h3>
      <button style={buttonStyles} onClick={() => setUrl("alondra")}>
        Alondra
      </button>
      <br />
      <button style={buttonStyles} onClick={() => setUrl("carlos")}>
        Carlos
      </button>
      <br />
      <button style={buttonStyles} onClick={() => setUrl("jiselaine")}>
        Jiselaine
      </button>
      <br />
      <button style={buttonStyles} onClick={() => setUrl("zullet")}>
        Zullet
      </button>
      <br />
      <button style={buttonStyles} onClick={() => setUrl("sergio")}>
        Sergio
      </button>
      <br />
      <button style={buttonStyles} onClick={() => setUrl("gissel")}>
        Gissel
      </button>
      <br />
      <button style={buttonStyles} onClick={() => setUrl("gonzalo")}>
        Gonzalo
      </button>
      <br />
    </div>
  );
};

export default TeacherSelector;
