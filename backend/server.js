const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server has started running on port ${PORT}`);
});


// Eikhane route add korbi
// module wise organize koirish

// app.get('/api/courses', async (req, res) => {
//     try {
//         const allCourses = await pool.query("SELECT * FROM courses");
//         res.json(allCourses.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });