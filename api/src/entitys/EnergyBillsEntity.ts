import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EnergyBills {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'file_name', nullable: true })
  fileName: string;

  @Column({ name: 'numero_do_cliente', nullable: true })
  numeroCliente: string;

  @Column({ name: 'mes_de_referencia', nullable: true })
  mesReferencia: string;

  @Column({ name: 'energia_eletrica_kwh', nullable: true })
  energiaEletricaKWh: string;

  @Column({ name: 'energia_eletrica_rs', nullable: true })
  energiaEletricaReais: string;

  @Column({ name: 'energia_scee_s_icms_kwh', nullable: true })
  energiaSCEEKWh: string;

  @Column({ name: 'energia_scee_s_icms_rs', nullable: true })
  energiaSCEEReais: string;

  @Column({ name: 'energia_compensada_gd_i_kwh', nullable: true })
  energiaCompensadaGDIKWh: string;

  @Column({ name: 'energia_compensada_gd_i_rs', nullable: true })
  energiaCompensadaGDIReais: string;

  @Column({ name: 'contrib_ilum_publica_municipal_rs', nullable: true })
  contribuicaoIlumPublica: string;

  @Column({ name: 'numero_da_instalacao', nullable: true })
  numeroInstalacao: string;

  // @Column({ name: 'cep', nullable: true })
  // cep: string;

  // @Column({ name: 'endereco', nullable: true })
  // endereco: string;

  @Column({ name: 'data_de_emissao', nullable: true })
  dataEmissao: string;

  @Column({ name: 'vencimento', nullable: true })
  vencimento: string;

  @Column({ name: 'total_a_pagar', nullable: true })
  totalPagar: string;
}
