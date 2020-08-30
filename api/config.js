exports.DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://admin:adminadmin@spacemonitor.jwexx.mongodb.net/spacemonitor?retryWrites=true&w=majority" ||"mongodb://localhost:27017/spacemonitor";
exports.PORT = process.env.PORT || 8080;
exports.SECRET = process.env.SECRET || 'secret';