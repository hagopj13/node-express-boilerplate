import { getPage, getInstagramId, getListOfMedia, getMedia } from '../../helpers/instaLoad';
import axios from 'axios';
const Profile = () => {
  const importImages = async function () {
    let pageId = await getPage(window.fbid); console.log(pageId);
    let instaId = await getInstagramId(pageId); console.log(instaId);
    let listOfMedia = await getListOfMedia(instaId); console.log(listOfMedia);
    let images = [];
    for (let index = 0; index < listOfMedia.length; index++) {
      let media = await getMedia(listOfMedia[index].id);
      images.push(media);
    }
    // here we call backend and put in all images

  }
  return (
    <div>
      <button onClick={importImages}>Import images</button>
    </div>
  );
};

export default Profile;
