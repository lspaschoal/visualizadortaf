class TAF {
  constructor(taf_aisweb) {
    this.raw = taf_aisweb.mens;
    this.icao = taf_aisweb.id_localidade;
    this.validade_inicial = taf_aisweb.validade_inicial;
    this.validade_final = taf_aisweb.validade_final;
    this.horarios = this.gerarHorarios(
      taf_aisweb.validade_inicial,
      taf_aisweb.validade_final
    );
    this.parse(taf_aisweb.mens);
    this.setCondicaoHorarios();
    this.periodos = this.gerarPeriodos(this.horarios);

    // console.log(this.icao);
    // console.log(this.raw);
    // console.log(this.horarios);
    // console.log(this.periodos);
  }

  gerarHorarios(validade_inicial, validade_final) {
    let horarios = [];
    // Converte as strings para objetos Date
    let dataInicial = new Date(validade_inicial + " UTC");
    let dataFinal = new Date(validade_final + " UTC");

    // Itera sobre o intervalo e adiciona as datas ao objeto
    let current = new Date(dataInicial);
    while (current <= dataFinal) {
      let horario = {};
      horario.ddhhmm = `${String(current.getUTCDate()).padStart(
        2,
        "0"
      )}${String(current.getUTCHours()).padStart(2, "0")}00`;
      horario.data_hora = new Date(current);
      horarios.push(horario);
      // Incrementa uma hora
      current.setHours(current.getHours() + 1);
    }

    return horarios;
  }

  inserirTEMPO(mensagem) {
    const condicao = this.lerCondicao(mensagem);
    let [inicio, fim] = mensagem.match(/\d{4}\/\d{4}/)[0].split("/");
    inicio = `${inicio}00`;
    fim = `${fim}00`;
    this.horarios.forEach((horario) => {
      if (horario.ddhhmm >= inicio && horario.ddhhmm < fim) {
        horario.mensagem = mensagem;
        if (condicao.visibilidade !== null)
          horario.visibilidade = condicao.visibilidade;
        if (condicao.teto !== null) horario.teto = condicao.teto;
        if (condicao.nuvens !== null) horario.nuvens = condicao.nuvens;
        if (condicao.tempo_presente !== null)
          horario.tempo_presente = condicao.tempo_presente;
        if (condicao.vento !== null) horario.vento = condicao.vento;
      }
    });
  }

  inserirBECMG(mensagem) {
    const condicao = this.lerCondicao(mensagem);
    let [inicio, fim] = mensagem.match(/\d{4}\/\d{4}/)[0].split("/");
    fim = `${fim}00`;
    this.horarios.forEach((horario) => {
      if (horario.ddhhmm >= fim) {
        horario.mensagem = mensagem;
        if (condicao.visibilidade !== null)
          horario.visibilidade = condicao.visibilidade;
        if (condicao.teto !== null) horario.teto = condicao.teto;
        if (condicao.nuvens !== null) horario.nuvens = condicao.nuvens;
        if (condicao.tempo_presente !== null)
          horario.tempo_presente = condicao.tempo_presente;
        if (condicao.vento !== null) horario.vento = condicao.vento;
      }
    });
  }

  inserirFM(mensagem) {
    const condicao = this.lerCondicao(mensagem);
    let inicio = mensagem
      .match(/FM\d{6}\s/)[0]
      .trim()
      .substring(2);
    this.horarios.forEach((periodo, indice, arr) => {
      if (horario.ddhhmm >= inicio) {
        horario.mensagem = mensagem;
        if (condicao.visibilidade !== null)
          horario.visibilidade = condicao.visibilidade;
        if (condicao.nuvens !== null) horario.nuvens = condicao.nuvens;
        if (condicao.condicao.teto !== null) horario.teto = condicao.teto;
        if (condicao.tempo_presente !== null)
          horario.tempo_presente = condicao.tempo_presente;
        if (condicao.vento !== null) horario.vento = condicao.vento;
      }
      if (
        indice < arr.length - 1 &&
        horario.ddhhmm < inicio &&
        arr[indice + 1].ddhhmm > inicio
      ) {
        arr.splice(indice + 1, 0, {
          ddhhmm: inicio,
          mensagem: mensagem,
          visibilidade: condicao.visibilidade ?? arr[indice].visibilidade,
          teto: condicao.teto ?? arr[indice].teto,
          nuvens: condicao.nuvens ?? arr[indice].nuvens,
          tempo_presente: condicao.tempo_presente ?? arr[indice].tempo_presente,
          vento: condicao.vento ?? arr[indice].vento,
        });
      }
    });
  }

  parse(mensagem) {
    let taf = this.tabulaTAF(mensagem);

    const condicao_inicial = this.lerCondicao(taf[0]);

    this.horarios.forEach((horario) => {
      horario.mensagem = taf[0];
      horario.visibilidade = condicao_inicial.visibilidade;
      horario.nuvens = condicao_inicial.nuvens;
      horario.teto = condicao_inicial.teto;
      horario.tempo_presente = condicao_inicial.tempo_presente;
      horario.vento = condicao_inicial.vento;
    });

    taf.forEach((grupo) => {
      if (grupo.match(/TEMPO/)) {
        this.inserirTEMPO(grupo);
      }
      if (grupo.match(/PROB/)) {
        this.inserirTEMPO(grupo);
      }
      if (grupo.match(/BECMG/)) {
        this.inserirBECMG(grupo);
      }
      if (grupo.match(/FM/)) {
        this.inserirFM(grupo);
      }
    });
  }

  tabulaTAF(taf) {
    // Regex que identifica o início de um novo grupo
    const groupRegex =
      /\b(PROB30|PROB40)?\s*(BECMG|TEMPO|FM\d{6})\b|\b(PROB30|PROB40)\b/g;

    const indices = [];
    let match;

    // Encontra todas as posições onde começam novos grupos
    while ((match = groupRegex.exec(taf)) !== null) {
      indices.push(match.index);
    }

    // Se não encontrou grupos, retorna o TAF inteiro
    if (indices.length === 0) {
      return [taf.trim()];
    }

    const result = [];

    // Primeiro grupo: da posição 0 até o primeiro grupo encontrado
    result.push(taf.substring(0, indices[0]).trim());

    // Grupos intermediários
    for (let i = 0; i < indices.length; i++) {
      const start = indices[i];
      const end = indices[i + 1] ?? taf.length;
      result.push(taf.substring(start, end).trim());
    }

    return result.filter(Boolean);
  }

  lerCondicao(texto) {
    // condição inicial
    const condicao = {
      visibilidade: null,
      nuvens: null,
      teto: null,
      tempo_presente: null,
      vento: null,
    };
    if (texto.match(/\sCAVOK\s/)) {
      condicao.visibilidade = 9999;
      condicao.nuvens = [];
    }
    if (texto.match(/\s\d\d\d\d\s/))
      condicao.visibilidade = texto.match(/\s\d\d\d\d\s/)[0].trim();
    if (texto.match(/(?:FEW|SCT|BKN|OVC)\d{3}(?:CB|TCU)?/))
      condicao.nuvens = [
        ...texto.matchAll(/(?:FEW|SCT|BKN|OVC)\d{3}(?:CB|TCU)?/g),
      ].map((m) => m[0]);
    if (texto.match(/NSC/)) condicao.nuvens = [];
    if (condicao.nuvens)
      condicao.nuvens.forEach((camada) => {
        if (camada.match(/BKN|OVC/)) {
          let teto = Number(camada.substring(3,6)) * 100;
          if (condicao.teto == null || condicao.teto > teto) {
            condicao.teto = teto;
          }
        }
      });
    if (texto.match(/\b[+-]?(?:TSRA|RA|BR|FG|TS|VC[A-Z]{2})\b/))
      condicao.tempo_presente = [
        ...texto.matchAll(/\b[+-]?(?:TSRA|RA|BR|FG|TS|VC[A-Z]{2})\b/g),
      ].map((m) => m[0]);
    if (texto.match(/\d{5}KT|\d{5}G\d{2}KT|VRB\d{2}KT/))
      condicao.vento = texto.match(/\d{5}KT|\d{5}G\d{2}KT|VRB\d{2}KT/)[0];

    return condicao;
  }

  gerarPeriodos(horarios) {
    let periodos = [];

    periodos.push({
      data_hora_inicio: new Date(horarios[0].data_hora),
      tempo_presente: horarios[0].tempo_presente,
      visibilidade: horarios[0].visibilidade,
      teto: horarios[0].teto,
      nuvens: horarios[0].nuvens,
      vento: horarios[0].vento,
      condicao: horarios[0].condicao,
    });

    for (let i = 1; i < horarios.length - 1; i++) {
      periodos[periodos.length - 1].data_hora_fim = new Date(
        horarios[i].data_hora
      );
      if (
        horarios[i].visibilidade !=
          periodos[periodos.length - 1].visibilidade ||
        horarios[i].teto != periodos[periodos.length - 1].teto ||
        horarios[i].vento != periodos[periodos.length - 1].vento ||
        !this.compararArrays(
          horarios[i].nuvens,
          periodos[periodos.length - 1].nuvens ||
            !this.compararArrays(
              horarios[i].tempo_presente,
              periodos[periodos.length - 1].tempo_presente
            )
        )
      ) {
        periodos.push({
          data_hora_inicio: new Date(horarios[i].data_hora),
          visibilidade: horarios[i].visibilidade,
          teto: horarios[i].teto,
          vento: horarios[i].vento,
          nuvens: horarios[i].nuvens,
          tempo_presente: horarios[i].tempo_presente,
          condicao: horarios[i].condicao,
        });
      }
    }
    const ultimoHorario = horarios[horarios.length - 1];
    periodos[periodos.length - 1].data_hora_fim = new Date(
      ultimoHorario.data_hora
    );
    return periodos;
  }

  compararArrays = (a, b) => {
    // Primeiro, verifique se têm o mesmo comprimento
    if (a.length !== b.length) {
      return false;
    }

    // Em seguida, verifique se todos os elementos são estritamente iguais
    return a.every((elemento, indice) => elemento === b[indice]);
  };

  getCondicao(visibilidade, teto) {
    // console.log(visibilidade,teto,this.icao,MINIMOS[this.icao].visibilidade,MINIMOS[this.icao].teto);
    if (
      visibilidade < MINIMOS[this.icao].visibilidade ||
      (teto !== null && teto < MINIMOS[this.icao].teto)
    )
      return "QGO";
    if (
      visibilidade <=
        MINIMOS[this.icao].visibilidade + MARGEM_DEGRADACAO.visibilidade ||
      (teto !== null &&
        teto <= MINIMOS[this.icao].teto + MARGEM_DEGRADACAO.teto)
    )
      return "DEGRADADO";
    if (
      visibilidade < MINIMOS_VFR.visibilidade ||
      (teto !== null && teto < MINIMOS_VFR.teto)
    )
      return "IMC";
    return "VMC";
  }

  setCondicaoHorarios() {
    this.horarios.forEach((horario) => {
      horario.condicao = this.getCondicao(horario.visibilidade, horario.teto);
    });
  }
}
