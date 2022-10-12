import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function maquinasPDF(maquinas) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Relatório de Máquinas",
      fontSize: 18,
      alignment: "center",
      margin: [15, 20, 0, 45],
      bold: true,
    },
  ];

  const dados = maquinas.map((maquina) => {
    
    return [
                { text: maquina.maqmodelo, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: maquina.maqmarca, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: maquina.maqtipocombustivel, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: maquina.maqanofabricacao, ontSize: 11, margin: [0, 2, 0, 2] },
                { text: maquina.maqnmrchassi, fontSize: 11, margin: [0, 2, 0, 2] },
            ]
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ["auto", "auto", "auto", "auto", "auto"],
        alignment: "center",
        body: [
          [
            { text: "Modelo", style: "tableHeader", fontSize: 12 },
            { text: "Marca", style: "tableHeader", fontSize: 12 },
            { text: "Tipo Combustivel", style: "tableHeader", fontSize: 12 },
            { text: "Data de Fabricação", style: "tableHeader", fontSize: 12 },
            { text: "Número do Chassi", style: "tableHeader", fontSize: 12 },
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

  pdfMake.createPdf(docDefinitions).download("Relatório de Máquinas.pdf");
}

export default maquinasPDF;
