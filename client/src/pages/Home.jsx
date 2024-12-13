import Cart from "../components/Cart";
import SearchBar from "../components/SearchBar";
// import PokeCard from '../components/PokeCard'

const Home = () => {
  return (
    <div className="container">
      <SearchBar />
      <Cart />
    </div>
  );
};

export default Home;
