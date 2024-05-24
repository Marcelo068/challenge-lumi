import express from 'express';
import { AppDataSource } from './data-source';
import energyBillsRouter from './routes/EnergyBillsController';

const app = express();
const port = 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.use('/energy-bills', energyBillsRouter);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });