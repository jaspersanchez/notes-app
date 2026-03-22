const getEnv = (key: string) => {
  const val = process.env[key];

  if (!val) {
    throw new Error(`No environment key for ${key}`);
  }

  return val;
};

export const env = {
  mongoUri: getEnv("MONGO_URI"),
  port: getEnv("PORT"),
  jwtSecret: getEnv("JWT_SECRET"),
};
