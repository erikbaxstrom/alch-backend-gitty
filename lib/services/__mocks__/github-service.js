const exchangeCodeForToken = async () => {
  return 'abc123';
};

const getGithubProfile = async () => {
  return {
    login: 'fake_github_user',
    avatar_url: 'https://placebear.com/300/300',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
