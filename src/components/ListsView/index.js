import React, { useState, useEffect } from 'react';
import './styles.css';

const ListsView = ({ listsData, onCreateList }) => {
  const [lists, setLists] = useState([]);
  const [selectedLists, setSelectedLists] = useState([false, false]);
  const [showError, setShowError] = useState(false);
  const [list1Data, setList1Data] = useState([]);
const [list2Data, setList2Data] = useState([]);
const [newList, setNewList] = useState([]);
const [isCreatingNewList, setIsCreatingNewList] = useState(false);


  useEffect(() => {
    const list1 = listsData.filter(item => item.list_number === 1);
    const list2 = listsData.filter(item => item.list_number === 2);
    
    setLists([list1, list2]);
  }, [listsData]);

  const handleCheckboxChange = (index) => {
    const newSelectedLists = [...selectedLists];
    newSelectedLists[index] = !newSelectedLists[index];
    setSelectedLists(newSelectedLists);
  };

  const handleCreateListClick = () => {
    if (selectedLists.filter(item => item).length === 2) {
      setShowError(false);
  
      const selectedIndexes = selectedLists
        .map((isSelected, index) => isSelected ? index : -1)
        .filter(index => index !== -1);
  
      setList1Data([...lists[selectedIndexes[0]]]);
      setList2Data([...lists[selectedIndexes[1]]]);
      setNewList([]);
      setIsCreatingNewList(true);
    } else {
      setShowError(true);
    }
  };
  const handleCancel = () => {
    setIsCreatingNewList(false);
  };
  const moveItem = (sourceList, setSourceList, targetList, setTargetList, item) => {
    setSourceList(prev => prev.filter(i => i.id !== item.id));
    setTargetList(prev => [item,...prev]);
  };
  
  const handleUpdate = () => {
    setLists(prev => [...prev, newList]);
    setSelectedLists(prev => [...prev, false]);
    setIsCreatingNewList(false);
  };

  return (
    <div>
      {!isCreatingNewList ? (
        <>
          <div className="lists-view-header">
            <h1>List Creation</h1>
            <button className="create-list-button" onClick={handleCreateListClick}>
              Create a new list
            </button>
          </div>
  
          {showError && (
            <div className="error-message">
              You must select exactly two lists to create a new list.
            </div>
          )}
  
          <div className="lists-wrapper">
            {lists.map((list, index) => (
              <div key={index} className="list-container">
                <div className="list-header">
                  <input
                    type="checkbox"
                    checked={selectedLists[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <h3>List {index + 1}</h3>
                </div>
                <div className="list-scrollable">
                  {list.map(item => (
                    <div key={item.id} className="list-card">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="lists-view-header">
            <h1>List Creation</h1>
            <div className="lists-view-sub-header">
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            <button className="update-button" onClick={handleUpdate}>Update</button>
            </div>
          </div>
  
          <div className="lists-wrapper">
            <div className="list-container">
              <div className="list-header">
                <h3>List 1</h3>
              </div>
              <div className="list-scrollable">
                {list1Data.map(item => (
                  <div key={item.id} className="list-card">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <button onClick={() => moveItem(list1Data, setList1Data, newList, setNewList, item)}>➡️</button>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="list-container">
              <div className="list-header">
                <h3>New List</h3>
              </div>
              <div className="list-scrollable">
                {newList.map(item => (
                  <div key={item.id} className="list-card">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <button onClick={() => moveItem(newList, setNewList, list1Data, setList1Data, item)}>⬅️</button>
                    <button onClick={() => moveItem(newList, setNewList, list2Data, setList2Data, item)}>➡️</button>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="list-container">
              <div className="list-header">
                <h3>List 2</h3>
              </div>
              <div className="list-scrollable">
                {list2Data.map(item => (
                  <div key={item.id} className="list-card">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <button onClick={() => moveItem(list2Data, setList2Data, newList, setNewList, item)}>⬅️</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
  
};

export default ListsView;
