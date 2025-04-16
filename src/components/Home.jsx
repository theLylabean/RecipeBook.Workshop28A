import Header from './Header';
import { useNavigate } from 'react-router-dom';
import '../css/home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='home-container'>
            <Header />
            <h2>
                Click Below to See All of Our Recipes!
            </h2>
            <button className='home-button' onClick={() => navigate("/recipeList")}>
                Click Here!
            </button>
        </div>
    );
}

export default Home