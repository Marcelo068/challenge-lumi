import { v4 as uuidv4 } from 'uuid';
import { EnergyBills } from '../../entitys/EnergyBillsEntity';

export class MockEnergyBillsRepository {
  private energyBills: EnergyBills[] = [];

  async save(energyBillData: Partial<EnergyBills>): Promise<EnergyBills> {
    const newEnergyBill = {
      ...energyBillData,
      id: uuidv4(),
    } as EnergyBills;

    this.energyBills.push(newEnergyBill);
    return newEnergyBill;
  }

  async findAndCount(queryOptions: any): Promise<[EnergyBills[], number]> {
    const { skip, take, where } = queryOptions;
    let filteredData = this.energyBills;

    if (where && where.numeroCliente) {
      filteredData = this.energyBills.filter(bill => bill.numeroCliente === where.numeroCliente);
    }

    const total = filteredData.length;
    const data = filteredData.slice(skip, skip + take);

    return [data, total];
  }

   async find(queryOptions?: any): Promise<EnergyBills[]> {
    if (queryOptions && queryOptions.where && queryOptions.where.numeroCliente) {
      return this.energyBills.filter(bill => bill.numeroCliente === queryOptions.where.numeroCliente);
    } else {
      return this.energyBills;
    }
  }
}
