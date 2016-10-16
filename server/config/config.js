const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 8000,
  // 1 week (7 days)
  expireTime: '7d',
  secrets: {
    jwt: process.env.JWT || 'restosecrets198',
  },
};

// Setting environment variable
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

module.exports = config;
