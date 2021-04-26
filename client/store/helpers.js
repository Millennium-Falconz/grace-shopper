const TOKEN = 'token';

export default function getAuthHeaderWithToken() {
  const token = window.localStorage.getItem(TOKEN);
  if (token)
    return {
      headers: {
        authorization: token,
      },
    };
}
