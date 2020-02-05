import googleAuthData from '../mockData/googleAuth';
import facebookAuthData from '../mockData/facebookAuth';

const fakeAuth = (req, res, next) => {
  const urlPathSections = req.url.split('/');
  const resourceServer = urlPathSections[urlPathSections.length - 1];
  req.user = (resourceServer === 'facebook') ? facebookAuthData : googleAuthData;
  next();
};

export default fakeAuth;
