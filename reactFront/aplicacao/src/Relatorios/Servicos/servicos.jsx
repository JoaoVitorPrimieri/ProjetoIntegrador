import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function servicosPDF(servicos) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Relatório de Serviços",
      fontSize: 18,
      alignment: "center",
      margin: [15, 20, 0, 45],
      bold: true,
    },
  ];

  const dados = servicos.map((servico) => {
    
    return [
                { text: servico.sernome, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: servico.servalorservicobase, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: servico.sermaquinaid, fontSize: 11, margin: [0, 2, 0, 2] },
            ]
  });
 
  const details = [
    {
      table: {
        headerRows: 1,
        widths: ["auto", "auto", "auto"],
        alignment: "center",
        body: [
          [
            { text: "Nome", style: "tableHeader", fontSize: 12 },
            { text: "Valor Base do Serviço", style: "tableHeader", fontSize: 12 },
            { text: "Maquina Alocada", style: "tableHeader", fontSize: 12 },
          ],
            ...dados,
        ],
      },
      layout: "headerLineOnly",
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + "/" + pageCount,
        alignment: "right",
        fontSize: 10,
        margin: [0, 10, 20, 0],
      },
    ];
  }

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    footer: Rodape,
  };

  pdfMake.createPdf(docDefinitions).download("Relatório de Servicos.pdf");
}

export default servicosPDF;
