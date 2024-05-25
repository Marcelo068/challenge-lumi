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
      findAndCount: jest.fn(),
      find: jest.fn(),
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

      (energyBillsRepository.save as jest.Mock).mockResolvedValue(energyBillData);

      const result = await energyBillsService.createEnergyBills(energyBillData);

      expect(result).toEqual(energyBillData);
      expect(energyBillsRepository.save).toHaveBeenCalledWith(energyBillData);
    });
  });

  describe('getEnergyBills', () => {
    it('should return energy bills with default pagination and filtered by client number', async () => {
      const mockEnergyBills = [
        {
          numeroCliente: '123456',
          mesReferencia: '01-2023',
          energiaEletricaKWh: '1000',
          energiaEletricaReais: '500',
        },
        {
          numeroCliente: '123456',
          mesReferencia: '02-2023',
          energiaEletricaKWh: '1200',
          energiaEletricaReais: '600',
        },
      ];
  
      const mockTotalCount = 2;
  
      (energyBillsRepository.findAndCount as jest.Mock).mockResolvedValue([mockEnergyBills, mockTotalCount]);
  
      const { data, total } = await energyBillsService.getEnergyBills('123456');
  
      expect(data).toEqual(mockEnergyBills);
      expect(total).toEqual(mockTotalCount);
      expect(energyBillsRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        where: { numeroCliente: '123456' },
      });
    });
  
    it('should return energy bills with default pagination when no client number filter is provided', async () => {
      const mockEnergyBills = [
        {
          numeroCliente: '789012',
          mesReferencia: '01-2023',
          energiaEletricaKWh: '1500',
          energiaEletricaReais: '700',
        },
        {
          numeroCliente: '789012',
          mesReferencia: '02-2023',
          energiaEletricaKWh: '1300',
          energiaEletricaReais: '650',
        },
      ];
  
      const mockTotalCount = 2;
  
      (energyBillsRepository.findAndCount as jest.Mock).mockResolvedValue([mockEnergyBills, mockTotalCount]);
  
      const { data, total } = await energyBillsService.getEnergyBills();
  
      expect(data).toEqual(mockEnergyBills);
      expect(total).toEqual(mockTotalCount);
      expect(energyBillsRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });

  describe('getEnergyBillingDataForCharts', () => {
    it('should return processed energy billing data for charts with client number filter', async () => {
      const mockEnergyBills = [
        {
          numeroCliente: '123456',
          energiaEletricaKWh: '1000',
          energiaSCEEKWh: '200',
          energiaCompensadaGDIKWh: '50',
          energiaEletricaReais: '500',
          energiaSCEEReais: '100',
          contribuicaoIlumPublica: '50',
          energiaCompensadaGDIReais: '30',
        },
        {
          numeroCliente: '123456',
          energiaEletricaKWh: '1200',
          energiaSCEEKWh: '180',
          energiaCompensadaGDIKWh: '40',
          energiaEletricaReais: '600',
          energiaSCEEReais: '90',
          contribuicaoIlumPublica: '60',
          energiaCompensadaGDIReais: '35',
        },
      ];
  
      (energyBillsRepository.find as jest.Mock).mockResolvedValue(mockEnergyBills);
  
      const result = await energyBillsService.getEnergyBillingDataForCharts('123456');
  
      const expectedProcessedData = [
        {
          numeroCliente: '123456',
          consumoEnergiaEletricaKWh: 1000 + 200,
          energiaCompensadaKWh: 50,
          valorTotalSemGDReais: 500 + 100 + 50,
          economiaGDReais: 30,
        },
        {
          numeroCliente: '123456',
          consumoEnergiaEletricaKWh: 1200 + 180,
          energiaCompensadaKWh: 40,
          valorTotalSemGDReais: 600 + 90 + 60,
          economiaGDReais: 35,
        },
      ];
  
      expect(result).toEqual(expectedProcessedData);
      expect(energyBillsRepository.find).toHaveBeenCalledWith({ where: { numeroCliente: '123456' } });
    });
  
    it('should return processed energy billing data for charts without client number filter', async () => {
      const mockEnergyBills = [
        {
          numeroCliente: '789012',
          energiaEletricaKWh: '1500',
          energiaSCEEKWh: '300',
          energiaCompensadaGDIKWh: '70',
          energiaEletricaReais: '700',
          energiaSCEEReais: '150',
          contribuicaoIlumPublica: '80',
          energiaCompensadaGDIReais: '40',
        },
        {
          numeroCliente: '789012',
          energiaEletricaKWh: '1300',
          energiaSCEEKWh: '280',
          energiaCompensadaGDIKWh: '60',
          energiaEletricaReais: '650',
          energiaSCEEReais: '120',
          contribuicaoIlumPublica: '70',
          energiaCompensadaGDIReais: '45',
        },
      ];
  
      (energyBillsRepository.find as jest.Mock).mockResolvedValue(mockEnergyBills);
  
      const result = await energyBillsService.getEnergyBillingDataForCharts();
  
      const expectedProcessedData = [
        {
          numeroCliente: '789012',
          consumoEnergiaEletricaKWh: 1500 + 300,
          energiaCompensadaKWh: 70,
          valorTotalSemGDReais: 700 + 150 + 80,
          economiaGDReais: 40,
        },
        {
          numeroCliente: '789012',
          consumoEnergiaEletricaKWh: 1300 + 280,
          energiaCompensadaKWh: 60,
          valorTotalSemGDReais: 650 + 120 + 70,
          economiaGDReais: 45,
        },
      ];
  
      expect(result).toEqual(expectedProcessedData);
      expect(energyBillsRepository.find).toHaveBeenCalled();
    });
  });
});

