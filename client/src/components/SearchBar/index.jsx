import { useState, useEffect } from 'react';
// import { fetchData } from '../utils/fetchData';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])

    const fetchData = async (query) => {
        if (!query) return;
        try {
            const response = await fetch(`https://api.example.com/search?query=${query}`);
            const data = await response.json();
            setResults(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(searchTerm);
    }, [searchTerm]);

    return (
        <div>
            <span>🔎</span>
            <input
                type="text"
                placeholder="Search for a pokemon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default SearchBar
