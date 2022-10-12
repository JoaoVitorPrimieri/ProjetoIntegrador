import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function agendamentosPDF(agendamentos) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Relatório de Agendamentos",
      fontSize: 18,
      alignment: "center",
      margin: [15, 20, 0, 45],
      bold: true,
    },
  ];

  const dados = agendamentos.map((agendamento) => {
    
    return [
                { text: agendamento.agddata, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: agendamento.agdfuncionario, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: agendamento.agdservico, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: agendamento.agdusuario, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: agendamento.agdcliente, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: agendamento.agdqtdhoras, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: agendamento.agdvalortotal, fontSize: 11, margin: [0, 2, 0, 2] },

            ]
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto"],
        alignment: "center",
        body: [
          [
            { text: "Data do Agendamento", style: "tableHeader", fontSize: 12 },
            { text: "Funcionario Alocado", style: "tableHeader", fontSize: 12 },
            { text: "Serviço Realizado", style: "tableHeader", fontSize: 12 },
            { text: "Usuario Alocado", style: "tableHeader", fontSize: 12 },
            { text: "Cliente Alocado", style: "tableHeader", fontSize: 12 },
            { text: "Quantidade de Horas", style: "tableHeader", fontSize: 12 },
            { text: "Valor Total", style: "tableHeader", fontSize: 12 },

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

  pdfMake.createPdf(docDefinitions).download("Relatório de Agendamentos.pdf");
}

export default agendamentosPDF;
