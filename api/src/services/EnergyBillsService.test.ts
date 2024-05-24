import { EnergyBillsService } from './EnergyBillsService';
import { MockEnergyBillsRepository } from '../utils/MockEnergyBillsRepository';

describe('EnergyBillsService', () => {
  let energyBillsService: EnergyBillsService;
  let mockEnergyBillsRepository: MockEnergyBillsRepository;

  beforeEach(() => {
    mockEnergyBillsRepository = new MockEnergyBillsRepository();
    energyBillsService = new EnergyBillsService(mockEnergyBillsRepository as any);
  });

  it('should get energyBills', async () => {
    const energyBills = await energyBillsService.getEnergyBills();

    expect(energyBills).toEqual([]);
  });
});
