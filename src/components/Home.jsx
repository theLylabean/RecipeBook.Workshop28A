import { useNavigate } from 'react-router-dom';
import Header from './Header';
// import NewRecipeForm from './NewRecipeForm';
import '../css/home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='header-container'>
                <Header />
            </div>
            <div className='home-container'>
                <h2>
                    Click Below to See All of Our Recipes!
                </h2>
                <button className='home-button' onClick={() => navigate("/recipeList")}>
                    Click Here!
                </button>
                {/* <NewRecipeForm /> */}
            </div>
        </div>
    );
}

export default Home