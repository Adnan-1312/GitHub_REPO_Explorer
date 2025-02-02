import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import './repoCard.css';

const RepoCard = ({ repos }) => {
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleShowDetails = (repo) => {
    setSelectedRepo(repo);
  };

  const handleCloseDetails = () => {
    setSelectedRepo(null);
  };
  

  return (
    <div id='repoList'>
      {repos && repos.map((repo) => (
        <div key={repo.id} className="repo-card">
          <h2 className="repo-name">{repo.repo_name}</h2>
          <p className="repo-owner">Owner: {repo.repo_name}</p>
          <p id='repoDesc' className="repo-description">
            {repo.description ? `Description: ${repo.description}` : ""}
          </p>
          <div className="repo-stats">
            <span className="stars">⭐ {repo.stars}</span>
            <span className="forks">🍴 {repo.forks}</span>
            <span className="language">{repo.primary_language}</span>
          </div>
          <button className="details-btn" onClick={() => handleShowDetails(repo)}>
            Show Details
          </button>
        </div>
      ))}

      {selectedRepo && (
        <Modal isOpen={Boolean(selectedRepo)} onClose={handleCloseDetails}>
          <h2>{selectedRepo.repo_name}</h2>
          <p>{selectedRepo.description}</p>
          <ul>
            <li>Primary language: {selectedRepo.primary_language ? `Primary language: ${selectedRepo.primary_language}` : ""}</li>
            <li>Total score: {selectedRepo.total_score}</li>
            <li>Contributers logins: {selectedRepo.contributor_logins}</li>
            {/* Add more details as needed */}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default RepoCard;
