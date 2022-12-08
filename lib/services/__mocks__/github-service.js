const exchangeCodeForToken = async (code) => {
  // console.log('codin::', code);
  return 'abc123';
};

const getGithubProfile = async (token) => {
  // console.log('tokin::', token);
  return {
    login: 'fake_github_user',
    avatar_url: 'https://placebear.com/300/300',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
