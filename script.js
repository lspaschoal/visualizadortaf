let TAFS = {};

async function getTafsRedemet() {
  const codigos_icao = Object.keys(MINIMOS).join(',');
  const tafs_redemet = await fetch(
    `https://api-redemet.decea.mil.br/mensagens/taf/${codigos_icao}?api_key=6vmvTQDP1t8thEEAUkCCj4z4TRjrJLcb561p1SRi`)
    .then((res) => res.json())
    .then((data) => data.data.data);
    return tafs_redemet;
}

function armazenarTafs(array_tafs){
  array_tafs.forEach(taf => {
    taf_decodificado = new TAF(taf);
    TAFS[taf_decodificado.icao] = taf_decodificado;
  });
}

function gerarTabelas(){
  const div_tabelas = document.getElementById('tabelas');
  div_tabelas.innerHTML = '';
  const view = new View();
  Object.values(TAFS).forEach(taf => {
    view.gerarBotaoLink(taf.icao);
    div_tabelas.appendChild(view.gerarTabelaPeriodos(taf));
  });
}

function atualizarTabela(icao){
  const div_tabela = document.getElementById(icao);
  div_tabela.innerHTML = '';
  const view = new View();
  div_tabela.appendChild(view.gerarTabelaPeriodos(TAFS[icao]));
}

function mudarCondicao(icao,index_periodo,nova_condicao){
  TAFS[icao].periodos[index_periodo].condicao = nova_condicao;
  atualizarTabela(icao);
}

async function init(){
  const tafs = await getTafsRedemet();
  armazenarTafs(tafs);
  gerarTabelas();
}

init();
