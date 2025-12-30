class View {
  gerarTabela(taf) {
    //tabela
    let tabela = document.createElement("table");
    tabela.classList.add("tabela-periodos");

    //head
    let thead = document.createElement("thead");
    let tr_titulo = document.createElement("tr");
    let th_titulo = document.createElement("th");
    th_titulo.setAttribute("colspan", 7);
    th_titulo.textContent = taf.icao;
    tr_titulo.appendChild(th_titulo);
    thead.appendChild(tr_titulo);
    let tr_raw = document.createElement("tr");
    let th_raw = document.createElement("th");
    th_raw.setAttribute("colspan", 7);
    th_raw.textContent = taf.raw;
    tr_raw.appendChild(th_raw);
    thead.appendChild(tr_raw);
    let tr_head = document.createElement("tr");

    //data hora início
    let th_dt_hr_inicio = document.createElement("th");
    th_dt_hr_inicio.textContent = "Início";
    tr_head.appendChild(th_dt_hr_inicio);

    //vento
    let th_vento = document.createElement("th");
    th_vento.textContent = "Vento";
    tr_head.appendChild(th_vento);

    //visibilidade
    let th_visibilidade = document.createElement("th");
    th_visibilidade.textContent = "Visibilidade";
    tr_head.appendChild(th_visibilidade);

    //teto
    let th_teto = document.createElement("th");
    th_teto.textContent = "Teto";
    tr_head.appendChild(th_teto);

    //nuvens
    let th_nuvens = document.createElement("th");
    th_nuvens.textContent = "Nebulosidade";
    tr_head.appendChild(th_nuvens);

    //tempo presente
    let th_tempo_presente = document.createElement("th");
    th_tempo_presente.textContent = "Tempo Presente";
    tr_head.appendChild(th_tempo_presente);

    thead.appendChild(tr_head);
    tabela.appendChild(thead);

    //body
    let tbody = document.createElement("tbody");
    taf.horarios.forEach((horario) => {
      let tr = document.createElement("tr");

      //data hora inicio
      let td_dt_hr_inicio = document.createElement("td");
      td_dt_hr_inicio.textContent = horario.ddhhmm;
      tr.appendChild(td_dt_hr_inicio);

      //vento
      let td_vento = document.createElement("td");
      td_vento.textContent = horario.vento;
      tr.appendChild(td_vento);

      //visibilidade
      let td_visibilidade = document.createElement("td");
      td_visibilidade.textContent = horario.visibilidade;
      tr.appendChild(td_visibilidade);

      //teto
      let td_teto = document.createElement("td");
      td_teto.textContent = horario.teto ?? "UNL";
      tr.appendChild(td_teto);

      //nuvens
      let td_nuvens = document.createElement("td");
      td_nuvens.textContent = horario.nuvens ? horario.nuvens.join(" | ") : "";
      tr.appendChild(td_nuvens);

      //tempo presente
      let td_tempo_presente = document.createElement("td");
      td_tempo_presente.textContent = horario.tempo_presente
        ? horario.tempo_presente.join(" | ")
        : "";
      tr.appendChild(td_tempo_presente);

      tbody.appendChild(tr);
    });

    tabela.appendChild(tbody);

    return tabela;
  }

  gerarTabelaPeriodos(taf) {
    //tabela
    let div_tabela = document.createElement("div");
    div_tabela.id = `${taf.icao}`;

    let tabela = document.createElement("table");
    tabela.classList.add("tabela-periodos");

    //head
    let thead = document.createElement("thead");
    let tr_titulo = document.createElement("tr");
    let th_titulo = document.createElement("th");
    th_titulo.setAttribute("colspan", 8);
    th_titulo.textContent = taf.icao;
    tr_titulo.appendChild(th_titulo);
    thead.appendChild(tr_titulo);
    let tr_raw = document.createElement("tr");
    let th_raw = document.createElement("th");
    th_raw.setAttribute("colspan", 8);
    th_raw.textContent = taf.raw;
    tr_raw.appendChild(th_raw);
    thead.appendChild(tr_raw);
    let tr_head = document.createElement("tr");

    //data hora início
    let th_dt_hr_inicio = document.createElement("th");
    th_dt_hr_inicio.textContent = "Início";
    tr_head.appendChild(th_dt_hr_inicio);

    // data hora fim
    let th_dt_hr_fim = document.createElement("th");
    th_dt_hr_fim.textContent = "Fim";
    tr_head.appendChild(th_dt_hr_fim);

    //vento
    let th_vento = document.createElement("th");
    th_vento.textContent = "Vento";
    tr_head.appendChild(th_vento);

    //visibilidade
    let th_visibilidade = document.createElement("th");
    th_visibilidade.textContent = "Visibilidade";
    tr_head.appendChild(th_visibilidade);

    //teto
    let th_teto = document.createElement("th");
    th_teto.textContent = "Teto";
    tr_head.appendChild(th_teto);

    //nuvens
    let th_nuvens = document.createElement("th");
    th_nuvens.textContent = "Nebulosidade";
    tr_head.appendChild(th_nuvens);

    //tempo presente
    let th_tempo_presente = document.createElement("th");
    th_tempo_presente.textContent = "Tempo Presente";
    tr_head.appendChild(th_tempo_presente);

    //condicao
    let th_condicao = document.createElement("th");
    th_condicao.textContent = "Condição";
    tr_head.appendChild(th_condicao);

    thead.appendChild(tr_head);
    tabela.appendChild(thead);

    //body
    let tbody = document.createElement("tbody");

    taf.periodos.forEach((periodo, index) => {
      let tr = document.createElement("tr");
      tr.classList.add(periodo.condicao);

      //data hora inicio
      let td_dt_hr_inicio = document.createElement("td");
      // console.log(taf.icao, "inicio", periodo.data_hora_inicio);
      td_dt_hr_inicio.textContent = this.formatarDataUTC(
        periodo.data_hora_inicio
      );
      tr.appendChild(td_dt_hr_inicio);

      //data hora fim
      let td_dt_hr_fim = document.createElement("td");
      td_dt_hr_fim.textContent = this.formatarDataUTC(periodo.data_hora_fim);
      // console.log(taf.icao, "fim", periodo.data_hora_fim);
      tr.appendChild(td_dt_hr_fim);

      //vento
      let td_vento = document.createElement("td");
      td_vento.textContent = periodo.vento;
      tr.appendChild(td_vento);

      //visibilidade
      let td_visibilidade = document.createElement("td");
      td_visibilidade.textContent = periodo.visibilidade;
      tr.appendChild(td_visibilidade);

      //teto
      let td_teto = document.createElement("td");
      td_teto.textContent = periodo.teto ?? "UNL";
      tr.appendChild(td_teto);

      //nuvens
      let td_nuvens = document.createElement("td");
      td_nuvens.textContent = periodo.nuvens ? periodo.nuvens.join(" | ") : "";
      tr.appendChild(td_nuvens);

      //tempo presente
      let td_tempo_presente = document.createElement("td");
      td_tempo_presente.textContent = periodo.tempo_presente
        ? periodo.tempo_presente.join(" | ")
        : "";
      tr.appendChild(td_tempo_presente);

      //condição
      const td_condicao = document.createElement("td");
      const select_condicao = this.criarSelectCondicao(periodo.condicao);
      select_condicao.onchange = function () {
        mudarCondicao(taf.icao, index, this.value);
      };
      td_condicao.appendChild(select_condicao);
      tr.appendChild(td_condicao);

      tbody.appendChild(tr);
    });

    tabela.appendChild(tbody);
    div_tabela.appendChild(tabela);
    return div_tabela;
  }

  formatarDataUTC(data) {
    const dia = String(data.getUTCDate()).padStart(2, "0");
    const mes = String(data.getUTCMonth() + 1).padStart(2, "0"); // meses começam em 0
    const ano = data.getUTCFullYear();
    const hora = String(data.getUTCHours()).padStart(2, "0");
    const minuto = String(data.getUTCMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano} ${hora}:${minuto} UTC`;
  }

  criarSelectCondicao(condicao) {
    const select = document.createElement("select");

    const opt_vmc = document.createElement("option");
    opt_vmc.textContent = "VMC";
    if (condicao === "VMC") opt_vmc.selected = true;
    select.appendChild(opt_vmc);

    const opt_imc = document.createElement("option");
    opt_imc.textContent = "IMC";
    if (condicao === "IMC") opt_imc.selected = true;
    select.appendChild(opt_imc);

    const opt_degradado = document.createElement("option");
    opt_degradado.textContent = "DEGRADADO";
    if (condicao === "DEGRADADO") opt_degradado.selected = true;
    select.appendChild(opt_degradado);

    const opt_qgo = document.createElement("option");
    opt_qgo.textContent = "QGO";
    if (condicao === "QGO") opt_qgo.selected = true;
    select.appendChild(opt_qgo);

    return select;
  }

  gerarBotaoLink(icao) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = icao;
    a.setAttribute("href", `#${icao}`);
    li.appendChild(a);
    document.getElementById("links").firstElementChild.appendChild(li);
  }

  gerarGrafico(tafs) {
    const SVG_WIDTH = 1600;
    const LEFT_MARGIN = 120;
    const RIGHT_MARGIN = 20;
    const TOP_MARGIN = 50;
    const ROW_HEIGHT = 28;
    const X_AXIS_HEIGHT = 40;

    const ICAO_BOX_WIDTH = 90;
    const ICAO_BOX_HEIGHT = ROW_HEIGHT - 4;

    // --------------------------------------------------
    // 1) intervalo global de tempo
    // --------------------------------------------------
    let inicioGlobal = null;
    let fimGlobal = null;

    tafs.forEach((taf) => {
      taf.periodos.forEach((p) => {
        if (!inicioGlobal || p.data_hora_inicio < inicioGlobal) {
          inicioGlobal = p.data_hora_inicio;
        }
        if (!fimGlobal || p.data_hora_fim > fimGlobal) {
          fimGlobal = p.data_hora_fim;
        }
      });
    });

    const duracaoTotal = fimGlobal - inicioGlobal;
    const larguraUtil = SVG_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;

    // --------------------------------------------------
    // 2) SVG base (responsivo)
    // --------------------------------------------------
    const height = TOP_MARGIN + X_AXIS_HEIGHT + tafs.length * ROW_HEIGHT + 20;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${SVG_WIDTH} ${height}`);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "auto");
    svg.setAttribute("preserveAspectRatio", "xMinYMin meet");
    svg.classList.add("grafico-taf");

    const bg = document.createElementNS(svg.namespaceURI, "rect");
    bg.setAttribute("x", 0);
    bg.setAttribute("y", 0);
    bg.setAttribute("width", SVG_WIDTH);
    bg.setAttribute("height", height);
    bg.setAttribute("fill", "#fff");
    svg.appendChild(bg);

    // --------------------------------------------------
    // 3) eixo X – data em cima / hora embaixo
    // --------------------------------------------------
    let horaAtual = new Date(inicioGlobal);
    horaAtual.setUTCMinutes(0, 0, 0);
    let ultimaData = "";

    while (horaAtual < fimGlobal) {
      const proximaHora = new Date(horaAtual);
      proximaHora.setUTCHours(proximaHora.getUTCHours() + 1);

      const xInicio =
        LEFT_MARGIN + ((horaAtual - inicioGlobal) / duracaoTotal) * larguraUtil;

      const xFim =
        LEFT_MARGIN +
        ((proximaHora - inicioGlobal) / duracaoTotal) * larguraUtil;

      const xCentro = (xInicio + xFim) / 2;

      const linha = document.createElementNS(svg.namespaceURI, "line");
      linha.setAttribute("x1", xInicio);
      linha.setAttribute("x2", xInicio);
      linha.setAttribute("y1", TOP_MARGIN);
      linha.setAttribute("y2", height - 10);
      linha.setAttribute("stroke", "#ddd");
      linha.setAttribute("stroke-width", "1");
      svg.appendChild(linha);

      const dataStr = this.formatarDataUTC(horaAtual).split(" ")[0];
      if (dataStr !== ultimaData) {
        const labelData = document.createElementNS(svg.namespaceURI, "text");
        labelData.setAttribute("x", xCentro);
        labelData.setAttribute("y", TOP_MARGIN - 28);
        labelData.setAttribute("text-anchor", "middle");
        labelData.setAttribute("font-size", "12");
        labelData.setAttribute("font-family", "sans-serif");
        labelData.textContent = dataStr;
        svg.appendChild(labelData);
        ultimaData = dataStr;
      }

      const hora = String(horaAtual.getUTCHours()).padStart(2, "0");
      const labelHora = document.createElementNS(svg.namespaceURI, "text");
      labelHora.setAttribute("x", xCentro);
      labelHora.setAttribute("y", TOP_MARGIN - 10);
      labelHora.setAttribute("text-anchor", "middle");
      labelHora.setAttribute("font-size", "11");
      labelHora.setAttribute("font-family", "sans-serif");
      labelHora.textContent = `${hora}Z`;
      svg.appendChild(labelHora);

      horaAtual = proximaHora;
    }

    // --------------------------------------------------
    // 4) linhas por ICAO + períodos
    // --------------------------------------------------
    tafs.forEach((taf, index) => {
      const y = TOP_MARGIN + X_AXIS_HEIGHT + index * ROW_HEIGHT;

      // botão ICAO (eixo Y)
      const linkIcao = document.createElementNS(svg.namespaceURI, "a");
      linkIcao.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        `#${taf.icao}`
      );

      const rectIcao = document.createElementNS(svg.namespaceURI, "rect");
      rectIcao.setAttribute("x", 10);
      rectIcao.setAttribute("y", y);
      rectIcao.setAttribute("width", ICAO_BOX_WIDTH);
      rectIcao.setAttribute("height", ICAO_BOX_HEIGHT);
      rectIcao.setAttribute("rx", 4);
      rectIcao.setAttribute("ry", 4);
      rectIcao.setAttribute("fill", "#1f2933");

      const textIcao = document.createElementNS(svg.namespaceURI, "text");
      textIcao.setAttribute("x", 10 + ICAO_BOX_WIDTH / 2);
      textIcao.setAttribute("y", y + ICAO_BOX_HEIGHT / 2 + 4);
      textIcao.setAttribute("text-anchor", "middle");
      textIcao.setAttribute("font-size", "12");
      textIcao.setAttribute("font-family", "sans-serif");
      textIcao.setAttribute("fill", "#fff");
      textIcao.textContent = taf.icao;

      linkIcao.appendChild(rectIcao);
      linkIcao.appendChild(textIcao);
      svg.appendChild(linkIcao);

      // períodos
      taf.periodos.forEach((periodo) => {
        const xInicio =
          LEFT_MARGIN +
          ((periodo.data_hora_inicio - inicioGlobal) / duracaoTotal) *
            larguraUtil;

        const largura =
          ((periodo.data_hora_fim - periodo.data_hora_inicio) / duracaoTotal) *
          larguraUtil;

        // link do período (vale para tudo)
        const linkPeriodo = document.createElementNS(svg.namespaceURI, "a");
        linkPeriodo.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          `#${taf.icao}`
        );

        const grupo = document.createElementNS(svg.namespaceURI, "g");

        const title = document.createElementNS(svg.namespaceURI, "title");
        title.textContent =
          `${taf.icao}\n` +
          `${this.formatarDataUTC(
            periodo.data_hora_inicio
          )} → ${this.formatarDataUTC(periodo.data_hora_fim)}\n` +
          `Visibilidade: ${periodo.visibilidade ?? "—"} m\n` +
          `Teto: ${periodo.teto ?? "UNL"} ft\n` +
          `Tempo presente: ${
            Array.isArray(periodo.tempo_presente) &&
            periodo.tempo_presente.length
              ? periodo.tempo_presente.join(" | ")
              : "—"
          }`;

        grupo.appendChild(title);

        const rect = document.createElementNS(svg.namespaceURI, "rect");
        rect.setAttribute("x", xInicio);
        rect.setAttribute("y", y);
        rect.setAttribute("width", Math.max(largura, 1));
        rect.setAttribute("height", ROW_HEIGHT - 4);
        rect.classList.add(periodo.condicao);
        rect.setAttribute("stroke", "#000");
        rect.setAttribute("stroke-width", "0.5");

        grupo.appendChild(rect);

        if (
          Array.isArray(periodo.tempo_presente) &&
          periodo.tempo_presente.length
        ) {
          const text = document.createElementNS(svg.namespaceURI, "text");
          text.setAttribute("x", xInicio + largura / 2);
          text.setAttribute("y", y + (ROW_HEIGHT - 4) / 2 + 4);
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("font-size", "11");
          text.setAttribute("font-family", "sans-serif");
          text.textContent = periodo.tempo_presente.join(" | ");
          grupo.appendChild(text);
        }

        linkPeriodo.appendChild(grupo);
        svg.appendChild(linkPeriodo);
      });
    });

    // --------------------------------------------------
    // 5) wrapper
    // --------------------------------------------------
    const container = document.createElement("div");
    container.classList.add("grafico-container");
    container.appendChild(svg);

    return container;
  }
}
