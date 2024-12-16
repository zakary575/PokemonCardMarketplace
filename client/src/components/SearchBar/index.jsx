import { useState, useEffect } from 'react';
import './style.css'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  function handleSubmit(event) {
    event.preventDefault()
    queryAPI(searchTerm)
  }

  function queryAPI(query) {
    const apiUrl = 'https://api.pokemontcg.io/v2/cards/?'
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
        setResults(results.data.filter(card => card.cardmarket !== undefined));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <form className="form-inline my-2 my-lg-0"
        onSubmit={handleSubmit}>
        <span>🔎</span>
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search for a pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-info my-2 my-sm-0" type="submit">Search</button>
      </form>
      <div className="card-deck">
        {results.map(card =>
          <li className="card bg-dark" key={card.id}>
            <img className="card-img-top bg-dark" src={card.images.small}></img><br />
            <div className="card-body bg-dark">
              <p className="card-title text-light bg-dark">${card.cardmarket.prices.averageSellPrice}</p>
              <button className="btn btn-info">Add to Cart</button>
            </div>
          </li>
        )}
      </div>

    </div>
  )
}

export default SearchBar
