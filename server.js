import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import attendanceRouters from './route/attendanceRoute.js';
import authRouters from './route/authRoute.js';
import adminRouters from './route/adminRoute.js';
import scheduleRouters from './models/Schedule.js';
import { seedAdmin } from './utils/seedAdmin.js';

//console.time("Entire server startup ");
const app = express();
//console.time("Database connection: ");
connectDB();
await seedAdmin();
//console.timeEnd("Database connection: ");
app.use(express.json());

// Mount the attendance routes
app.use('/api/attendance', attendanceRouters);
app.use('/api/auth', authRouters);
app.use('/api/admin', adminRouters);
app.use('/api/schedules', scheduleRouters);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    //console.timeEnd("Entire server startup ");
});
