// Component/RepoList/RepoList.js
import React from 'react';
import { Link } from 'react-router-dom';
import RepoCard from '../RepoCard/RepoCard';

const RepoList = ({ repos }) => {
  
  return (
    <div className="repo-list">
      {repos.map(repo => (
          <RepoCard repo={repo} />
      ))}
    </div>
  );
};

export default RepoList;
