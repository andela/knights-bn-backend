
const getUser = (accessToken, refreshToken, profile, done) => {
  const method = profile.provider;
  const { id } = profile;
  const firstName = profile.name.firstName || profile.name.givenName;
  const lastName = profile.name.lastName || profile.name.familyName;
  const { gender } = profile;
  const email = profile.emails[0].value;
  const user = {
    id, method, firstName, lastName, email, gender,
  };
  done(null, user);
};

export default getUser;
