

export function calcularMacrosReceita(nomeReceita, ingredientes) {
    // Inicializar os valores totais
    let totais = {
        calorias: 0,
        proteina: 0,
        carboidratos: 0,
        gordura: 0,
        fibras: 0,
        pesoTotal: 0,
        A: 0,
        B1: 0,
        B2: 0,
        B3: 0,
        B5: 0,
        B6: 0,
        B7: 0,
        B9: 0,
        B12: 0,
        C: 0,
        D: 0,
        E: 0,
        K: 0,
        Cálcio: 0,
        Ferro: 0,
        Magnésio: 0,
        Fósforo: 0,
        Potássio: 0,
        Sódio: 0,
        Zinco: 0,
    };

    // Iterar sobre os ingredientes para calcular os totais
    ingredientes.forEach(ingrediente => {
        let peso = ingrediente.quantidade;
        totais.pesoTotal += peso;
        totais.calorias += (ingrediente.macros.calorias.ref / 100) * peso;
        totais.proteina += (ingrediente.macros.proteina.ref / 100) * peso;
        totais.carboidratos += (ingrediente.macros.carboidratos.ref / 100) * peso;
        totais.gordura += (ingrediente.macros.gordura.ref / 100) * peso; 
        totais.fibras += (ingrediente.macros.fibras.ref / 100) * peso;

        totais.A += (ingrediente.vitaminas.A.ref / 100) * peso;
        totais.B1 += (ingrediente.vitaminas.B1.ref / 100) * peso;
        totais.B2 += (ingrediente.vitaminas.B2.ref / 100) * peso;
        totais.B3 += (ingrediente.vitaminas.B3.ref / 100) * peso;
        totais.B5 += (ingrediente.vitaminas.B5.ref / 100) * peso;
        totais.B6 += (ingrediente.vitaminas.B6.ref / 100) * peso;
        totais.B7 += (ingrediente.vitaminas.B7.ref / 100) * peso;
        totais.B9 += (ingrediente.vitaminas.B9.ref / 100) * peso;
        totais.B12 += (ingrediente.vitaminas.B12.ref / 100) * peso;
        totais.C += (ingrediente.vitaminas.C.ref / 100) * peso;
        totais.D += (ingrediente.vitaminas.D.ref / 100) * peso;
        totais.E += (ingrediente.vitaminas.E.ref / 100) * peso;
        totais.K += (ingrediente.vitaminas.K.ref / 100) * peso;
        totais.Cálcio += (ingrediente.minerais.Cálcio.ref / 100) * peso;
        totais.Ferro += (ingrediente.minerais.Ferro.ref / 100) * peso;
        totais.Magnésio += (ingrediente.minerais.Magnésio.ref / 100) * peso;
        totais.Fósforo += (ingrediente.minerais.Fósforo.ref / 100) * peso;
        totais.Potássio += (ingrediente.minerais.Potássio.ref / 100) * peso;
        totais.Sódio += (ingrediente.minerais.Sódio.ref / 100) * peso;
        totais.Zinco += (ingrediente.minerais.Zinco.ref / 100) * peso;


    });

    // Calcular os valores por 100g
    let resultado = {
        nome: nomeReceita,
        quantidade: totais.pesoTotal,
        macros: {
            calorias: {ref: (totais.calorias / totais.pesoTotal) * 100, real: 0},
            proteina: {ref: (totais.proteina / totais.pesoTotal) * 100, real: 0},
            carboidratos: {ref: (totais.carboidratos / totais.pesoTotal) * 100, real: 0},
            gordura: {ref: (totais.gordura / totais.pesoTotal) * 100, real: 0},
            fibras: {ref: (totais.fibras / totais.pesoTotal) * 100, real: 0},
          },
          vitaminas: {
            A: {ref: (totais.A / totais.pesoTotal) * 100, real: 0},
            B1: {ref: (totais.B1 / totais.pesoTotal) * 100, real: 0},
            B2: {ref: (totais.B2 / totais.pesoTotal) * 100, real: 0},
            B3: {ref: (totais.B3 / totais.pesoTotal) * 100, real: 0},
            B5: {ref: (totais.B5 / totais.pesoTotal) * 100, real: 0},
            B6: {ref: (totais.B6 / totais.pesoTotal) * 100, real: 0},
            B7: {ref: (totais.B7 / totais.pesoTotal) * 100, real: 0},
            B9: {ref: (totais.B9 / totais.pesoTotal) * 100, real: 0},
            B12: {ref: (totais.B12 / totais.pesoTotal) * 100, real: 0},
            C: {ref: (totais.C / totais.pesoTotal) * 100, real: 0},
            D: {ref: (totais.D / totais.pesoTotal) * 100, real: 0},
            E: {ref: (totais.E / totais.pesoTotal) * 100, real: 0},
            K: {ref: (totais.K / totais.pesoTotal) * 100, real: 0}
          },
          minerais: {
            Cálcio: {ref: (totais.Cálcio / totais.pesoTotal) * 100, real: 0},
            Ferro: {ref: (totais.Ferro / totais.pesoTotal) * 100, real: 0},
            Magnésio: {ref: (totais.Magnésio / totais.pesoTotal) * 100, real: 0},
            Fósforo: {ref: (totais.Fósforo / totais.pesoTotal) * 100, real: 0},
            Potássio: {ref: (totais.Potássio / totais.pesoTotal) * 100, real: 0},
            Sódio: {ref: (totais.Sódio / totais.pesoTotal) * 100, real: 0},
            Zinco: {ref: (totais.Zinco / totais.pesoTotal) * 100, real: 0}
          }
    };

    return resultado;
}

export function alimento(alimento, quantidade) {
    var retorno = {
        ...alimento,
        quantidade: quantidade
    };

    var retorno1 = calcularMacrosAlimento(retorno, quantidade);

    return retorno1;

}

export function calcularmacrosENutrientes(refeicoes) {
    for (let refeicao in refeicoes) {
      refeicoes[refeicao].forEach(alimento => {
        alimento.macros.calorias.real = (alimento.macros.calorias.ref * alimento.quantidade) / 100;
        alimento.macros.proteina.real = (alimento.macros.proteina.ref * alimento.quantidade) / 100;
        alimento.macros.carboidratos.real = (alimento.macros.carboidratos.ref * alimento.quantidade) / 100;
        alimento.macros.gordura.real = (alimento.macros.gordura.ref * alimento.quantidade) / 100;
        alimento.macros.fibras.real = (alimento.macros.fibras.ref * alimento.quantidade) / 100;
        alimento.macros.calorias.real = (alimento.macros.calorias.ref * alimento.quantidade) / 100;
        alimento.macros.proteina.real = (alimento.macros.proteina.ref * alimento.quantidade) / 100;
        alimento.macros.carboidratos.real = (alimento.macros.carboidratos.ref * alimento.quantidade) / 100;
        alimento.macros.gordura.real = (alimento.macros.gordura.ref * alimento.quantidade) / 100;
        alimento.macros.fibras.real = (alimento.macros.fibras.ref * alimento.quantidade) / 100;
        alimento.vitaminas.A.real = (alimento.vitaminas.A.ref * alimento.quantidade) / 100;
        alimento.vitaminas.B1.real = (alimento.vitaminas.B1.ref * alimento.quantidade) / 100;
        alimento.vitaminas.B2.real = (alimento.vitaminas.B2.ref * alimento.quantidade) / 100;
        alimento.vitaminas.B3.real = (alimento.vitaminas.B3.ref * alimento.quantidade) / 100;
        alimento.vitaminas.B5.real = (alimento.vitaminas.B5.ref * alimento.quantidade) / 100;
        alimento.vitaminas.B6.real = (alimento.vitaminas.B6.ref * alimento.quantidade) / 100;
        alimento.vitaminas.B7.real = (alimento.vitaminas.B7.ref * alimento.quantidade) / 100;
        alimento.vitaminas.B9.real = (alimento.vitaminas.B9.ref * alimento.quantidade) / 100;
        alimento.vitaminas.B12.real = (alimento.vitaminas.B12.ref * alimento.quantidade) / 100;
        alimento.vitaminas.C.real = (alimento.vitaminas.C.ref * alimento.quantidade) / 100;
        alimento.vitaminas.D.real = (alimento.vitaminas.D.ref * alimento.quantidade) / 100;
        alimento.vitaminas.E.real = (alimento.vitaminas.E.ref * alimento.quantidade) / 100;
        alimento.vitaminas.K.real = (alimento.vitaminas.K.ref * alimento.quantidade) / 100;
        alimento.minerais.Cálcio.real = (alimento.minerais.Cálcio.ref * alimento.quantidade) / 100;
        alimento.minerais.Ferro.real = (alimento.minerais.Ferro.ref * alimento.quantidade) / 100;
        alimento.minerais.Magnésio.real = (alimento.minerais.Magnésio.ref * alimento.quantidade) / 100;
        alimento.minerais.Fósforo.real = (alimento.minerais.Fósforo.ref * alimento.quantidade) / 100;
        alimento.minerais.Potássio.real = (alimento.minerais.Potássio.ref * alimento.quantidade) / 100;
        alimento.minerais.Sódio.real = (alimento.minerais.Sódio.ref * alimento.quantidade) / 100;
        alimento.minerais.Zinco.real = (alimento.minerais.Zinco.ref * alimento.quantidade) / 100;
      });
    }
  }

  export function calcularMacrosAlimento(alimento, quantidade) {
    var alimentoCopia = alimento;
    alimentoCopia.macros.calorias.real = (alimento.macros.calorias.ref * quantidade) / 100;
    alimentoCopia.macros.proteina.real = (alimento.macros.proteina.ref * quantidade) / 100;
    alimentoCopia.macros.carboidratos.real = (alimento.macros.carboidratos.ref * quantidade) / 100;
    alimentoCopia.macros.gordura.real = (alimento.macros.gordura.ref * quantidade) / 100;
    alimentoCopia.macros.fibras.real = (alimento.macros.fibras.ref * quantidade) / 100;
    alimentoCopia.vitaminas.A.real = (alimento.vitaminas.A.ref * quantidade) / 100;
    alimentoCopia.vitaminas.B1.real = (alimento.vitaminas.B1.ref * quantidade) / 100;
    alimentoCopia.vitaminas.B2.real = (alimento.vitaminas.B2.ref * quantidade) / 100;
    alimentoCopia.vitaminas.B3.real = (alimento.vitaminas.B3.ref * quantidade) / 100;
    alimentoCopia.vitaminas.B5.real = (alimento.vitaminas.B5.ref * quantidade) / 100;
    alimentoCopia.vitaminas.B6.real = (alimento.vitaminas.B6.ref * quantidade) / 100;
    alimentoCopia.vitaminas.B7.real = (alimento.vitaminas.B7.ref * quantidade) / 100;
    alimentoCopia.vitaminas.B9.real = (alimento.vitaminas.B9.ref * quantidade) / 100;
    alimentoCopia.vitaminas.B12.real = (alimento.vitaminas.B12.ref * quantidade) / 100;
    alimentoCopia.vitaminas.C.real = (alimento.vitaminas.C.ref * quantidade) / 100;
    alimentoCopia.vitaminas.D.real = (alimento.vitaminas.D.ref * quantidade) / 100;
    alimentoCopia.vitaminas.E.real = (alimento.vitaminas.E.ref * quantidade) / 100;
    alimentoCopia.vitaminas.K.real = (alimento.vitaminas.K.ref * quantidade) / 100;
    alimentoCopia.minerais.Cálcio.real = (alimento.minerais.Cálcio.ref * quantidade) / 100;
    alimentoCopia.minerais.Ferro.real = (alimento.minerais.Ferro.ref * quantidade) / 100;
    alimentoCopia.minerais.Magnésio.real = (alimento.minerais.Magnésio.ref * quantidade) / 100;
    alimentoCopia.minerais.Fósforo.real = (alimento.minerais.Fósforo.ref * quantidade) / 100;
    alimentoCopia.minerais.Potássio.real = (alimento.minerais.Potássio.ref * quantidade) / 100;
    alimentoCopia.minerais.Sódio.real = (alimento.minerais.Sódio.ref * quantidade) / 100;
    alimentoCopia.minerais.Zinco.real = (alimento.minerais.Zinco.ref * quantidade) / 100;
    return alimentoCopia;
  }



// Função para buscar a variável dentro do objeto
export function buscarVariavel(obj, nomeVariavel) {
  for (const chave in obj) {
    if (obj.hasOwnProperty(chave)) {
      const lista = obj[chave];
      for (const item of lista) {
        if (item.nome === nomeVariavel) {
          return item; // Retorna a chave da lista onde a variável foi encontrada
        }
      }
    }
  }
  return null; // Retorna null se a variável não for encontrada
}


// Função para obter uma lista ordenada de alimentos por vitamina A
export function listaAlimentosRanking(refeicoes, nutriente, tipo) {
  // Objeto para armazenar os alimentos e suas quantidades de vitamina A
  const alimentos = {};

  // Função para adicionar alimentos ao objeto
  function adicionarAlimentos(lista) {
    lista.forEach(alimento => {
      if (typeof alimento === 'object' && alimento !== null && alimento.nome) {
        const nome = alimento.nome;
        const quantidade = alimento[tipo][nutriente].real;
        if (quantidade > 0) { // Só adiciona se a quantidade de vitamina A for maior que zero
          alimentos[nome] = (alimentos[nome] || 0) + quantidade;
        }
      }
    });
  }

  // Adiciona alimentos de cada refeição
  Object.values(refeicoes).forEach(adicionarAlimentos);

  // Ordena os alimentos por vitamina A (do maior para o menor)
  const alimentosOrdenados = Object.entries(alimentos)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry);

    console.log(alimentosOrdenados)

  return alimentosOrdenados.map(item => `<li>${item[0] + ' - ' + item[1].toFixed(2)+' µg'}</li>`).join('');
}