const Config = {
  apiUrl: process.env.REACT_APP_API_URL,
  redirectUri: process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3001/',
  googleEndPoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  googleScope: 'https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/userinfo.email',
  googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '238845897037-6thfidqs6a3m2eucdkuqqm31fnce66ug.apps.googleusercontent.com',
};

export default Config;
