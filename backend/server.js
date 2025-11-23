import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

//app config
const app = express();
const port = process.env.PORT || 4000;

console.log("[STARTUP] Connecting to database...");
connectDB();
console.log("[STARTUP] Connecting to Cloudinary...");
connectCloudinary();

//middlewares - IMPORTANT: Must be before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

//API end points
console.log("[STARTUP] Registering admin routes...");
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/',(req, res)=>{
    res.send("API Working Great")
})



// Debug route to verify server is running
app.get('/api/admin/test', (req, res) => {
    console.log("[DEBUG] /api/admin/test endpoint hit");
    res.json({success: true, message: "Admin API routes are working"})
})

// Catch-all for 404
app.use((req, res) => {
    console.log(`[404] Route not found: ${req.method} ${req.path}`);
    res.status(404).json({success: false, message: "Route not found", path: req.path});
});

//start server
app.listen(port, ()=> {
    console.log("\n" + "=".repeat(60));
    console.log("[SUCCESS] Server Started on port " + port);
    console.log("[INFO] Admin Login Endpoint: http://localhost:" + port + "/api/admin/login");
    console.log("[INFO] Test Endpoint: http://localhost:" + port + "/api/admin/test");
    console.log("=".repeat(60) + "\n");
});

