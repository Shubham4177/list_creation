import React, { useState, useEffect } from 'react';
import ListsView from './components/ListsView';
import ListCreationView from './components/ListCreationView';
import Loader from './components/Loader';
import FailureView from './components/FailureView';
import './App.css';
import { fetchListsApi } from './utils/api';

const App = () => {
  const [apiStatus, setApiStatus] = useState('loading'); 
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [listsData, setListsData] = useState([]);

  useEffect(() => {
    fetchLists(); 
  }, []); 

  const renderContent = () => {
    if (apiStatus === 'loading') {
      return <Loader />;
    }
    if (apiStatus === 'failure') {
      return <FailureView onRetry={fetchLists} />;
    }
    if (isCreatingList) {
      return <ListCreationView />;
    }
    return <ListsView onCreateList={() => setIsCreatingList(true)} listsData={listsData} />;
  };

  const fetchLists = async () => {
    setApiStatus('loading');
    try {
      const data = await fetchListsApi();
      console.log('API Response:', data.lists);  
      setListsData(data.lists || []); 
      setApiStatus('success');
    } catch (error) {
      console.error('Error fetching lists:', error);
      setApiStatus('failure');
    }
  };
  

  return (
    <div className="app-container">
      {renderContent()}
    </div>
  );
};

export default App;
