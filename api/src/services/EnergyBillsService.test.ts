import { EnergyBills } from '../entitys/EnergyBillsEntity';
import { EnergyBillsService } from './EnergyBillsService';
import { MockEnergyBillsRepository } from '../mock/MockEnergyBillsRepository';

describe('EnergyBillsService', () => {
  let energyBillsService: EnergyBillsService;
  let mockRepository: MockEnergyBillsRepository;

  beforeEach(() => {
    mockRepository = new MockEnergyBillsRepository();
    energyBillsService = new EnergyBillsService(mockRepository as any);
  });

  describe('createEnergyBills', () => {
    it('should create a new energy bill', async () => {
      const energyBillData = {
        numeroCliente: '123',
        mesReferencia: '04/2023',
        energiaEletricaKWh: '600',
        energiaEletricaReais: '300,00',
        energiaSCEEKWh: '120',
        energiaSCEEReais: '60,00',
        energiaCompensadaGDIKWh: '60',
        energiaCompensadaGDIReais: '30,00',
        contribuicaoIlumPublica: '12,00',
        numeroInstalacao: '3000055481',
        dataEmissao: '2023-04-05',
        vencimento: '2023-04-15',
        totalPagar: '402,00',
        fileName: ''
      };

      const createdEnergyBill = await energyBillsService.createEnergyBills(energyBillData);

      const expectedEnergyBill = {
        ...energyBillData,
        id: expect.any(String),
      };

      expect(createdEnergyBill).toEqual(expectedEnergyBill);
    });
  });

  const mockEnergyBills: EnergyBills[] = [
    {
      id: '1',
      numeroCliente: '123',
      mesReferencia: '01/2023',
      energiaEletricaKWh: '500',
      energiaEletricaReais: '250.00',
      energiaSCEEKWh: '100',
      energiaSCEEReais: '50.00',
      energiaCompensadaGDIKWh: '50',
      energiaCompensadaGDIReais: '25.00',
      contribuicaoIlumPublica: '10.00',
      numeroInstalacao: '3000055479',
      dataEmissao: '2023-01-05',
      vencimento: '2023-01-15',
      totalPagar: '335.00',
      fileName: ''
    },
    {
      id: '2',
      numeroCliente: '456',
      mesReferencia: '02/2023',
      energiaEletricaKWh: '600',
      energiaEletricaReais: '300.00',
      energiaSCEEKWh: '120',
      energiaSCEEReais: '60.00',
      energiaCompensadaGDIKWh: '60',
      energiaCompensadaGDIReais: '30.00',
      contribuicaoIlumPublica: '12.00',
      numeroInstalacao: '3000055480',
      dataEmissao: '2023-02-05',
      vencimento: '2023-02-15',
      totalPagar: '402.00',
      fileName: ''
    },
    {
      id: '3',
      numeroCliente: '123',
      mesReferencia: '03/2023',
      energiaEletricaKWh: '550',
      energiaEletricaReais: '275.00',
      energiaSCEEKWh: '110',
      energiaSCEEReais: '55.00',
      energiaCompensadaGDIKWh: '55',
      energiaCompensadaGDIReais: '27.50',
      contribuicaoIlumPublica: '11.00',
      numeroInstalacao: '3000055479',
      dataEmissao: '2023-03-05',
      vencimento: '2023-03-15',
      totalPagar: '368.50',
      fileName: ''
    },
  ];

  describe('getEnergyBills', () => {
    it('should return energy bills with total count', async () => {
      mockRepository['energyBills'] = mockEnergyBills;

      const { data, total } = await energyBillsService.getEnergyBills('123');

      expect(data.length).toBe(2);
      expect(total).toBe(2);
    });

    it('should return all energy bills when no client number is provided', async () => {
      mockRepository['energyBills'] = mockEnergyBills;

      const { data, total } = await energyBillsService.getEnergyBills();

      expect(data.length).toBe(mockEnergyBills.length);
      expect(total).toBe(mockEnergyBills.length);
    });

    it('should return energy bills with pagination', async () => {
      mockRepository['energyBills'] = mockEnergyBills;

      const skip = 1;
      const take = 2;
      const { data, total } = await energyBillsService.getEnergyBills(undefined, skip, take);

      expect(data.length).toBe(take);
      expect(total).toBe(mockEnergyBills.length);
      expect(data[0].id).toBe(mockEnergyBills[skip].id);
    });
  });

  describe('getEnergyBillingDataForCharts', () => {
    it('should return processed energy billing data for a specific client', async () => {
      mockRepository['energyBills'] = mockEnergyBills;

      const numeroCliente = '123';
      const processedData = await energyBillsService.getEnergyBillingDataForCharts(numeroCliente);

      const expectedData = [
        {
          numeroCliente: '123',
          consumoEnergiaEletricaKWh: 600,
          energiaCompensadaKWh: 50,
          valorTotalSemGDReais: 310,
          economiaGDReais: 25,
          dataEmissao: '2023-01-05'
        },
        {
          numeroCliente: '123',
          consumoEnergiaEletricaKWh: 660,
          energiaCompensadaKWh: 55,
          valorTotalSemGDReais: 341,
          economiaGDReais: 27.5,
          dataEmissao: '2023-03-05'
        }
      ];

      expect(processedData).toEqual(expectedData);
    });

    it('should return processed energy billing data for all clients when no client number is provided', async () => {
      mockRepository['energyBills'] = mockEnergyBills;

      const processedData = await energyBillsService.getEnergyBillingDataForCharts();

      const expectedData = [
        {
          numeroCliente: '123',
          consumoEnergiaEletricaKWh: 600,
          energiaCompensadaKWh: 50,
          valorTotalSemGDReais: 310.00,
          economiaGDReais: 25.00,
          dataEmissao: '2023-01-05'
        },
        {
          numeroCliente: '456',
          consumoEnergiaEletricaKWh: 720,
          energiaCompensadaKWh: 60,
          valorTotalSemGDReais: 372.00,
          economiaGDReais: 30.00,
          dataEmissao: '2023-02-05'
        },
        {
          numeroCliente: '123',
          consumoEnergiaEletricaKWh: 660,
          energiaCompensadaKWh: 55,
          valorTotalSemGDReais: 341,
          economiaGDReais: 27.5,
          dataEmissao: '2023-03-05'
        }
      ];

      expect(processedData).toEqual(expectedData);
    });
  });
});
