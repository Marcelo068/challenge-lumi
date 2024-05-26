import { Repository } from 'typeorm';
import { EnergyBills } from '../entitys/EnergyBillsEntity';
import { AppDataSource } from '../data-source';

import { EnergyBillChartsDto } from './dto/EnergyBillChartsDto';

export class EnergyBillsService {
  private energyBillsRepository: Repository<EnergyBills>;

  constructor(energyBillsRepository?: Repository<EnergyBills>) {
    this.energyBillsRepository = energyBillsRepository || AppDataSource.getRepository(EnergyBills);
  }

  async createEnergyBills(energyBillData: Partial<EnergyBills>): Promise<EnergyBills> {
    return await this.energyBillsRepository.save(energyBillData);
  }

  async getEnergyBills(numeroCliente?: string, skip = 0, take = 10): Promise<{ data: EnergyBills[], total: number }> {
    let queryOptions: any = {
      skip,
      take,
    };
  
    if (numeroCliente) {
      queryOptions.where = { numeroCliente };
    }
  
    const [data, total] = await this.energyBillsRepository.findAndCount(queryOptions);
    return { data, total };
  }

  
  async getEnergyBillingDataForCharts(numeroCliente?: string): Promise<EnergyBillChartsDto[]> {
    let energyBills;

    if (numeroCliente) {
      energyBills = await this.energyBillsRepository.find({ where: { numeroCliente } });
    } else {
      energyBills = await this.energyBillsRepository.find();
    }

    const processedEnergyBills = energyBills.map(bill => {
      const dataEmissao = bill.dataEmissao;
      const numeroCliente = bill.numeroCliente
      const energiaEletricaKWh = parseFloat(bill.energiaEletricaKWh);
      const energiaSCEEKWh = parseFloat(bill.energiaSCEEKWh);
      const energiaCompensadaGDIKWh = parseFloat(bill.energiaCompensadaGDIKWh);

      const energiaEletricaReais = parseFloat(bill.energiaEletricaReais.replace(',', '.'));
      const energiaSCEEReais = parseFloat(bill.energiaSCEEReais.replace(',', '.'));
      const contribuicaoIlumPublica = parseFloat(bill.contribuicaoIlumPublica.replace(',', '.'));

      const energiaCompensadaGDIReais = parseFloat(bill.energiaCompensadaGDIReais.replace(',', '.'));

      const consumoEnergiaEletricaKWh = energiaEletricaKWh + energiaSCEEKWh;
      const energiaCompensadaKWh = energiaCompensadaGDIKWh;
      const valorTotalSemGDReais = energiaEletricaReais + energiaSCEEReais + contribuicaoIlumPublica;
      const economiaGDReais = energiaCompensadaGDIReais;

      return {
        numeroCliente,
        consumoEnergiaEletricaKWh,
        energiaCompensadaKWh,
        valorTotalSemGDReais,
        economiaGDReais,
        dataEmissao
      };
    });

    return processedEnergyBills
  }
}
