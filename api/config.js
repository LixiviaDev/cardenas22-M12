module.exports = {
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_DURATION: process.env.JWT_DURATION || 86400000
}