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

    //data hora fim
    // let th_dt_hr_fim = document.createElement('th');
    // th_dt_hr_fim.textContent = "Fim";
    // tr_head.appendChild(th_dt_hr_fim);

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

    

    taf.periodos.forEach((periodo) => {
      let tr = document.createElement("tr");
      tr.classList.add(periodo.condicao);

      //data hora inicio
      let td_dt_hr_inicio = document.createElement("td");
      console.log(taf.icao, "inicio", periodo.data_hora_inicio);
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

      //tempo presente
      let td_condicao = document.createElement("td");
      td_condicao.textContent = periodo.condicao;
      tr.appendChild(td_condicao);

      tbody.appendChild(tr);
    });

    tabela.appendChild(tbody);
    return tabela;
  }

  formatarDataUTC(data) {
    const dia = String(data.getUTCDate()).padStart(2, "0");
    const mes = String(data.getUTCMonth() + 1).padStart(2, "0"); // meses começam em 0
    const ano = data.getUTCFullYear();
    const hora = String(data.getUTCHours()).padStart(2, "0");
    const minuto = String(data.getUTCMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano} ${hora}:${minuto} UTC`;
  }
}
