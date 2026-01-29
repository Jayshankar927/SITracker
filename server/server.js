import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import jobRoutes from './routes/jobRoutes.js'

dotenv.config();
const app = express();

//Middleware
app.use(express.json()); //Allows parsing json bodies
app.use(cors({
  origin: "http://localhost:5173" // Allow your React app access
}));

app.use('/api/jobs', jobRoutes);

//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("DB connection error.", err));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.status(200).send("The Smart Interview Tracker API is alive!");
});
app.listen(PORT, () => console.log(`server running on port ${PORT}`));