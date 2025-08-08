
import pdf from 'pdf-parse/lib/pdf-parse.js';

// function to parse pdf files using pdf-parse
// received file blob from client
// returns parsed text
export const pdfParser = async (fileBlob) => {
  const dataBuffer = Buffer.from(await fileBlob.arrayBuffer());
  try {
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF 🚫: ", error);
    throw error;
  }
}

