import { useHistory } from 'react-router';
import './LandingPage.css';

const LandingPage = () => {
  const history = useHistory();
  return (
    <div className='landingPage'>
      <div className='landingPageItems ' onClick={() => history.push('/explore')}>
        <div className='exploreStyle'>Explore</div>
      </div>
      <div className='landingPageItems' onClick={() => history.push('/profile')}>
        <div className='profileStyle'>Profile</div>
      </div>
    </div>
  );
};

export default LandingPage;
