import { EnergyBills } from '../entitys/EnergyBillsEntity';

export class MockEnergyBillsRepository {
  private energyBills: EnergyBills[] = [];

  async find(): Promise<EnergyBills[]> {
    return this.energyBills;
  }
}
