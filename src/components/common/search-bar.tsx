import { searchCourse } from '../../api/endpoints/course/course';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const fetchSuggestions = async (query: string) => {
            try {
                const response = await searchCourse(query, '');
                setSuggestions(response);
            } catch (error) {
                console.error('Error fetching suggestions: ', error);
            }
        };

        if (searchTerm) {
            fetchSuggestions(searchTerm);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => setIsFocused(false), 200); // Delay hiding suggestions to allow click
    };

    const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return (
        <div className="relative">
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Search courses..."
                    className="pl-10 pr-4 py-2 w-64 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BiSearch className="h-5 w-5 text-gray-400" />
                </div>
            </div>
            {isFocused && filteredSuggestions.length > 0 ? (
                <ul className="mt-2 py-1 max-h-48 overflow-y-auto absolute z-10 w-full">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li key={index} className="py-1">
                            {suggestion}
                        </li>
                    ))}
                </ul>
            ) : (
                isFocused &&
                searchTerm && (
                    <div className="mt-2 py-1 absolute z-10 w-full bg-white border border-gray-300 rounded-md px-4">
                        <p className="text-gray-500">No results found.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default SearchBar;
