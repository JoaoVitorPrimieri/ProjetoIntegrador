import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function usuariosPDF(usuarios) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Relatório de Usuários",
      fontSize: 18,
      alignment: "center",
      margin: [15, 20, 0, 45],
      bold: true,
    },
  ];

  const dados = usuarios.map((usuario) => {
    
    return [
                { text: usuario.usunome, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: usuario.usuemail, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: usuario.usucpf, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: usuario.usutelefone, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: usuario.usuendereco, fontSize: 11, margin: [0, 2, 0, 2] },
                { text: usuario.ususexo, fontSize: 11, margin: [0, 2, 0, 2] },

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

  pdfMake.createPdf(docDefinitions).download("Relatório de Usuários.pdf");
}

export default usuariosPDF;
