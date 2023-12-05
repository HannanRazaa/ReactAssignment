import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/details" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
