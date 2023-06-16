import React, { useState } from 'react';

const SelectExtend = () => {
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState('');

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setOptions([...options, selectedOption]);
  };

  const handleNewOptionChange = (event) => {
    setNewOption(event.target.value);
  };

  const addOption = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    if (newOption !== '') {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={addOption}> {/* Wrap the input and button in a form */}
          <input
            type="text"
            value={newOption}
            onChange={handleNewOptionChange}
            placeholder="Enter an option"
          />
          <button type="submit">Add Option</button> {/* Use type="submit" instead of type="button" */}
        </form>
      </div>
      <div>
        <select onChange={handleOptionChange}>
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectExtend;
