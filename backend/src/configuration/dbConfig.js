const mongoose = require('mongoose');
const db = 'mongodb+srv://nathnaelbassa:nati1234@seniorcluster.e5lda.mongodb.net/?retryWrites=true&w=majority&appName=seniorCluster';
mongoose.connect(db, {
    serverSelectionTimeoutMS: 5000
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});

module.exports = mongoose;