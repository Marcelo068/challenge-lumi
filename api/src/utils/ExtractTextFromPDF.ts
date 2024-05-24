import fs from 'fs';
import pdf from 'pdf-parse';

export async function extractTextFromPDF(pdfPath: string): Promise<string> {
  const pdfBuffer = fs.readFileSync(pdfPath);
  
  try {
    const data = await pdf(pdfBuffer);
    return data.text; 
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error; 
  }
}
