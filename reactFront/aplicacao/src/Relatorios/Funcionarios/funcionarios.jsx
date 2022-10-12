import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function funcionariosPDF(funcionarios) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Relatório de Funcionários",
      fontSize: 18,
      alignment: "center",
      margin: [15, 20, 0, 45],
      bold: true,
    },
  ];

  const dados = funcionarios.map((funcionario) => {
    
    return [
                { text: funcionario.funnome, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: funcionario.funemail, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: funcionario.funcpf, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: funcionario.funtelefone, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: funcionario.funendereco, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: funcionario.funsexo, fontSize: 11, margin: [0, 2, 0, 2] },

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

  pdfMake.createPdf(docDefinitions).download("Relatório de Funcionários.pdf");
}

export default funcionariosPDF;
