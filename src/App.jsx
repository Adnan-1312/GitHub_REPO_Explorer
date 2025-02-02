import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import SearchSort from './Component/SearchSort/SearchSort';
import RepoList from './Component/RepoList/RepoList';
import RepoCard from './Component/RepoCard/Repocard';

const App = () => {
  const [repos, setRepos] = useState([]);
  const [theme, setTheme] = useState('light');

  const fetchData = async () => {
    await fetch('https://api.ossinsight.io/v1/trends/repos/')
      .then(response => response.json())
      .then(data => setRepos(data.data.rows))
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReposUpdate = (updatedRepos) => {
    setRepos(updatedRepos);
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
  };

  return (
    <Router>
      <div className={`container ${theme}`}>
        <Header />
        <SearchSort 
          onReposUpdate={handleReposUpdate} 
          onThemeChange={handleThemeChange} 
        />
          <RepoCard repos={repos.length ? repos : []} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
