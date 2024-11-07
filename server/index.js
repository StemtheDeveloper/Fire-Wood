// ...existing imports...
import cors from 'cors';

const app = express();

// Update CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com']  // Replace with your actual domain
    : ['http://localhost:3000'],
  credentials: true
}));
// ...existing code...
