import { getPage, getInstagramId, getListOfMedia, getMedia } from '../../helpers/instaLoad';
import { useLogin } from '../../contexts/LoginContext';
import axios from 'axios';

const Profile = () => {
  const { login, setLogin, token, setToken, user, setUser } = useLogin();


  const importImages = async function () {
    let pageId = await getPage(user.facebookId); console.log(pageId);
    let instaId = await getInstagramId(pageId); console.log(instaId);
    let listOfMedia = await getListOfMedia(instaId); console.log(listOfMedia);
    let images = [];
    // only put 10 images
    for (let index = 0; index < 10; index++) {
      let media = await getMedia(listOfMedia[index].id);
      images.push({
        "resourceUrl": media.permalink,
        "resourceHash": media.id
      });
    }
    // here we call backend and put in all images
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post('/v1/users/' + user.id + '/addResource', images, config);
    if (response.status === 202) {
      setUser(response.data.user);
      console.log(user);
    }
  }
  return (
    <div>
      <button onClick={importImages}>Import images</button>
    </div>
  );
};

export default Profile;
