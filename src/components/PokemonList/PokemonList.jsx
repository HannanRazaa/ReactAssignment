import React, { useState } from "react";
import { useApollo } from "../../contexts/ApolloContext";
import { useNavigate } from "react-router-dom";
import "./PokemonList.css";

function PokemonList() {
  const { apiData } = useApollo();
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 50;

  const allPokemonData = apiData?.getAllPokemon || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndPaginatedPokemonData = allPokemonData
    .filter((pokemon) =>
      pokemon.species.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalPages = Math.ceil(allPokemonData.length / ITEMS_PER_PAGE);

  const handleViewDetails = (species) => {
    navigate("/details", { state: { species } });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="main">
        <h1>Pokemon</h1>
      </div>
      <div className="main">
        <input
          type="text"
          placeholder="Search by species name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="pokemon-container">
        {filteredAndPaginatedPokemonData.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <h2>{pokemon.name}</h2>
            <img
              src={pokemon.sprite}
              className="pokemon-image"
              alt={pokemon.species}
            />
            <p>{pokemon.species}</p>
            <button
              className="button"
              onClick={() => handleViewDetails(pokemon.species)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
        )}
        <button className="pagination-button active">{currentPage}</button>
        {currentPage < totalPages && (
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default PokemonList;
