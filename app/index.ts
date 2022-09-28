import express from 'express';
import router from './Routes/clienteRoutes';
const PORT = process.env.port || 5000;
const app = express();
app.use(express.json());
app.use('/', router);
app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});

export default app;
