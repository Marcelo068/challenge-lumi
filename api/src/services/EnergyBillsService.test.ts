// services/EnergyBillsService.spec.ts
import { EnergyBillsService } from './EnergyBillsService';
import { Repository } from 'typeorm';
import { EnergyBills } from '../entitys/EnergyBillsEntity';

describe('EnergyBillsService', () => {
  let energyBillsService: EnergyBillsService;
  let energyBillsRepository: Partial<Repository<EnergyBills>>;

  beforeEach(() => {
    energyBillsRepository = {
      save: jest.fn(),
    };

    energyBillsService = new EnergyBillsService(energyBillsRepository as any);
  });

  describe('createEnergyBills', () => {
    it('should create and return an energy bill', async () => {
      const energyBillData: Partial<EnergyBills> = {
        numeroCliente: '123456',
        mesReferencia: '01-2023',
        energiaEletricaKWh: '1000',
        energiaEletricaReais: '500',
      };

      const savedEnergyBill: EnergyBills = energyBillData as EnergyBills;

      (energyBillsRepository.save as jest.Mock).mockResolvedValue(savedEnergyBill);

      const result = await energyBillsService.createEnergyBills(energyBillData);

      expect(result).toEqual(savedEnergyBill);
      expect(energyBillsRepository.save).toHaveBeenCalledWith(energyBillData);
    });
  });
});
