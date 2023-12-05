import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApollo } from "../../contexts/ApolloContext";
import "./PokemonDetail.css";

function PokemonDetail() {
  const { apiData } = useApollo();
  const { state } = useLocation();
  const navigate = useNavigate();
  const species = state.species;

  const filteredData = (apiData?.getAllPokemon || []).filter(
    (pokemon) => pokemon.species === species
  );

  const handleHome = () => {
    navigate("/");
  };

  return (
    <>
      {filteredData.map((pokemon, index) => (
        <div className="detail" key={index}>
          <img src={pokemon.sprite} alt={pokemon.species} />
          <div>{pokemon.species}</div>
        </div>
      ))}

      <div className="pokemonDetails">
        {filteredData.map((pokemon, index) => (
          <div key={index}>
            <div className="left">
              <div>Height : {pokemon.height} m</div>
              <div>Weight : {pokemon.weight} kg</div>
              <div>Color : {pokemon.color} </div>
            </div>
            <div className="middle">
              <div>Speed : {pokemon.baseStats.speed} </div>
              <div>Attack : {pokemon.baseStats.attack} </div>
              <div>Defense : {pokemon.baseStats.defense} </div>
            </div>
            <div className="right">
              <div>Type : {pokemon.types[0].name} </div>
              <div>Ability : {pokemon.abilities.first.name} </div>
              <div>Legendary : {pokemon.legendary ? "Yes" : "No"} </div>
            </div>
          </div>
        ))}
      </div>
      <div className="center-container">
        <button className="button" onClick={handleHome}>
          Home
        </button>
      </div>
    </>
  );
}

export default PokemonDetail;
