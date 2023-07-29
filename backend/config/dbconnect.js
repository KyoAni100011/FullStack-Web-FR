const { default: mongoose } = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        if (conn.connection.readyState === 1) {
            console.log('MongoDB connected successfully')
        }
        else console.lod('DB connecting')
    } catch (error) {
        console.log('DB connection failed')
        throw new Error(error)
    }
}
module.exports = dbConnect;