// import axios from "axios";
// import cheerio from "cheerio";
// import * as crypto from "crypto";
// import fs from "fs";
// import { XMLParser } from "fast-xml-parser";
// import date from "date-and-time";

// const proxyList = [
//   {
//     protocol: "http",
//     host: "2.56.119.93",
//     port: "5074"
//   },
//   {
//     protocol: "http",
//     host: "185.199.229.156",
//     port: "7492"
//   },
//   {
//     protocol: "http",
//     host: "185.199.228.220",
//     port: "7300"
//   },
//   {
//     protocol: "http",
//     host: "185.199.231.45",
//     port: "8382"
//   },
//   {
//     protocol: "http",
//     host: "188.74.210.207",
//     port: "6286"
//   },
//   {
//     protocol: "http",
//     host: "188.74.183.10",
//     port: "8279"
//   },
//   {
//     protocol: "http",
//     host: "188.74.210.21",
//     port: "6100"
//   },
//   {
//     protocol: "http",
//     host: "45.155.68.129",
//     port: "8133"
//   },
//   {
//     protocol: "http",
//     host: "154.95.36.199",
//     port: "6893"
//   },
//   {
//     protocol: "http",
//     host: "45.94.47.66",
//     port: "8110"
//   }
// ];

// // const pdfProxyList = [
// //   "http://ldngzeyr:d6hzq6qra3ha@2.56.119.93:5074",
// //   "http://ldngzeyr:d6hzq6qra3ha@185.199.229.156:7492",
// //   "http://ldngzeyr:d6hzq6qra3ha@185.199.228.220:7300",
// //   "http://ldngzeyr:d6hzq6qra3ha@185.199.231.45:8382",
// //   "http://ldngzeyr:d6hzq6qra3ha@188.74.210.207:6286",
// //   "http://ldngzeyr:d6hzq6qra3ha@188.74.183.10:8279",
// //   "http://ldngzeyr:d6hzq6qra3ha@188.74.210.21:6100",
// //   "http://ldngzeyr:d6hzq6qra3ha@45.155.68.129:8133",
// //   "http://ldngzeyr:d6hzq6qra3ha@154.95.36.199:6893",
// //   "http://ldngzeyr:d6hzq6qra3ha@45.94.47.66:8110"
// // ];
// const pdfProxyList = [
//   "http://ldngzeyr:d6hzq6qra3ha@2.56.119.93:5074",
//   "http://ldngzeyr:d6hzq6qra3ha@185.199.229.156:7492",
//   "http://ldngzeyr:d6hzq6qra3ha@185.199.228.220:7300",
//   "http://ldngzeyr:d6hzq6qra3ha@185.199.231.45:8382",
//   "http://ldngzeyr:d6hzq6qra3ha@188.74.210.207:6286",
//   "http://ldngzeyr:d6hzq6qra3ha@188.74.183.10:8279",
//   "http://ldngzeyr:d6hzq6qra3ha@188.74.210.21:6100",
//   "http://ldngzeyr:d6hzq6qra3ha@45.155.68.129:8133",
//   "http://ldngzeyr:d6hzq6qra3ha@154.95.36.199:6893",
//   "http://ldngzeyr:d6hzq6qra3ha@45.94.47.66:8110"
// ];


// const rotateProxy = () => {
//   const proxy: any = proxyList.shift();
//   proxyList.push(proxy);

//   return {
//     ...proxy,
//     auth: {
//       username: "ldngzeyr",
//       password: "d6hzq6qra3ha"
//     }
//   };
// };

// export function fetchDATA(url: string): Promise<string | undefined> {
//   //const agent = new HttpsProxyAgent('https://xtzdeead:0xx2k24ruvyj@2.56.119.93:5074');
//   const HTMLData: any = axios({
//     method: "get",
//     // httpsAgent: agent,
//     url: url
//   })
//     .then(res => res.data)
//     .catch((error: any) => {
//       console.error(`There was an error with ${error.config.url}.`);
//       console.error(error.toJSON());
//     });

//   return HTMLData;
//   // return HTMLData;
// }


// export const getOldECFR = async (url: any, data: any, i: number) => {
//   try {

//     var str = "/subject-group";
//     var contents: string = "";
//     if (url.includes(str)) {
//       //subject
//     } else {

//       if (url.includes("?toc=")) url = url.split("?toc=")[0];
//       var title = url.split("title-");
//       var title_1 = title[1].split("/");
//       var chapter = url.split("chapter-");
//       var chapter_1 = chapter[1].split("/");
//       var final_url = `https://www.ecfr.gov/api/versioner/v1/full/2023-07-03/title-${title_1[0]}.xml?chapter=${chapter_1[0]}`;

//       var subtitle_2 = "";
//       if (url.includes("subtitle-")) {
//         var subtitle = url.split("subtitle-");
//         var subtitle_1 = subtitle[1].split("/");
//         subtitle_2 = subtitle_1[0];
//         final_url += `&subtitle=${subtitle_2}`;
//       }
//       var subchapter_2 = "";
//       if (url.includes("subchapter-")) {
//         var subchapter = url.split("subchapter-");
//         var subchapter_1 = subchapter[1].split("/");
//         subchapter_2 = subchapter_1[0];
//         final_url += `&subchapter=${subchapter_2}`;
//       }
//       var part = url.split("part-");
//       var part_1 = part[1].split("/");
//       final_url += `&part=${part_1[0]}`;
//       var subpart_2 = "";
//       if (url.includes("subpart-")) {
//         var subpart = url.split("subpart-");
//         var subpart_1 = subpart[1].split("/");
//         subpart_2 = subpart_1[0];
//         final_url += `&subpart=${subpart_2}`;
//       }
//       var section_2 = "";
//       if (url.includes("section-")) {
//         var section = url.split("section-");
//         var section_1 = section[1].split("/");
//         section_2 = section_1[0];
//         final_url += `&section=${section_2}`;
//       }


//       var XMLdata: any = await fetchDATA(final_url);
//       contents = XMLdata;
//       console.log(final_url, "final_url");
//       if (url.includes("#p")) {
//         var t1 = url.split("p-");
//         var t2 = t1[1].split("(");
//         var t3 = t2[0].split(".");
//         //var out = "(" + t2[1];
//         const xmlCode = XMLdata;
//         const sectionNumber = t3[0] + "\\." + t3[1];
//         const sectionRegex = new RegExp(`<DIV8 N="${sectionNumber}[^"]*" TYPE="SECTION" VOLUME="[^"]*" hierarchy_metadata="[^"]*">(.*?)<\/DIV8>`, "s");
//         const sectionMatch = xmlCode.match(sectionRegex);
//         if (sectionMatch) {
//           //  console.log(sectionMatch[1],'sectionMatch');
//           contents = sectionMatch[1].replaceAll("\n", "");

//         }
//       }
//       if (url.includes("#subject-group")) {
//         var t1 = url.split("#subject-group-");
//         const xmlCode = XMLdata;
//         const sectionNumber = t1[1];
//         console.log(t1[1]);
//         const sectionRegex = new RegExp(`<DIV7 N="${sectionNumber}" TYPE="SUBJGRP" hierarchy_metadata="[^"]*">(.*?)<\/DIV7>`, "s");
//         const sectionMatch = xmlCode.match(sectionRegex);
//         if (sectionMatch) {
//           console.log(sectionMatch[1], "sectionMatch");
//           contents = sectionMatch[1].replaceAll("\n", "");
//         }
//       }
//       if (url.includes("#subpart")) {
//         var t1 = url.split("subpart-");
//         const xmlCode = XMLdata;
//         const sectionNumber = t1[1];
//         console.log(sectionNumber);
//         const sectionRegex = new RegExp(`<DIV6 N="${sectionNumber}[^"]*" TYPE="SUBPART" hierarchy_metadata="[^"]*">(.*?)<\/DIV6>`, "s");
//         const sectionMatch = xmlCode.match(sectionRegex);
//         if (sectionMatch) {
//           console.log(sectionMatch[1], "sectionMatch");
//           contents = sectionMatch[1].replaceAll("\n", "");
//         }
//       }
//     }
//     const encodeStr = Buffer.from(contents, "utf8").toString("base64"); //crypto.createHash('md5').update(contents).digest("hex");
//     var payload: any = {
//       citationContent: contents,
//       citationCount: encodeStr.length
//     };
//     console.log("citationCount", encodeStr.length);
//     var where: any = {
//       obligationId: data[i].id
//     };
//     console.log("where", where);
//     updateOldObligationContent(payload, where, async (err: any, data: any, count: number) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//       }
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const getECFR = async (url: any, data: any, i: number, newReportId: any, prevData: any) => {
//   try {

//     var str = "/subject-group";
//     var contents: string = "";
//     console.log(url);
//     if (url.includes(str)) {

//     } else {

//       if (url.includes("?toc=")) url = url.split("?toc=")[0];
//       var title = url.split("title-");
//       var title_1 = title[1].split("/");
//       var chapter = url.split("chapter-");
//       var chapter_1 = chapter[1].split("/");
//       var lastUpdatedApiUrl = "https://www.ecfr.gov/api/versioner/v1/titles.json";
//       var oldArray: any = await fetchDATA(lastUpdatedApiUrl);
//       var newArray = oldArray.titles.filter((obj: any) => {
//         return obj.number == title_1[0];
//       });
//       console.log("Date", newArray[0].up_to_date_as_of);
//       var final_url = `https://www.ecfr.gov/api/versioner/v1/full/${newArray[0].up_to_date_as_of}/title-${title_1[0]}.xml?chapter=${chapter_1[0]}`;

//       var subtitle_2 = "";
//       if (url.includes("subtitle-")) {
//         var subtitle = url.split("subtitle-");
//         var subtitle_1 = subtitle[1].split("/");
//         subtitle_2 = subtitle_1[0];
//         final_url += `&subtitle=${subtitle_2}`;
//       }
//       var subchapter_2 = "";
//       if (url.includes("subchapter-")) {
//         var subchapter = url.split("subchapter-");
//         var subchapter_1 = subchapter[1].split("/");
//         subchapter_2 = subchapter_1[0];
//         final_url += `&subchapter=${subchapter_2}`;
//       }
//       var part = url.split("part-");
//       var part_1 = part[1].split("/");
//       final_url += `&part=${part_1[0]}`;
//       var subpart_2 = "";
//       if (url.includes("subpart-")) {
//         var subpart = url.split("subpart-");
//         var subpart_1 = subpart[1].split("/");
//         subpart_2 = subpart_1[0];
//         final_url += `&subpart=${subpart_2}`;
//       }
//       var section_2 = "";
//       if (url.includes("section-")) {
//         var section = url.split("section-");
//         var section_1 = section[1].split("/");
//         section_2 = section_1[0];
//         final_url += `&section=${section_2}`;
//       }

//       //    var final_url = `/title-${title_1[0]}.xml?chapter=${chapter_1[0]}&part=${part_1[0]}&subpart=${subpart_1[0]}&section=${section_1}`;
//       var newXMLdata: any = await fetchDATA(final_url);
//       console.log(final_url, "final_url");
//       const parser = new XMLParser();

//       contents = newXMLdata;
//       if (url.includes("#p")) {
//         var t1 = url.split("p-");
//         var t2 = t1[1].split("(");
//         var t3 = t2[0].split(".");
//         //var out = "(" + t2[1];
//         const xmlCode = newXMLdata;
//         const sectionNumber = t3[0] + "\\." + t3[1];
//         const sectionRegex = new RegExp(`<DIV8 N="${sectionNumber}[^"]*" TYPE="SECTION" VOLUME="[^"]*" hierarchy_metadata="[^"]*">(.*?)<\/DIV8>`, "s");
//         const sectionMatch = xmlCode.match(sectionRegex);
//         if (sectionMatch) {
//           contents = sectionMatch[1].replaceAll("\n", "");
//           newXMLdata = sectionMatch[1].replaceAll("\n", "");
//         }
//       }
//       if (url.includes("#subject-group")) {
//         var t1 = url.split("#subject-group-");
//         const xmlCode = newXMLdata;
//         const sectionNumber = t1[1];
//         console.log(t1[1]);
//         const sectionRegex = new RegExp(`<DIV7 N="${sectionNumber}" TYPE="SUBJGRP" hierarchy_metadata="[^"]*">(.*?)<\/DIV7>`, "s");
//         const sectionMatch = xmlCode.match(sectionRegex);
//         if (sectionMatch) {
//           console.log(sectionMatch[1], "sectionMatch");
//           contents = sectionMatch[1].replaceAll("\n", "");
//           newXMLdata = sectionMatch[1].replaceAll("\n", "");
//         }
//       }
//       if (url.includes("#subpart")) {
//         var t1 = url.split("subpart-");
//         const xmlCode = newXMLdata;
//         const sectionNumber = t1[1];
//         console.log(sectionNumber);
//         const sectionRegex = new RegExp(`<DIV6 N="${sectionNumber}[^"]*" TYPE="SUBPART" hierarchy_metadata="[^"]*">(.*?)<\/DIV6>`, "s");
//         const sectionMatch = xmlCode.match(sectionRegex);
//         if (sectionMatch) {
//           console.log(sectionMatch[1], "sectionMatch");
//           contents = sectionMatch[1].replaceAll("\n", "");
//           newXMLdata = sectionMatch[1].replaceAll("\n", "");
//         }
//       }
//       const encodeStr = Buffer.from(contents, "utf8").toString("base64");
//       console.log(data[i].citationCount, " !== ", encodeStr.length);
//       if (data[i].citationCount !== encodeStr.length) {
//         console.log("TRUE", final_url);
//         // new HTML
//         var html = "";
//         var html1 = "";
//         if (!(url.includes("#p") || url.includes("#subject-group") || url.includes("#subpart"))) {
//           let jObjnew = parser.parse(newXMLdata);
//           if (jObjnew.DIV6 !== undefined) {
//             html += `<h4>${jObjnew.DIV6.HEAD}</h4><div>`;
//             html += `<h5><b>${jObjnew.DIV6.SOURCE.HED}</b>${jObjnew.DIV6.SOURCE.PSPACE}</h5><div>`;
//             if (jObjnew.DIV6.DIV8 !== undefined) {
//               jObjnew.DIV6.DIV8.forEach((div8: any) => {
//                 html += `<h5>${div8.HEAD}</h5><div>`;
//                 div8.P.forEach((e: any) => {
//                   if (e["I"] !== undefined) {
//                     html += `<p><b>${e["I"]} :</b>`;
//                     html += `${e["#text"]}</p>`;
//                   } else {
//                     html += `<p>${e}</p>`;
//                   }
//                 });
//                 if (div8.CITA !== undefined) {
//                   html += `<br/><div>${div8.CITA}</div>`;
//                 }
//               });
//             }
//           }
//           if (jObjnew.DIV5 !== undefined) {
//             html += `<h4>${jObjnew.DIV5.HEAD}</h4><div>`;
//             html += `<p><b>${jObjnew.DIV5.AUTH.HED}</b>${jObjnew.DIV5.AUTH.PSPACE}</p><div>`;
//             html += `<p><b>${jObjnew.DIV5.SOURCE.HED}</b>${jObjnew.DIV5.SOURCE.PSPACE}</p><div>`;
//             if (jObjnew.DIV5.DIV8 !== undefined) {
//               jObjnew.DIV5.DIV8.forEach((div8: any) => {
//                 html += `<h5>${div8.HEAD}</h5><div>`;
//                 div8.P.forEach((e: any) => {
//                   if (e["I"] !== undefined) {
//                     if (typeof e["I"] == "number")
//                       html += `<p><b>(${e["I"]}) :</b>`;
//                     else
//                       html += `<p><b>${e["I"]} :</b>`;
//                     html += `${e["#text"]}</p>`;
//                   } else {
//                     html += `<p>${e}</p>`;
//                   }
//                 });
//                 if (div8.CITA !== undefined) {
//                   html += `<br/><div>${div8.CITA}</div>`;
//                 }
//               });
//             } else if (jObjnew.DIV5.DIV6 !== undefined) {
//               jObjnew.DIV5.DIV6.forEach((div6: any) => {
//                 html += `<h5>${div6.HEAD}</h5><div>`;
//                 // if(div6.AUTH!=undefined) html += `<h5><b>${div6.AUTH.HED}</b>${div6.AUTH.PSPACE}</h5><div>`;
//                 // if(div6.SOURCE!=undefined) html += `<h5><b>${div6.SOURCE.HED}</b>${div6.SOURCE.PSPACE}</h5><div>`;
//                 if (div6.DIV8 !== undefined) {
//                   //div6.DIV8.forEach((div8: any) => {
//                   var div8 = div6.DIV8;
//                   console.log(Array.isArray(div8), "is Array div8 or object?");
//                   if (Array.isArray(div8)) {
//                     div8.forEach((div88: any) => {
//                       html += `<h5>${div88.HEAD}</h5><div>`;
//                       console.log(typeof div88.P, "(typeof div88.P");
//                       if (typeof div88.P == "string") {
//                         html += `<p>${div88.P}</p>`;
//                       } else if (typeof div88.P !== "undefined") {

//                         if (Array.isArray(div88.P)) {
//                           //   html1 += `<p><b>${div88.P} :</b>`;
//                           // } else {
//                           div88.P.forEach((e: any) => {
//                             if (e["I"] !== undefined) {
//                               html += `<p><b>${e["I"]} :</b>`;
//                               html += `${e["#text"]}</p>`;
//                             } else {
//                               html += `<p>${e}</p>`;
//                             }
//                           });
//                         } else {
//                           if (div88.P["I"] !== undefined) {
//                             if (typeof div88.P["I"] == "number")
//                               html += `<p><b>(${div88.P["I"]}) :</b>`;
//                             else
//                               html += `<p><b>${div88.P["I"]} :</b>`;
//                             html += `${div88.P["#text"]}</p>`;
//                           } else {
//                             html += `<p>${div88.P}</p>`;
//                           }
//                           //  console.log(JSON.stringify(div88.P));
//                         }
//                       }

//                       if (div88.CITA !== undefined) {
//                         html += `<br/><div>${div88.CITA}</div>`;
//                       }

//                     });
//                   } else {
//                     html += `<h5>${div8.HEAD}</h5><div>`;
//                     if (typeof div8.P == "string") {
//                       html += `<p>${div8.P}</p>`;
//                     } else if (typeof div8.P != "undefined") {
//                       div8.P.forEach((e: any) => {
//                         if (e["I"] !== undefined) {
//                           if (typeof e["I"] == "number")
//                             html += `<p><b>(${e["I"]}) :</b>`;
//                           else
//                             html += `<p><b>${e["I"]} :</b>`;
//                           html += `${e["#text"]}</p>`;
//                         } else {
//                           html += `<p>${e}</p>`;
//                         }
//                       });
//                     }

//                     if (div8.CITA !== undefined) {
//                       html += `<br/><div>${div8.CITA}</div>`;
//                     }
//                   }
//                   // });
//                 }

//               });
//             }
//           }
//           if (jObjnew.DIV8 !== undefined) {
//             html += `<h4>${jObjnew.DIV8.HEAD}</h4><div>`;
//             jObjnew.DIV8.P.forEach((e: any) => {
//               if (e["I"] !== undefined) {
//                 if (typeof e["I"] == "number")
//                   html += `<p><b>(${e["I"]}) :</b>`;
//                 else
//                   html += `<p><b>${e["I"]} :</b>`;
//                 html += `${e["#text"]}</p>`;
//               } else {
//                 html += `<p>${e}</p>`;
//               }
//             });
//             if (jObjnew.DIV8.CITA !== undefined) {
//               html += `<br/><div>${jObjnew.DIV8.CITA}</div>`;
//             }
//           }
//           // new HTML
//           // Old html

//           var XMLdataOld = data[i].citationContent;
//           let jObj = parser.parse(XMLdataOld);
//           if (jObj.DIV6 !== undefined) {
//             html1 += `<h4>${jObj.DIV6.HEAD}</h4><div>`;
//             html1 += `<h5><b>${jObj.DIV6.SOURCE.HED}</b>${jObj.DIV6.SOURCE.PSPACE}</h5><div>`;
//             if (jObj.DIV6.DIV8 !== undefined) {
//               jObj.DIV6.DIV8.forEach((div8: any) => {
//                 html1 += `<h5>${div8.HEAD}</h5><div>`;
//                 div8.P.forEach((e: any) => {
//                   if (e["I"] !== undefined) {
//                     if (typeof e["I"] == "number")
//                       html1 += `<p><b>(${e["I"]}) :</b>`;
//                     else
//                       html1 += `<p><b>${e["I"]} :</b>`;
//                     html1 += `${e["#text"]}</p>`;
//                   } else {
//                     html1 += `<p>${e}</p>`;
//                   }
//                 });
//                 if (div8.CITA !== undefined) {
//                   html1 += `<br/><div>${div8.CITA}</div>`;
//                 }
//               });
//             }
//           }
//           if (jObj.DIV5 !== undefined) {
//             html1 += `<h4>${jObj.DIV5.HEAD}</h4><div>`;
//             html1 += `<p><b>${jObj.DIV5.AUTH.HED}</b>${jObj.DIV5.AUTH.PSPACE}</p><div>`;
//             html1 += `<p><b>${jObj.DIV5.SOURCE.HED}</b>${jObj.DIV5.SOURCE.PSPACE}</p><div>`;
//             if (jObj.DIV5.DIV8 !== undefined) {
//               jObj.DIV5.DIV8.forEach((div8: any) => {
//                 html1 += `<h5>${div8.HEAD}</h5><div>`;
//                 div8.P.forEach((e: any) => {
//                   if (e["I"] !== undefined) {
//                     if (typeof e["I"] == "number")
//                       html1 += `<p><b>(${e["I"]}) :</b>`;
//                     else
//                       html1 += `<p><b>${e["I"]} :</b>`;
//                     html1 += `${e["#text"]}</p>`;
//                   } else {
//                     html1 += `<p>${e}</p>`;
//                   }
//                 });
//                 if (div8.CITA !== undefined) {
//                   html1 += `<br/><div>${div8.CITA}</div>`;
//                 }
//               });
//             } else if (jObj.DIV5.DIV6 !== undefined) {
//               jObj.DIV5.DIV6.forEach((div6: any) => {
//                 html1 += `<h5>${div6.HEAD}</h5><div>`;
//                 // if(div6.AUTH!=undefined) html1 += `<h5><b>${div6.AUTH.HED}</b>${div6.AUTH.PSPACE}</h5><div>`;
//                 // if(div6.SOURCE!=undefined) html1 += `<h5><b>${div6.SOURCE.HED}</b>${div6.SOURCE.PSPACE}</h5><div>`;
//                 if (div6.DIV8 !== undefined) {

//                   var div8 = div6.DIV8;
//                   console.log(Array.isArray(div8), "is Array div8 or object?");
//                   if (Array.isArray(div8)) {
//                     div8.forEach((div88: any) => {
//                       html1 += `<h4>${div88.HEAD}</h4><div>`;
//                       console.log(typeof div88.P, "(typeof div88.P");
//                       if (typeof div88.P == "string") {
//                         html1 += `<p>${div88.P}</p>`;
//                       } else if (typeof div88.P !== "undefined") {

//                         //if (typeof div88.P != "object") {
//                         if (Array.isArray(div88.P)) {
//                           //   html1 += `<p><b>${div88.P} :</b>`;
//                           // } else {
//                           div88.P.forEach((e: any) => {
//                             if (e["I"] !== undefined) {
//                               if (typeof e["I"] == "number")
//                                 html1 += `<p><b>(${e["I"]}) :</b>`;
//                               else
//                                 html1 += `<p><b>${e["I"]} :</b>`;
//                               html1 += `${e["#text"]}</p>`;
//                             } else {
//                               html1 += `<p>${e}</p>`;
//                             }
//                           });
//                         } else {
//                           if (div88.P["I"] !== undefined) {
//                             if (typeof div88.P["I"] == "number")
//                               html1 += `<p><b>(${div88.P["I"]}) :</b>`;
//                             else
//                               html1 += `<p><b>${div88.P["I"]} :</b>`;
//                             html1 += `${div88.P["#text"]}</p>`;
//                           } else {
//                             html1 += `<p>${div88.P}</p>`;
//                           }
//                           //  console.log(JSON.stringify(div88.P));
//                         }
//                       }

//                       if (div88.CITA !== undefined) {
//                         html1 += `<br/><div>${div88.CITA}</div>`;
//                       }

//                     });
//                   } else {
//                     html1 += `<h4>${div8.HEAD}</h4><div>`;
//                     if (typeof div8.P == "string") {
//                       html1 += `<p>${div8.P}</p>`;
//                     } else if (typeof div8.P != "undefined") {
//                       div8.P.forEach((e: any) => {
//                         if (e["I"] !== undefined) {
//                           if (typeof e["I"] == "number")
//                             html1 += `<p><b>(${e["I"]}):</b>`;
//                           else
//                             html1 += `<p><b>${e["I"]} :</b>`;
//                           html1 += `${e["#text"]}</p>`;
//                         } else {
//                           html1 += `<p>${e}</p>`;
//                         }
//                       });
//                     }

//                     if (div8.CITA !== undefined) {
//                       html1 += `<br/><div>${div8.CITA}</div>`;
//                     }
//                   }

//                 }
//               });
//             }
//           }
//           if (jObj.DIV8 !== undefined) {
//             html1 += `<h4>${jObj.DIV8.HEAD}</h4><div>`;
//             jObj.DIV8.P.forEach((e: any) => {
//               if (e["I"] !== undefined) {
//                 if (typeof e["I"] == "number")
//                   html1 += `<p><b>(${e["I"]}) :</b>`;
//                 else
//                   html1 += `<p><b>${e["I"]} :</b>`;
//                 html1 += `${e["#text"]}</p>`;
//               } else {
//                 html1 += `<p>${e}</p>`;
//               }
//             });
//             if (jObj.DIV8.CITA !== undefined) {
//               html1 += `<br/><div>${jObj.DIV8.CITA}</div>`;
//             }
//           }
//           while (html.includes("()")) {
//             html = html.replace("()", "");
//           }
//           while (html1.includes("()")) {
//             html1 = html1.replace("()", "");
//           }
//         } else {
//           html1 = data[i].citationContent;
//           html = newXMLdata;

//         }
//         // const diff: JsDiff.Change[] = JsDiff.diffChars(html1, html);

//         // let highlightedResult = '';
//         // diff.forEach((part: JsDiff.Change) => {
//         //   const color = '';
//         //   const tag = part.added || part.removed ? '<b>' : '';
//         //   highlightedResult += color + (tag ? `<b>${part.value}</b>` : part.value);
//         //   html=highlightedResult;
//         // });


//         // Old html
//         var payload: any = {
//           obligationDesc: html,
//           oldobligationDesc: html1,
//           citationCount: encodeStr.length,
//           obId: data[i].obId,
//           prevUpdatedDate: (prevData.createdDate!==undefined)?prevData.createdDate:date.format(new Date(), "YYYY-MM-DD HH:mm:ss")
//         };
//         //console.log("payload", payload);
//         var where: any = {
//           obligationId: data[i].id
//         };
//         createNewObligationReport(payload, where, newReportId, async (err: any, data: any, count: number) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         });
//       }

//     }
//   } catch (e) {
//     console.log(e);
//   }
// };


// export const getOldFinra = async (url: any, data: any, i: number) => {
//   try {

//     await axios
//       .get(url)
//       .then(async (response) => {
//         console.log("****");
//         const $ = cheerio.load(response.data);

//         var featuredArticles;
//         // if (url.includes("#")) {
//         //   var urlParts = url.split("#");
//         //
//         //   console.log(url);
//         //   console.log(urlParts);
//         //
//         //   var key = `#${urlParts[1]}`;
//         //
//         //   featuredArticles = $(key);
//         //
//         //   // featuredArticles = $("#block-body");
//         // } else {
//         //   featuredArticles = $("#block-body");
//         // }

//         // featuredArticles = $("#content");
//         featuredArticles = $("#block-body");

//         var content = featuredArticles.text();
//         var htmlContent = featuredArticles.html();

//         var html = `<html><body>${htmlContent}</body></html>`;
//         const encodeStr = Buffer.from(html, "utf8").toString("base64"); //crypto.createHash('md5').update(contents).digest("hex");
//         var payload: any = {
//           citationContent: html,
//           citationCount: encodeStr.length
//         };
//         console.log("citationCount", encodeStr.length);
//         var where: any = {
//           obligationId: data[i].id,
//           ob_id: data[i].obId
//         };
//         console.log("where", where);
//         await updateOldObligationContent(payload, where, async (err: any, data: any, count: number) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         });
//       })
//       .catch((err) => {
//         console.log("Fetch error " + err);
//         return err;
//       });
//   } catch (e) {
//     console.log(e);
//   }


// };

// export const getFinra = async (url: any, data: any, i: number, newReportId: any, prevData: any) => {
//   try {

//     await axios
//       .get(url, {
//         proxy: rotateProxy()
//       })
//       .then((response) => {
//         const $ = cheerio.load(response.data);

//         var featuredArticles;

//         // if (url.includes("#")) {
//         //   var urlParts = url.split("#");
//         //
//         //   console.log(url);
//         //   console.log(urlParts);
//         //
//         //   var key = `#${urlParts[1]}`;
//         //
//         //   featuredArticles = $(key);
//         //
//         //   // featuredArticles = $("#block-body");
//         // } else {
//         featuredArticles = $("#block-body");
//         // }
//         var content = featuredArticles.text();
//         var htmlContent = featuredArticles.html();

//         var html = `<html><body>${htmlContent}</body></html>`;
//         const encodeStr = Buffer.from(html, "utf8").toString("base64");
//         console.log(data[i].citationCount, " !== ", encodeStr.length);


//         if (data[i].citationCount !== encodeStr.length) {
//           var payload: any = {
//             obligationDesc: html,
//             oldobligationDesc: data[i].citationContent,
//             citationCount: encodeStr.length,
//             obId: data[i].obId,
//             prevUpdatedDate: prevData.createdDate
//           };
//           //console.log("payload", payload);
//           var where: any = {
//             obligationId: data[i].id
//           };
//           createNewObligationReport(payload, where, newReportId, async (err: any, data: any, count: number) => {
//             if (err) {
//               console.log(err);
//             } else {
//               console.log(data);
//             }
//           });
//         }

//       })
//       .catch((err) => {
//         console.log("Fetch error " + err);
//         return err;
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };


// export const getOldLegislativeInfo = async (url: any, data: any, i: number) => {
//   try {
//     await axios
//       .get(url, {
//         proxy: rotateProxy()
//       })
//       .then((response) => {
//         const $ = cheerio.load(response.data);

//         // var featuredArticles;

//         var featuredArticles;

//         if (url.includes("#")) {
//           var urlParts = url.split("#");

//           console.log(url);
//           console.log(urlParts);
//           var key = `#${urlParts[1]}`;

//           featuredArticles = $(key);
//           // contentUrl = featuredArticles.find(key);
//         } else {
//           featuredArticles = $("#single_law_section");
//           // contentUrl = featuredArticles.find('.block__flush-top')[0];
//         }
//         $("input").remove();

//         // var contentUrl = featuredArticles.find('.block__flush-top')[0];
//         var content = $(featuredArticles).text();
//         var htmlContent: any = $(featuredArticles).html();

//         var html = `<html><body>${htmlContent}</body></html>`;

//         const encodeStr = Buffer.from(htmlContent, "utf8").toString("base64"); //crypto.createHash('md5').update(contents).digest("hex");
//         var payload: any = {
//           citationContent: html,
//           citationCount: encodeStr.length
//         };
//         console.log("citationCount", encodeStr.length);
//         var where: any = {
//           obligationId: data[i].id
//         };
//         console.log("where", where);
//         updateOldObligationContent(payload, where, async (err: any, data: any, count: number) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         });

//       })
//       .catch((err) => {
//         console.log("Fetch error " + err);
//         return err;
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const getLegislativeInfo = async (url: any, data: any, i: number, newReportId: any, prevData: any) => {
//   try {
//     await axios
//       .get(url, {
//         proxy: rotateProxy()
//       })
//       .then((response) => {
//         const $ = cheerio.load(response.data);

//         // var featuredArticles;
//         $("input").remove();
//         var featuredArticles;

//         if (url.includes("#")) {
//           var urlParts = url.split("#");

//           console.log(url);
//           console.log(urlParts);
//           var key = `#${urlParts[1]}`;

//           featuredArticles = $(key);
//           // contentUrl = featuredArticles.find(key);
//         } else {
//           featuredArticles = $("#single_law_section");
//           // contentUrl = featuredArticles.find('.block__flush-top')[0];
//         }

//         // var contentUrl = featuredArticles.find('.block__flush-top')[0];
//         var content = $(featuredArticles).text();
//         var htmlContent: any = $(featuredArticles).html();

//         var html = `<html><body>${htmlContent}</body></html>`;


//         const encodeStr = Buffer.from(htmlContent, "utf8").toString("base64");
//         console.log(data[i].citationCount, " !== ", encodeStr.length);
//         if (data[i].citationCount !== encodeStr.length) {
//           var payload: any = {
//             obligationDesc: html,
//             oldobligationDesc: data[i].citationContent,
//             citationCount: encodeStr.length,
//             obId: data[i].obId,
//             prevUpdatedDate: prevData.createdDate
//           };
//           //console.log("payload", payload);
//           var where: any = {
//             obligationId: data[i].id
//           };
//           createNewObligationReport(payload, where, newReportId, async (err: any, data: any, count: number) => {
//             if (err) {
//               console.log(err);
//             } else {
//               console.log(data);
//             }
//           });
//         }

//       })
//       .catch((err) => {
//         console.log("Fetch error " + err);
//         return err;
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };


// export const getOldUSCodeHouse = async (url: any, data: any, i: number) => {
//   try {
//     await axios
//       .get(url, {
//         proxy: rotateProxy()
//       })
//       .then((response) => {
//         const $ = cheerio.load(response.data);

//         var featuredArticles;

//         featuredArticles = $("#docViewer");

//         var content = featuredArticles.text();
//         var htmlContent = featuredArticles.html();

//         var html = `<html><body>${htmlContent}</body></html>`;
//         const encodeStr = Buffer.from(html, "utf8").toString("base64"); //crypto.createHash('md5').update(contents).digest("hex");
//         var payload: any = {
//           citationContent: html,
//           citationCount: encodeStr.length
//         };
//         console.log("citationCount", encodeStr.length);
//         var where: any = {
//           obligationId: data[i].id
//         };
//         console.log("where", where);
//         updateOldObligationContent(payload, where, async (err: any, data: any, count: number) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         });
//       })
//       .catch((err) => {
//         console.log("Fetch error " + err);
//         return err;
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const getUSCodeHouse = async (url: any, data: any, i: number, newReportId: any, prevData: any) => {
//   try {
//     await axios
//       .get(url, {
//         proxy: rotateProxy()
//       })
//       .then((response) => {
//         const $ = cheerio.load(response.data);

//         var featuredArticles;

//         featuredArticles = $("#docViewer");

//         var content = featuredArticles.text();

//         var htmlContent = featuredArticles.html();

//         var html = `<html><body>${htmlContent}</body></html>`;
//         const encodeStr = Buffer.from(html, "utf8").toString("base64");
//         console.log(data[i].citationCount, " !== ", encodeStr.length);

//         if (data[i].citationCount !== encodeStr.length) {
//           var payload: any = {
//             obligationDesc: html,
//             oldobligationDesc: data[i].citationContent,
//             citationCount: encodeStr.length,
//             obId: data[i].obId,
//             prevUpdatedDate: prevData.createdDate
//           };
//           //console.log("payload", payload);
//           var where: any = {
//             obligationId: data[i].id
//           };
//           createNewObligationReport(payload, where, newReportId, async (err: any, data: any, count: number) => {
//             if (err) {
//               console.log(err);
//             } else {
//               console.log(data);
//             }
//           });
//         }

//       })
//       .catch((err) => {
//         console.log("Fetch error " + err);
//         return err;
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };


// export const getOldJustice = async (url: any, data: any, i: number) => {
//   try {
//     await axios
//       .get(url, {
//         proxy: rotateProxy()
//       })
//       .then((response) => {
//         const $ = cheerio.load(response.data);

//         const featuredArticles = $(".wb-txthl");


//         var links = featuredArticles.find('a');

//         Array.from(links).map((a) => {
//           console.log($(a).attr('id'))
//           var href = $(a).attr('href')
//           console.log(href)
//           console.log(url)

//           if (href != undefined) {
//             var newUrl = url.replace(/\/[^\/]*$/, `/${href}`)
//             console.log(newUrl)

//             $(a).attr('href', newUrl)
//           }
//         })

//         var content = featuredArticles.text();
//         var htmlContent = featuredArticles.html();

//         var html = `<html><body>${htmlContent}</body></html>`;
//         const encodeStr = Buffer.from(html, "utf8").toString("base64"); //crypto.createHash('md5').update(contents).digest("hex");
//         var payload: any = {
//           citationContent: html,
//           citationCount: encodeStr.length
//         };
//         console.log("citationCount", encodeStr.length);
//         var where: any = {
//           obligationId: data[i].id
//         };
//         console.log("where", where);
//         updateOldObligationContent(payload, where, async (err: any, data: any, count: number) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         });
//       })
//       .catch((err) => {
//         console.log("Fetch error " + err);
//         return err;
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const getJustice = async (url: any, data: any, i: number, newReportId: any, prevData: any) => {
//   try {
//     await axios
//       .get(url, {
//         proxy: rotateProxy()
//       })
//       .then((response) => {
//         const $ = cheerio.load(response.data);

//         const featuredArticles = $(".wb-txthl");


//         var links = featuredArticles.find('a');

//         Array.from(links).map((a) => {
//           console.log($(a).attr('id'))
//           var href = $(a).attr('href')
//           console.log(href)
//           console.log(url)

//           if (href != undefined) {
//             var newUrl = url.replace(/\/[^\/]*$/, `/${href}`)
//             console.log(newUrl)

//             $(a).attr('href', newUrl)
//           }
//         })

//         var content = featuredArticles.text();
//         var htmlContent = featuredArticles.html();

//         // var featuredArticles;
//         //
//         // featuredArticles = $("#docViewer");
//         //
//         // var content = featuredArticles.text();
//         //
//         // var htmlContent = featuredArticles.html();

//         var html = `<html><body>${htmlContent}</body></html>`;
//         const encodeStr = Buffer.from(html, "utf8").toString("base64");
//         console.log(data[i].citationCount, " !== ", encodeStr.length);

//         if (data[i].citationCount !== encodeStr.length) {
//           var payload: any = {
//             obligationDesc: html,
//             oldobligationDesc: data[i].citationContent,
//             citationCount: encodeStr.length,
//             obId: data[i].obId,
//             prevUpdatedDate: prevData.createdDate
//           };
//           //console.log("payload", payload);
//           var where: any = {
//             obligationId: data[i].id
//           };
//           createNewObligationReport(payload, where, newReportId, async (err: any, data: any, count: number) => {
//             if (err) {
//               console.log(err);
//             } else {
//               console.log(data);
//             }
//           });
//         }

//       })
//       .catch((err) => {
//         console.log("Fetch error " + err);
//         return err;
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };


// export const getOldConsumerFinance = async (url: any, data: any, i: number) => {
//   try {
//     await axios
//       .get(url, {
//         proxy: rotateProxy()
//       })
//       .then((response) => {
//         const $ = cheerio.load(response.data);

//         const featuredArticles = $("#content_main");

//         featuredArticles.find('.o-expandable_cues').remove()

//         var contentUrl = featuredArticles.find(".block__flush-top")[0];
//         // var content = $(contentUrl).text();
//         var htmlContent = $(contentUrl).html();

//         var html = `<html><body>${htmlContent}</body></html>`;
//         const encodeStr = Buffer.from(html, "utf8").toString("base64"); //crypto.createHash('md5').update(contents).digest("hex");
//         var payload: any = {
//           citationContent: html,
//           citationCount: encodeStr.length
//         };
//         console.log("citationCount", encodeStr.length);
//         var where: any = {
//           obligationId: data[i].id
//         };
//         console.log("where", where);
//         updateOldObligationContent(payload, where, async (err: any, data: any, count: number) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         });
//       })
//       .catch((err) => {
//         console.log("Fetch error " + err);
//         return err;
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const getConsumerFinance = async (url: any, data: any, i: number, newReportId: any, prevData: any) => {
//   try {
//     await axios
//       .get(url, {
//         proxy: rotateProxy()
//       })
//       .then((response) => {
//         const $ = cheerio.load(response.data);

//         const featuredArticles = $("#content_main");

//         featuredArticles.find('.o-expandable_cues').remove()

//         var contentUrl = featuredArticles.find(".block__flush-top")[0];

//         var content = $(contentUrl).text();

//         var htmlContent = $(contentUrl).html();

//         var html = `<html><body>${htmlContent}</body></html>`;
//         const encodeStr = Buffer.from(html, "utf8").toString("base64");
//         console.log(data[i].citationCount, " !== ", encodeStr.length);
//         if (data[i].citationCount !== encodeStr.length) {
//           var payload: any = {
//             obligationDesc: html,
//             oldobligationDesc: data[i].citationContent,
//             citationCount: encodeStr.length,
//             obId: data[i].obId,
//             prevUpdatedDate: prevData.createdDate
//           };
//           //console.log("payload", payload);
//           var where: any = {
//             obligationId: data[i].id
//           };
//           createNewObligationReport(payload, where, newReportId, async (err: any, data: any, count: number) => {
//             if (err) {
//               console.log(err);
//             } else {
//               console.log(data);
//             }
//           });
//         }

//       })
//       .catch((err) => {
//         console.log("Fetch error " + err);
//         return err;
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };
