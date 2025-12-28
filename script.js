const resposta = {
  "status": true,
  "message": 200,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id_localidade": "SBGL",
        "validade_inicial": "2025-11-19 00:00:00",
        "validade_final": "2025-11-20 06:00:00",
        "mens": "TAF SBGL 181936Z 1900/2006 18005KT 9999 FEW030 TN24/1909Z TX33/1916Z TEMPO 1900/1904 23012KT 5000 TSRA BKN020 FEW030CB TEMPO 1904/1911 30007KT 4000 BR BKN010 BKN020 FM191015 BKN005 BECMG 1912/1915 21013KT PROB40 TEMPO 1915/1918 21015G25KT BECMG 1921/1923 25005KT SCT020 BECMG 2000/2002 33005KT 7000 BKN006 RMK PGY=",
        "recebimento": "2025-11-11 16:30:09"
      },
      {
        "id_localidade": "SBGR",
        "validade_inicial": "2025-11-11 18:00:00",
        "validade_final": "2025-11-13 00:00:00",
        "mens": "TAF SBGR 111530Z 1118/1224 12005KT 9999 FEW035 TN13/1208Z TX30/1217Z BECMG 1118/1120 15010KT CAVOK BECMG 1121/1123 12005KT BECMG 1201/1203 07005KT PROB30 1207/1211 0800 FG BKN002 BECMG 1212/1214 30005KT BECMG 1215/1217 25005KT FEW040 BECMG 1219/1221 13007KT RMK PGE=",
        "recebimento": "2025-11-11 15:39:16"
      },
      {
        "id_localidade": "SBRJ",
        "validade_inicial": "2025-11-11 18:00:00",
        "validade_final": "2025-11-12 06:00:00",
        "mens": "TAF SBRJ 111615Z 1118/1206 12005KT 9999 SCT020 TX23/1118Z TN18/1206Z TEMPO 1118/1124 16013KT RMK PGW=",
        "recebimento": "2025-11-11 16:30:09"
      },
      {
        "id_localidade": "SBSP",
        "validade_inicial": "2025-11-11 18:00:00",
        "validade_final": "2025-11-12 06:00:00",
        "mens": "TAF SBSP 111530Z 1118/1206 15010KT 9999 FEW035 TX23/1118Z TN14/1205Z BECMG 1118/1120 CAVOK PROB30 1122/1124 FEW010 RMK PGE=",
        "recebimento": "2025-11-11 15:39:16"
      }
    ],
    "first_page_url": "/?page_tam=150&data_ini=2025111123&data_fim=2025111123&page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "/?page_tam=150&data_ini=2025111123&data_fim=2025111123&page=1",
    "next_page_url": null,
    "path": "/",
    "per_page": 150,
    "prev_page_url": null,
    "to": 4,
    "total": 4
  }
}


// function gerarDatasIntervalo(validade_inicial, validade_final) {
//   let periodos = [];
//   // Converte as strings para objetos Date
//   let dataInicial = new Date(validade_inicial + " UTC");
//   let dataFinal = new Date(validade_final + " UTC");

//   // Itera sobre o intervalo e adiciona as datas ao objeto
//   let current = new Date(dataInicial);
//   while (current <= dataFinal) {
//     let periodo = {};
//     periodo.ddhh = `${current.getDate()}${current.getHours()}`;
//       // Formata a data atual para o formato 'aaaa-mm-dd hh:mm:ss'
//       // let chave = current.toISOString().slice(0, 13).replace("T", "_").replaceAll("-", "_");
//     periodos.push(periodo);
//     // Incrementa uma hora
//     current.setHours(current.getHours() + 1);
//   }

//   return periodos;
// }

// let resultado = gerarDatasIntervalo(resposta.data.data[0].validade_inicial, resposta.data.data[0].validade_final);
console.log(Object.keys(MINIMOS).length);
const codigos_icao = Object.keys(MINIMOS).join(',');
console.log(`https://api-redemet.decea.mil.br/mensagens/taf/${codigos_icao}?api_key=6vmvTQDP1t8thEEAUkCCj4z4TRjrJLcb561p1SRi`);
fetch(
  `https://api-redemet.decea.mil.br/mensagens/taf/${codigos_icao}?api_key=6vmvTQDP1t8thEEAUkCCj4z4TRjrJLcb561p1SRi`
)
  .then((res) => res.json())
  .then((data) => data.data.data)
  .then(tafs => {
    const view = new View();
    tafs.forEach(taf => {
      let taf_decodificado = new TAF(taf);
      document.getElementById('teste').appendChild(view.gerarTabelaPeriodos(taf_decodificado));
      // document.getElementById('teste').appendChild(view.gerarTabela(taf_decodificado));
    });
  });
// let resultado = [];
// resposta.data.data.forEach(taf => {
//   resultado.push(new TAF(taf))
// });
// console.log(resultado);

// const view = new View();
// document.getElementById('teste').appendChild(view.gerarTabela(resultado[0]));