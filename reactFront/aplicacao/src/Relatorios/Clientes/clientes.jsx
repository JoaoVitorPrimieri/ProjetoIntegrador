import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function clientesPDF(clientes) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Relatório de Clientes",
      fontSize: 18,
      alignment: "center",
      margin: [15, 20, 0, 45],
      bold: true,
    },
  ];

  const dados = clientes.map((cliente) => {
    
    return [
                { text: cliente.clinome, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: cliente.cliemail, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: cliente.clicpf, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: cliente.clitelefone, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: cliente.cliendereco, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: cliente.clisexo, fontSize: 11, margin: [0, 2, 0, 2] },

            ]
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ["auto", "auto", "auto", "auto", "auto", "auto"],
        alignment: "center",
        body: [
          [
            { text: "Nome", style: "tableHeader", fontSize: 12 },
            { text: "Email", style: "tableHeader", fontSize: 12 },
            { text: "CPF", style: "tableHeader", fontSize: 12 },
            { text: "Telefone", style: "tableHeader", fontSize: 12 },
            { text: "Endereço", style: "tableHeader", fontSize: 12 },
            { text: "Sexo", style: "tableHeader", fontSize: 12 },
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

  pdfMake.createPdf(docDefinitions).download("Relatório de Clientes.pdf");
}

export default clientesPDF;
