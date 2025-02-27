// # Database connection settings (MongoDB)
export const databaseConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nestapp',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
