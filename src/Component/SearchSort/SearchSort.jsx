import React, { useState, useEffect } from 'react';
import './SearchSort.css';

const SearchSort = ({ onReposUpdate, onThemeChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('stars');
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('JavaScript');

  useEffect(() => {
    fetchRepos();
  }, [searchTerm, sortType, language]);

  const fetchRepos = () => {
    fetch('https://api.ossinsight.io/v1/trends/repos/')
      .then(response => response.json())
      .then(data => {
        const filteredRepos = data.data.rows
          .filter(repo => repo.primary_language && repo.primary_language.includes(language))
          .filter(repo => repo.repo_name.toLowerCase().includes(searchTerm.toLowerCase()))
          .sort((a, b) => sortType === 'stars' ? b.stars - a.stars : b.forks - a.forks);
        onReposUpdate(filteredRepos);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleSearch = () => {
    fetchRepos();
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
    fetchRepos();
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    onThemeChange(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    fetchRepos();
  };

  return (
    <div className="search-sort-theme">
      <div className="search_Box">
        <input
          className="search_Bar"
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search_Btn" onClick={handleSearch}>Search</button>
      </div>
      <div className='Search-button1'>
        <select value={sortType} onChange={handleSortChange} className='sort-btn'>
          <option value="stars">Sort by Stars</option>
          <option value="forks">Sort by Forks</option>
        </select>
      </div>
      <div className='Search-button2'>
        <select value={theme} onChange={handleThemeChange} className='them-btn'>
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
        </select>
      </div>
      <div className='Search-button3'>
        <select value={language} onChange={handleLanguageChange} className='language-btn'>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="Ruby">Ruby</option>
          <option value="PHP">PHP</option>
          <option value="C++">C++</option>
          <option value="TypeScript">TypeScript</option>
          {/* Add more languages as needed */}
        </select>
      </div>
    </div>
  );
};

export default SearchSort;
