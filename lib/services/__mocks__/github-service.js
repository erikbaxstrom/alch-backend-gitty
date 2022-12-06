const exchangeCodeForToken = async (code) => {
  return 'MOCK TOKEN FOR CODE';
};

const getGithubProfile = async (token) => {
  return {
    login: 'fake_github_user',
    avatar_url: 'https://placebear.com/300/300',
    email: 'user@email.com',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
