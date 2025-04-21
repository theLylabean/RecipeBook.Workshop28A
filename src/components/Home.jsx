import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../css/home.css';

const Home = ({ newUserRecipe, setNewUserRecipe, token }) => {
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
            </div>
            <div className='home-container'>
                <h2>
                    Create Your Own Recipe!
                </h2>
                <p>
                    Click below to fill out and upload your very own recipe! After submitting your recipe, the form will automatically save it to your account. You will be able to see all of your own creations in your account page and even save them to your favourites page!
                </p>
                <button className='home-button' onClick={() => navigate('/cyor')}>
                    Go Now!
                </button>
            </div>
        </div>
    );
}

export default Home