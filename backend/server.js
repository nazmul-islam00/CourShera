import express from 'express';
import cors from 'cors';
import prisma from './db.js';

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server has started running on port ${PORT}`);
});


// Eikhane route add korbi
// module wise organize koirish

app.get('/test-courses', async (req, res) => {
  const courses = await prisma.courses.findMany();
  res.json(courses);
});