/**
 * Utilitário para exportação de dados do sistema
 */

/**
 * Converte um array de objetos em um formato CSV e faz o download
 * @param data Array de objetos a serem convertidos
 * @param filename Nome do arquivo que será baixado
 * @param headers Cabeçalhos personalizados para o CSV (opcional)
 */
export const exportToCSV = <T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers?: Record<string, string>
): void => {
  if (!data || !data.length) {
    console.warn('Nenhum dado para exportar');
    return;
  }

  // Se não foram fornecidos cabeçalhos, usar as chaves do primeiro objeto
  const keys = Object.keys(data[0]);
  const headerRow = headers 
    ? Object.keys(headers).map(key => headers[key])
    : keys;

  // Criar as linhas do CSV
  const csvRows = [
    // Linha de cabeçalho
    headerRow.join(';'),
    
    // Linhas de dados
    ...data.map(row => {
      return keys.map(key => {
        // Garantir que valores com vírgulas ou quebras de linha sejam cercados por aspas duplas
        const cell = row[key] === null || row[key] === undefined ? '' : String(row[key]);
        const escapedCell = cell.includes(';') || cell.includes('\n') || cell.includes('"') 
          ? `"${cell.replace(/"/g, '""')}"`
          : cell;
        return escapedCell;
      }).join(';');
    })
  ];

  // Juntar tudo em uma string CSV
  const csvString = csvRows.join('\n');
  
  // Criar um blob com o conteúdo CSV
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
  // Criar um URL para o blob
  const url = URL.createObjectURL(blob);
  
  // Criar um elemento <a> para download
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  // Adicionar ao DOM, clicar e remover
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Converte um array de objetos para o formato Excel e faz o download
 * Esta é uma versão simplificada usando CSV, para uma exportação mais robusta
 * é recomendado utilizar bibliotecas como xlsx ou exceljs
 */
export const exportToExcel = <T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers?: Record<string, string>
): void => {
  exportToCSV(data, `${filename}.xls`, headers);
};
