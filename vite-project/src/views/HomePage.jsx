
import React, { useState } from "react";

const pages = {
  home: 0,
  game: 1,
};

export default function HomePage({ setPage, setPlayer }) {
    const [name, setName] = useState("");

    function isNameValid() {
    console.log(name);
    return name !== "";
}

  function createPlayer() {
    return {
      name: name,
    };
  }

  function startGame() {
    const isValid = isNameValid();

    if (!isValid) {
      alert("Hi user, you must provide a name!");
      return;
    }

    const player = createPlayer();
    setPlayer(player);
    setPage(pages.game);
  }

  return (
    <>
      <span>
        <label htmlFor="">Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </span>
      <button onClick={startGame}>Start game!</button>
    </>
  );
}