import { Router, Request, Response } from 'express';
import { EnergyBillsService } from '../services/EnergyBillsService';

const router = Router();
const energyBillsService = new EnergyBillsService();

router.get('/', async (req: Request, res: Response) => {
  const energyBills = await energyBillsService.getEnergyBills();
  res.json(energyBills);
});

router.get('/data-for-charts', async (req: Request, res: Response) => {
  const energyBills = await energyBillsService.getEnergyBillingDataForCharts();
  res.json(energyBills);
});

export default router;
