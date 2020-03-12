import localStorage from 'localStorage';
import decodeToken from '../helpers/decodeToken';

const auth = (req, res, next) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'you are not logged in',
    });
  }
  try {
    const decoded = decodeToken(token, process.env.SECRETKEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
  return token;
};

const isSuperAdmin = (req, res, next) => {
  try {
    if (req.user.role === 'superAdmin') {
      next();
    } else {
      return res.status(403).json({ messsage: 'Sorry! Only super admin authorized!' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'error' });
  }
};
export default {
  auth,
  isSuperAdmin,
};
