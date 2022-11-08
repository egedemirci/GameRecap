import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameFinder from "../apis/GameFinder";
import { GameContext } from "../context/gameContext";

const UpdateGame = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { games } = useContext(GameContext);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await GameFinder.get(`/${id}`);
      console.log(response.data.data);
      setName(response.data.data.game.game_name);
      setDate(response.data.data.game.release_date);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedGame = await GameFinder.patch(`/${id}`, {
      game_name: name,
      release_date: date,
    });
    navigate("/");
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            className="form-control"
            type="date"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateGame;
