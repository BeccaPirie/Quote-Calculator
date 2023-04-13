const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    jwtSecret: process.env.JWT_SECRET || "secret_key_182",
    mongoUri: 'mongodb+srv://rebeccalpirie:OKcLwYQy0l9Y8SlQ@cluster0.aa2f9ob.mongodb.net/?retryWrites=true&w=majority'
    // mongoUri: process.env.MONGODB_URI ||
    //           process.env.MONGO_HOST ||
    //           // 'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017')+'/quotes_database/' ||
    //           'mongodb://127.0.0.1/quotes_database'
  }
  
export default config