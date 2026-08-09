let TAFS = {};

async function getTafsLspaschoal() {
  const codigos_icao = Object.keys(MINIMOS);
  const tafs_lspaschoal = await fetch(
    `https://api.lspaschoal.com/taf`)
    .then((res) => res.json());
  return Object.fromEntries(
    Object.entries(tafs_lspaschoal).filter(([icao]) => codigos_icao.includes(icao))
  );
}

function armazenarTafs(array_tafs) {
  Object.values(array_tafs).forEach(taf => {
    taf_decodificado = new TAF(taf);
    TAFS[taf_decodificado.icao] = taf_decodificado;
  });
}

function gerarTabelas() {
  const div_tabelas = document.getElementById('tabelas');
  div_tabelas.innerHTML = '';
  const view = new View();
  Object.values(TAFS).forEach(taf => {
    div_tabelas.appendChild(view.gerarTabelaPeriodos(taf));
  });
}

function atualizarTabela(icao) {
  const div_tabela = document.getElementById(icao);
  div_tabela.innerHTML = '';
  const view = new View();
  div_tabela.appendChild(view.gerarTabelaPeriodos(TAFS[icao]));
}

function mudarCondicao(icao, index_periodo, nova_condicao) {
  TAFS[icao].periodos[index_periodo].condicao = nova_condicao;
  atualizarTabela(icao);
  gerarGrafico();
}

function gerarGrafico() {
  const div_grafico = document.getElementById('grafico');
  div_grafico.innerHTML = '';
  const view = new View();
  div_grafico.appendChild(view.gerarGrafico(Object.values(TAFS)));
}

async function init() {
  const tafs = await getTafsLspaschoal();
  armazenarTafs(tafs);
  gerarGrafico();
  gerarTabelas();
}

init();

const btnTopo = document.getElementById("btn-topo");

// mostrar / esconder conforme scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btnTopo.classList.add("visivel");
  } else {
    btnTopo.classList.remove("visivel");
  }
});

// voltar ao topo
btnTopo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

