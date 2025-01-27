import React, { useState, useRef, useEffect } from 'react';
import './ComboBox.css';
import { Options } from '../../Models/generic/Options';



interface ComboBoxProps {
    options: Options[];
    onSelect: (value: number) => void;
    placeholder?: string;
}

function ComboBox(props: ComboBoxProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<Options[]>(props.options);
    const comboBoxRef = useRef<HTMLDivElement>(null);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setFilteredOptions(props.options.filter(option => option.value.toLowerCase().includes(value.toLowerCase())));
        setIsOpen(true);
    };

    const handleOptionClick = (option: Options) => {
        setInputValue(option.value);
        props.onSelect(option.key);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
         setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (comboBoxRef.current && !comboBoxRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [comboBoxRef]);


    return (
        <div className="combobox-container" ref={comboBoxRef}>
            <div className="combobox-input-container">
                <input
                    type="text"
                    className="combobox-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={props.placeholder}
                     onClick={toggleDropdown}
                />
                <span className="arrow-icon" onClick={toggleDropdown}>{isOpen? "▲" : "▼"} </span>

            </div>

            {isOpen && (
                <ul className="combobox-options">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <li key={option.key} className="combobox-option" onClick={() => handleOptionClick(option)}>
                                {option.value}
                            </li>
                        ))
                    ) : (
                        <li className="combobox-no-results">Немає результатів</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default ComboBox;