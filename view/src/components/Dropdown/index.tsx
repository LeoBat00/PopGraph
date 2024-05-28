import React, { useState } from 'react';
import './styles.css';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Select an option");

    const options = ["Djaskra", "Primm", "A*"];
    

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false); 
    };

    return (
        <div className="dropdown">
            <div className="selectedOption" onClick={toggleDropdown}>
                <span className="selectedText">{selectedOption}</span>
                <span className="arrow">▼</span>
            </div>
            {isOpen && (
                <div className="optionsContainer">
                    {options.map((option) => (
                        <div
                            key={option}
                            className="option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
