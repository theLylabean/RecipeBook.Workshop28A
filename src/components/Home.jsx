import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../css/home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='home-container'>
            <div className='header-container'>
                <Header />
            </div>
            <div className='home-body-container'>
                <section className='section-container'>
                    <h2>
                        Click Below to See All of Our Recipes!
                    </h2>
                    <p>
                        We have a large selection of recipes to browse through! From Sweet and Sour Chicken to Fish Tacos. You'll have the option to add your favourites to a list that you can access on your account page. Thanks for visiting!
                    </p>
                    <button className='home-button' onClick={() => navigate("/recipeList")}>
                        Click Here!
                    </button>
                </section>
                <section className='section-container'>
                    <h2>
                        Add Your Own Recipe!
                    </h2>
                    <p>
                        Click below to fill out and upload your very own recipe! After submitting your recipe, the form will automatically save it to your account. You will be able to see all of your own creations in your account page and even save them to your favourites page!
                        <br />
                        <br />
                        <span style={{ color: 'rgb(221, 5, 5)', fontSize: '1.5rem'}}>** You must be logged in to add your own recipes! **</span>
                    </p>
                    <button className='home-button' onClick={() => navigate('/newuser-recipe')}>
                        Go Now!
                    </button>
                </section>
            </div>
        </div>
    );
}

export default Home