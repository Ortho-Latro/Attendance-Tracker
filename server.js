import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import attendanceRouters from './route/attendanceRoute.js';

//console.time("Entire server startup ");
const app = express();
//console.time("Database connection: ");
connectDB();
//console.timeEnd("Database connection: ");
app.use(express.json());

// Mount the attendance routes
app.use('/api/attendance', attendanceRouters);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    //console.timeEnd("Entire server startup ");
});
