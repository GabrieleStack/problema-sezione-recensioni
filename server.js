import express from 'express';
import endpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoutes.js'; 
import userCommentsRoutes from './routes/UserCommentsRoutes.js'
import cors from 'cors';




dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongoDB connesso'))
  .catch((err) => console.error('mongoDB non connesso', err));

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes); 
app.use('/api/comments', userCommentsRoutes)

app.listen(PORT, () => {
  console.log(`Server presente nella porta: ${PORT}`);
  console.log('Endpoint disponibili:');
  console.table(endpoints(app));
});