import { Repository } from 'typeorm';
import { EnergyBills } from '../entitys/EnergyBillsEntity';
import { AppDataSource } from '../data-source';

export class EnergyBillsService {
  private energyBillsRepository: Repository<EnergyBills>;

  constructor(energyBillsRepository?: Repository<EnergyBills>) {
    this.energyBillsRepository = energyBillsRepository || AppDataSource.getRepository(EnergyBills);
  }

  async createEnergyBills(energyBillData: Partial<EnergyBills>): Promise<EnergyBills> {
    return await this.energyBillsRepository.save(energyBillData);
  }

  async getEnergyBills(): Promise<EnergyBills[]> {
    return await this.energyBillsRepository.find();
  }

  async getEnergyBillingDataForCharts(): Promise<EnergyBills[]> {

    const energyBills = await this.energyBillsRepository.find();

    const processedEnergyBills = energyBills.map(bill => {
      const energiaEletricaKWh = parseFloat(bill.energiaEletricaKWh);
      const energiaSCEEKWh = parseFloat(bill.energiaSCEEKWh);
      const energiaCompensadaGDIKWh = parseFloat(bill.energiaCompensadaGDIKWh);

      const energiaEletricaReais = parseFloat(bill.energiaEletricaReais.replace(',', '.'));
      const energiaSCEEReais = parseFloat(bill.energiaSCEEReais.replace(',', '.'));
      const energiaCompensadaGDIReais = parseFloat(bill.energiaCompensadaGDIReais.replace(',', '.'));
      const contribuicaoIlumPublica = parseFloat(bill.contribuicaoIlumPublica.replace(',', '.'));

      const consumoEnergiaEletricaKWh = energiaEletricaKWh + energiaSCEEKWh;
      const energiaCompensadaKWh = energiaCompensadaGDIKWh;
      const valorTotalSemGDReais = energiaEletricaReais + energiaSCEEReais + contribuicaoIlumPublica;
      const economiaGDReais = energiaCompensadaGDIReais;

      return {
        ...bill,
        consumoEnergiaEletricaKWh,
        energiaCompensadaKWh,
        valorTotalSemGDReais,
        economiaGDReais,
      };
    });

    console.log(processedEnergyBills)

    return await this.energyBillsRepository.find();
  }
}
