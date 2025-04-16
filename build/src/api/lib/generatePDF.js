"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPdf = exports.generatePDF = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
// @ts-ignore
const pdfmake_1 = __importDefault(require("pdfmake"));
// const htmlToPdfmake = require("html-to-pdfmake");
// const htmlToText = require('html-to-text');
var fonts = {
    Courier: {
        normal: "Courier",
        bold: "Courier-Bold",
        italics: "Courier-Oblique",
        bolditalics: "Courier-BoldOblique"
    },
    Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique"
    },
    Roboto: {
        normal: "src/api/fonts/Roboto-Regular.ttf",
        bold: "src/api/fonts/Roboto-Medium.ttf",
        italics: "src/api/fonts/Roboto-Italic.ttf",
        bolditalics: "src/api/fonts/Roboto-MediumItalic.ttf"
    },
    Times: {
        normal: "Times-Roman",
        bold: "Times-Bold",
        italics: "Times-Italic",
        bolditalics: "Times-BoldItalic"
    },
    Symbol: {
        normal: "Symbol"
    },
    ZapfDingbats: {
        normal: "ZapfDingbats"
    }
};
var printer = new pdfmake_1.default(fonts);
const generatePDF = (htmlCode, outputPath, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // pdf.create(htmlCode).toFile(outputPath, (error:any, res:any) => {
        //   if (error) {
        //     console.error('Error generating PDF:', error);
        //   } else {
        //     console.log(`PDF generated successfully at: ${outputPath}`);
        //     // response.contentType('application/pdf');
        //     //response.send(res);
        //     response.download(outputPath, 'output.pdf', (err:any) => {
        //       if (err) {
        //         console.error('Error downloading PDF:', err);
        //         response.status(500).send('Error downloading PDF');
        //       } else {
        //         // Delete the generated PDF file after download
        //         fs.unlinkSync(outputPath);
        //       }
        //     });
        //   }
        // });
        var docDefinition = {
            pageSize: "A4",
            pageOrientation: "portrait",
            pageMargins: [40, 60, 40, 40],
            footer: function (currentPage, pageCount, pageSize) {
                return [
                    {
                        text: currentPage.toString() + " of " + pageCount,
                        alignment: (currentPage % 2) ? "left" : "right",
                        margin: [40, 0],
                        color: "#adaaaa",
                        fontSize: 10
                    },
                    { canvas: [{ type: "rect", x: 170, y: 32, w: pageSize.width - 170, h: 40 }] }
                ];
            },
            header: function (currentPage, pageCount, pageSize) {
                // you can apply any logic and return any valid pdfmake element
                return [
                    {
                        text: "jewellery - Scan Report",
                        alignment: "center",
                        margin: [0, 20],
                        fontSize: 16,
                        bold: true,
                        color: "#36b550"
                    },
                    {
                        canvas: [{
                                type: "line",
                                x1: 10,
                                y1: 10,
                                x2: pageSize.width - 10,
                                y2: 10,
                                lineWidth: 1,
                                lineColor: "#a9a9a9"
                            }]
                    }
                ];
            },
            // userPassword: "1234",
            // ownerPassword: "123456",
            permissions: {
                printing: "highResolution", //'lowResolution'
                modifying: false,
                copying: true,
                annotating: false,
                fillingForms: false,
                contentAccessibility: true,
                documentAssembly: true
            },
            content: htmlCode,
            pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                return currentNode.headlineLevel === 1;
            },
            styles: {
                "html-del": {
                    background: "#ffc3c3",
                    decoration: "none"
                },
                "html-ins": {
                    background: "#cfc",
                    bold: false
                },
                bgsuccess: {
                    background: "#cfc",
                    bold: false
                },
                bgremoved: {
                    background: "#FEC8C8",
                    decoration: "none"
                }
            }
        };
        var options = {};
        // create invoice and save it to invoices_pdf folder
        var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
        // pdfDoc.pipe(fs.createWriteStream(outputPath));
        var chunks = [];
        var result;
        // pdfDoc.pipe(fs.createWriteStream(outputPath));
        pdfDoc.on("data", function (chunk) {
            chunks.push(chunk);
        });
        pdfDoc.on("end", function () {
            result = Buffer.concat(chunks);
            // console.log(result);
            response.contentType("application/pdf");
            response.send(result);
        });
        pdfDoc.end();
        // response.setHeader('Content-disposition', 'attachment; filename=' + outputPath);
        // response.setHeader('Content-type', mimetype);
        //
        // var filestream = fs.createReadStream(outputPath);
        // filestream.pipe(response);
        // pdfDoc.on('finish', async () => {
        //   response.download(outputPath, "output.pdf", (err: any) => {
        //     if (err) {
        //       console.error("Error downloading PDF:", err);
        //       response.status(500).send("Error downloading PDF");
        //     } else {
        //       // Delete the generated PDF file after download
        //       fs.unlinkSync(outputPath);
        //
        //     }
        //   });
        // })
        // fs.createReadStream(outputPath)
        // response.download(outputPath, "output.pdf", (err: any) => {
        //   if (err) {
        //     console.error("Error downloading PDF:", err);
        //     response.status(500).send("Error downloading PDF");
        //   } else {
        //     // Delete the generated PDF file after download
        //     fs.unlinkSync(outputPath);
        //
        //   }
        // });
    }
    catch (error) {
        console.error("Error generating PDF:", error);
        response.status(500).send("Error downloading PDF");
    }
});
exports.generatePDF = generatePDF;
const getPdf = (html, outputPath, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var htmlStart = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>Apojee</title>
    <style> del {background-color: #ffc3c3} ins { background-color: #cfc; text-decoration: none }
        @media print { .pagebreak { page-break-before: always; }} </style>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    </head>
    <body class="mx-4">
    <div class="container-fluid my-3"><img src="data:image/png;base64,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" alt="" class="bg-dark mx-auto d-block">
        <div class="d-flex flex-column gap-4 mt-5">`;
        var htmlEnd = "</div></div></body></html>";
        var finalHtml = htmlStart + html + htmlEnd;
        yield fs_1.default.promises.writeFile(`${outputPath}.html`, finalHtml, 'utf8');
        console.log(__dirname);
        var contentHtml = fs_1.default.readFileSync(`${outputPath}.html`, 'utf8');
        // var filePath = __dirname + "/../../../" + outputPath;
        // console.log(filePath);
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.setContent(contentHtml);
        yield page.pdf({
            path: `${outputPath}.pdf`,
            format: "A4",
            margin: {
                top: "20px",
                left: "5px",
                right: "5px",
                bottom: "20px"
            },
            timeout: 0,
            printBackground: true,
            preferCSSPageSize: true,
        });
        yield browser.close();
        response.download(`${outputPath}.pdf`, "output.pdf", (err) => {
            if (err) {
                console.error("Error downloading PDF:", err);
                response.status(500).send("Error downloading PDF");
            }
            else {
                // Delete the generated PDF file after download
                fs_1.default.unlinkSync(`${outputPath}.pdf`);
                fs_1.default.unlinkSync(`${outputPath}.html`);
            }
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.getPdf = getPdf;
// export default generatePDF;
