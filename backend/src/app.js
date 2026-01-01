import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import cartRoutes from './routes/cartRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.use("/api/cart", cartRoutes);

// Image Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

app.use('/images', express.static(path.join(__dirname, '../upload/images')));

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
  });
});

app.get("/", (req, res) => {
  res.send("Express App is Running");
});

export default app;
