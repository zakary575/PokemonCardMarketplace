import { useState, useEffect } from 'react';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])
    
    function handleSubmit(event){
        event.preventDefault()
        queryAPI(searchTerm)
    }

    function queryAPI(query){
        const apiUrl =  'https://api.pokemontcg.io/v2/cards/?'
        const url = apiUrl + "&q=name:" + encodeURIComponent(query) 
    
        fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(results => {
        // Process the retrieved user data
        console.log('Results:', results)
        setResults(results.data.filter(card=>card.cardmarket !== undefined));
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }



    return (
        <div>
            <form 
            onSubmit={handleSubmit}>
            <span>🔎</span>
            <input
                type="text"
                placeholder="Search for a pokemon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </form>
            <ul>
                {results.map(card=>
                <li key={card.id}>
                    <p>${card.cardmarket.prices.averageSellPrice}</p>
                    <img src={card.images.small}></img><br/>
                    <button>Add to Cart</button>
                </li>)}
            </ul>

        </div>
    )
}

export default SearchBar
