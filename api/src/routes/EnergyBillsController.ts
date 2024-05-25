import { Router, Request, Response } from 'express';
import { EnergyBillsService } from '../services/EnergyBillsService';

const router = Router();
const energyBillsService = new EnergyBillsService();

router.get('/', async (req: Request, res: Response) => {
  const { numeroCliente, skip, take } = req.query;

  const pageNumber = parseInt(skip as string, 10) || 0;
  const pageSize = parseInt(take as string, 10) || 10;

  const { data, total } = await energyBillsService.getEnergyBills(numeroCliente as string, pageNumber, pageSize);
  res.json({ data, total });
});

router.get('/data-for-charts', async (req: Request, res: Response) => {
  const { numeroCliente } = req.query;

  const energyBills = await energyBillsService.getEnergyBillingDataForCharts(numeroCliente as string);
  res.json(energyBills);
});

export default router;
