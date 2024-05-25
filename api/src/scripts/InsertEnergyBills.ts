import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import { AppDataSource } from '../data-source';
import { extractTextFromPDF } from '../utils/ExtractTextFromPDF';
import { callChatGPT } from '../utils/ChatgptFunction';
import { EnergyBillsService } from '../services/EnergyBillsService';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });


const energyBillsService = new EnergyBillsService();

async function getEnergyBillsInfo(pdfPath: string, chatGPTText: string): Promise<object> {
  try {
    const textoExtraido = await extractTextFromPDF(pdfPath);

    let resultString = `${chatGPTText} ${textoExtraido}`;

    const respostaChatGPT = await callChatGPT(resultString);

    const parsedResponse = JSON.parse(respostaChatGPT);

    return parsedResponse;
  } catch (error: any) {
    throw error;
  }
}

async function insertEnergyBills(pdfPath: string): Promise<void> {
  try {
    const text = "categorize os valores: numero_do_cliente, mes_de_referencia, energia_eletrica_kwh, energia_eletrica_rs, energia_scee_s_icms_kwh, energia_scee_s_icms_rs, energia_compensada_gd_i_kwh, energia_compensada_gd_i_rs, contrib_ilum_publica_municipal_rs, numero_da_instalacao, data_de_emissao, vencimento, total_a_pagar. O retorno deve ser em json. No texto a seguir:"

    const response: any = await getEnergyBillsInfo(pdfPath, text)

    const formattedResponse: object ={
      numeroCliente: response.numero_do_cliente,
      mesReferencia: response.mes_de_referencia,
      energiaEletricaKWh: response.energia_eletrica_kwh,
      energiaEletricaReais: response.energia_eletrica_rs,
      energiaSCEEKWh: response.energia_scee_s_icms_kwh,
      energiaSCEEReais: response.energia_scee_s_icms_rs,
      energiaCompensadaGDIKWh: response.energia_compensada_gd_i_kwh,
      energiaCompensadaGDIReais: response.energia_compensada_gd_i_rs,
      contribuicaoIlumPublica: response.contrib_ilum_publica_municipal_rs,
      numeroInstalacao: response.numero_da_instalacao,
      dataEmissao: response.data_de_emissao,
      vencimento: response.vencimento,
      totalPagar: response.total_a_pagar
    }

    await energyBillsService.createEnergyBills(formattedResponse);

  } catch (error: any) {
    throw error;
  }
}

async function extractTextFromAllPDFsInFolder(folderPath: string): Promise<void> {
  const files = fs.readdirSync(folderPath);
  const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
  
  for (const pdfFile of pdfFiles) {
    const pdfPath = path.join(folderPath, pdfFile);
    await insertEnergyBills(pdfPath);
  }
}

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
    await extractTextFromAllPDFsInFolder('../public')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });



