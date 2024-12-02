import React, { useState } from 'react';
import axios from 'axios';
import './Header.css';
import logo from '../logo_Poliadvisor2.png';
import { Route, Link, Routes, useLocation } from 'react-router-dom';

const Header = ({}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();
  const { hash, pathname, search } = location;

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    if (searchValue.length > 1) {
      try {
        const response = await axios.get(`/api/search/?q=${searchValue}`);
        const departmentSuggestions = response.data.departments.map((dept) => ({
          id: `dept-${dept.id}`,
          label: `${dept.department_name} (${dept.department_code})`,
        }));
        const disciplineSuggestions = response.data.disciplines.map((disc) => ({
          id: `${disc.id}`,
          label: `${disc.name} (${disc.discipline_code})`,
        }));

        setSuggestions([...departmentSuggestions, ...disciplineSuggestions]);
        setDropdownVisible(true);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setSuggestions([]);
        setDropdownVisible(false);
      }
    } else {
      setSuggestions([]);
      setDropdownVisible(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion.label);
    setSuggestions([]);
    setDropdownVisible(false);
  };

  let login;
  if (pathname === "/LoginPage") {
    login = false;
  } else {
    login = true;
  }

  let home;
  if (pathname === "/") {
    home = true;
  } else {
    home = false;
  }

  let login;
  if (pathname === "/LoginPage") {
    login = true;
  } else if (pathname === "/ForgotPassword") {
    login = true;
  } else if (pathname === "/NewPassword"){
    login = true;
  } else if (pathname === "/AlreadySendFP"){
    login = true;
  } else {
    login = false;
  }

  const id = "";
  let logged;
  if (id === "") {
    logged = false;
  } else {
    logged = true;
  }

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Poli Advisor" className="logo-image" />
        <a href="/"  id="logo-button" className="button-Logo"><h1>Poli Advisor</h1></a>
      </div>
      {login ? (
        <div>

        </div>
      ) : (
        <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Pesquisar disciplinas"
          value={query}
          onChange={handleSearch}
          onFocus={() => setDropdownVisible(suggestions.length > 0)}
          onBlur={() => setTimeout(() => setDropdownVisible(false), 200)} // Para permitir clicar na sugestão
        />
        <button className="search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        {isDropdownVisible && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => (window.location.href = '/discipline/' + suggestion.id)}
                className="suggestion-item"
              >
                {suggestion.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      )}
      {login? (
      <div>
        
      </div>
      ) : (
        <div>

        </div>
      )}
      
      {logged ? (
        <div className="perfil">
          Fulano De Tal
          <img src={logo} alt="Poli Advisor" className="perfil-image" />
        </div>
      ) : ( 
        <div className="login-button">
        <button onClick={() => (window.location.href = '/LoginPage')} className="login">
          Entrar</button>
          </div>
      )}
    </header>
  );
};

export default Header;
