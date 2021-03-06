import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Desafio ${Date.now()}`,
      url: `http://github.com/phmts/${Date.now()}`,
      techs: ["Node.js", "ReactJS", "ReactNative"],
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <div key={repository.id}>
              <li>{repository.title}</li>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </div>
          );
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>{" "}
    </div>
  );
}

export default App;
