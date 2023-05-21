async function userLogin(email, password) {
  return axios({
    method: 'POST',
    url: `${import.meta.env.VITE_API_AUTH}/login`,
    data: { email: email, password: password },
  }).then((res) => {
    return res;
  });
}

export { userLogin };
