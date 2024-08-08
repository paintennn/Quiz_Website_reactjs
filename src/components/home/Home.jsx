import { useSelector } from 'react-redux';
import videoHomePage from '../../assets/video-homepage.mp4'
import { useNavigate } from 'react-router-dom';
const Home = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <video autoPlay muted loop>
                <source src={videoHomePage} type='video/mp4'></source>
            </video>
            <div className='home-content'>
                <div className='home-content-title'>There's a better way to ask</div>
                <div className='home-content-desc'>You don't want to make a boring form. And your audience won't answer one.
                    Create a typeform instead-and make everyone happy.
                </div>
                <div className='home-content-button'>
                    {isAuthenticated === true ?
                        <button onClick={() => navigate('/quiz')}>Doing Quiz Now</button>:
                        <button onClick={() => navigate('/login')}>Get's started. It's free</button>
                    }
                    
                </div>
            </div>
        </div>
    )
}
export default Home;