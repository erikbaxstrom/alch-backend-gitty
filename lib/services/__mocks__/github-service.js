/* eslint-disable no-unused-vars */
const exchangeCodeForToken = async (code) => {
  return 'abc123';
};

const getGithubProfile = async (token) => {
  return {
    login: 'fake_github_user',
    avatar_url: 'https://placebear.com/300/300',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
