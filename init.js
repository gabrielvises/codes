import { refeicoes } from "./refeicoes.js";
import  * as alimentosLista  from "./alimento.js";
import  * as util  from "./util.js";


var pesoAtual = 82;
var totalkcal = {
  totalCalorias: 0,
  totalProteina: 0,
  totalCarboidratos: 0,
  totalGordura: 0,
  totalFibras: 0,
 };
const totalNutrientes = {
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
  Zinco: 0
};

const recomendado = {
  A: 900, //µg
  B1: 1.2, //mg 
  B2: 1.3, //mg
  B3: 16, //mg
  B5: 5, //mg
  B6: 1.3, //mg
  B7: 30, //µg
  B9: 400, //µg
  B12: 2.4, //µg
  C: 90, //mg
  D: 5000, //UI
  E: 15, //mg
  K: 120, //µg
  Cálcio: 1000, //mg
  Ferro: 8, //mg
  Magnésio: 400, //mg
  Fósforo: 700, //mg
  Potássio: 3500, //mg
  Sódio: 2300, //mg
  Zinco: 11, //mg
  
}



 var toggleSimple = false;

 document.getElementById('toggleSwitch').addEventListener('change', function() {
  toggleSimple = this.checked;
  mostrarRefeicoes();
  
});  
  
  // Função para calcular os totais diários
  function calcularTotalDoDia(refeicoes) {
    let totalCalorias = 0;
    let totalProteina = 0;
    let totalCarboidratos = 0;
    let totalGordura = 0; 
    let totalFibras = 0; 
  
    for (let refeicao in refeicoes) {
      refeicoes[refeicao].forEach(alimento => { 
        totalCalorias += alimento.macros.calorias.real;
        totalProteina += alimento.macros.proteina.real;
        totalCarboidratos += alimento.macros.carboidratos.real;
        totalGordura += alimento.macros.gordura.real;
        totalFibras += alimento.macros.fibras.real;
      });
    }
  
    return { 
      totalCalorias,
      totalProteina,
      totalCarboidratos, 
      totalGordura,
      totalFibras
    };
  }
  

  
  // Função para calcular a distribuição de macronutrientes em porcentagem
  function calcularDistribuicaoMacros(totais) {
    // const totalMacros = totais.totalProteina + totais.totalCarboidratos + totais.totalGordura;
    const totalMacros = totais.totalCalorias;
    return {
      proteinaPercentual: (totais.totalProteina * 4 / totalMacros) * 100,
      carboidratosPercentual: (totais.totalCarboidratos * 4 / totalMacros) * 100,
      gorduraPercentual: (totais.totalGordura * 9 / totalMacros) * 100,
      fibrasPercentual: totais.totalFibras,
    };
  }
  
  // Função para calcular a quantidade de macronutrientes em g/kg
  function calcularMacrosPorKg(totais, peso) {
    return {
      proteinaPorKg: totais.totalProteina / peso,
      carboidratosPorKg: totais.totalCarboidratos / peso,
      gorduraPorKg: totais.totalGordura / peso
    };
  }

  
function calcularNutrientesTotais() {
  for (let refeicao in refeicoes) {
    refeicoes[refeicao].forEach(alimento => {
      totalNutrientes.A += alimento.vitaminas.A.real;
      totalNutrientes.B1 += alimento.vitaminas.B1.real;
      totalNutrientes.B2 += alimento.vitaminas.B2.real;
      totalNutrientes.B3 += alimento.vitaminas.B3.real;
      totalNutrientes.B5 += alimento.vitaminas.B5.real;
      totalNutrientes.B6 += alimento.vitaminas.B6.real;
      totalNutrientes.B7 += alimento.vitaminas.B7.real;
      totalNutrientes.B9 += alimento.vitaminas.B9.real;
      totalNutrientes.B12 += alimento.vitaminas.B12.real;
      totalNutrientes.C += alimento.vitaminas.C.real;
      totalNutrientes.D += alimento.vitaminas.D.real;
      totalNutrientes.E += alimento.vitaminas.E.real;
      totalNutrientes.K += alimento.vitaminas.K.real;
      
      totalNutrientes.Cálcio += alimento.minerais.Cálcio.real;
      totalNutrientes.Ferro += alimento.minerais.Ferro.real;
      totalNutrientes.Magnésio += alimento.minerais.Magnésio.real;
      totalNutrientes.Fósforo += alimento.minerais.Fósforo.real;
      totalNutrientes.Potássio += alimento.minerais.Potássio.real;
      totalNutrientes.Sódio += alimento.minerais.Sódio.real;
      totalNutrientes.Zinco += alimento.minerais.Zinco.real;

      
    });
    }
  
}

// Função para mostrar as informações de todas as refeições no HTML
function mostrarRefeicoes() {
  mostrarRefeicao('preCafeDaManha', 'listaPreCafeDaManha');
  mostrarRefeicao('cafeDaManha', 'listaCafeDaManha');
  mostrarRefeicao('almoco', 'listaAlmoco');
  mostrarRefeicao('lancheDaTarde', 'listaLancheDaTarde');
  mostrarRefeicao('jantar', 'listaJanta');
  mostrarRefeicao('ceia', 'listaCeia');

}


// Função para mostrar uma refeição específica no HTML
function mostrarRefeicao(refeicao, idLista) {
  // Obter a lista de refeição específica
  const listaRefeicao = refeicoes[refeicao];

  // Selecionar o elemento HTML onde os itens serão mostrados
  const listaElemento = document.getElementById(idLista);
  const listaTotalElemento = document.getElementById("total-" + idLista);

  // Limpar qualquer conteúdo anterior
  listaElemento.innerHTML = '';
  listaTotalElemento.innerHTML = '';

  let totalCalorias = 0;
  let totalProteina = 0;
  let totalCarboidratos = 0;
  let totalGordura = 0;
  let totalFibras = 0;

  // Iterar sobre cada item da refeição
  listaRefeicao.forEach(item => {
      // Calcular totais da refeição
      totalCalorias += item.macros.calorias.real;
      totalProteina += item.macros.proteina.real;
      totalCarboidratos += item.macros.carboidratos.real;
      totalGordura += item.macros.gordura.real;
      totalFibras += item.macros.fibras.real;

      // Criar um elemento de lista para cada item
      const listItem = document.createElement('li');
      listItem.classList.add('item-refeicao'); // Adicionar classe para estilização
      if (toggleSimple) {
        // Preencher o conteúdo do item
        listItem.innerHTML = `
        <div class="nome-quantidade">
        <strong>${item.nome}</strong> - ${item.quantidade}g
        </div>
        <div class="macros">

        `;
        } else {
      listItem.innerHTML = `
          <div class="nome-quantidade">
              <strong>${item.nome}</strong> - ${item.quantidade}g
          </div>
          <div class="macros">
              <div>Calorias: ${item.macros.calorias.real.toFixed(2)} kcal</div>
              <div>Proteína: ${item.macros.proteina.real.toFixed(2)}g</div>
              <div>Carboidratos: ${item.macros.carboidratos.real.toFixed(2)}g</div>
              <div>Gordura: ${item.macros.gordura.real.toFixed(2)}g</div>
          `;
        }
      
      // Adicionar o item à lista
      listaElemento.appendChild(listItem);
  });

  // Mostrar totais da refeição
  const totalElemento = document.createElement('div');
  totalElemento.classList.add('total-refeicao');
  totalElemento.classList.add('item-total'); // Adicionar classe para estilização
  var totalFibrasReal = totalkcal.totalFibras == 0? 1 : totalFibras / totalkcal.totalFibras;
  totalElemento.innerHTML = `
      <div class="total">
          
          <div>Calorias: ${totalCalorias.toFixed(2)} kcal (${((totalCalorias / totalkcal.totalCalorias) * 100).toFixed(2)}% do dia)</div>
          <div>Proteína: ${totalProteina.toFixed(2)}g (${((totalProteina / totalkcal.totalProteina) * 100).toFixed(2)}% do dia)</div>
          <div>Carboidratos: ${totalCarboidratos.toFixed(2)}g (${((totalCarboidratos / totalkcal.totalCarboidratos) * 100).toFixed(2)}% do dia)</div>
          <div>Gordura: ${totalGordura.toFixed(2)}g (${((totalGordura / totalkcal.totalGordura) * 100).toFixed(2)}% do dia)</div>
          <div>Fibras: ${totalFibras.toFixed(2)}g (${(totalFibrasReal * 100).toFixed(2)}% do dia)</div>
      </div>
  `;
  listaElemento.appendChild(totalElemento);
  listaTotalElemento.appendChild(totalElemento);
}

// Função para mostrar os totais diários no final de todas as listas
function mostrarTotaisDiarios() {
  const totalDiaElemento = document.getElementById('total-totalDia');

  // Calcular totais diários
  const totais = calcularTotalDoDia(refeicoes);

  // Calcular distribuição de macronutrientes em porcentagem
  const distribuicaoMacros = calcularDistribuicaoMacros(totais);

  // Calcular macros por kg
  const macrosPorKg = calcularMacrosPorKg(totais, pesoAtual); // Aqui você pode substituir 85 pelo peso do usuário

  calcularNutrientesTotais();
  totalkcal = {
    totalCalorias: totais.totalCalorias,
    totalProteina: totais.totalProteina,
    totalCarboidratos: totais.totalCarboidratos,
    totalGordura: totais.totalGordura,
    totalFibras: totais.totalFibras,
  };



  var listaA = util.listaAlimentosRanking(refeicoes, "A", "vitaminas");
  var listaB1 = util.listaAlimentosRanking(refeicoes, "B1", "vitaminas");
  var listaB2 = util.listaAlimentosRanking(refeicoes, "B2", "vitaminas");
  var listaB3 = util.listaAlimentosRanking(refeicoes, "B3", "vitaminas");
  var listaB5 = util.listaAlimentosRanking(refeicoes, "B5", "vitaminas");
  var listaB6 = util.listaAlimentosRanking(refeicoes, "B6", "vitaminas");
  var listaB7 = util.listaAlimentosRanking(refeicoes, "B7", "vitaminas");
  var listaB9 = util.listaAlimentosRanking(refeicoes, "B9", "vitaminas");
  var listaB12 = util.listaAlimentosRanking(refeicoes, "B12", "vitaminas");
  var listaC = util.listaAlimentosRanking(refeicoes, "C", "vitaminas");
  var listaD = util.listaAlimentosRanking(refeicoes, "D", "vitaminas");
  var listaE = util.listaAlimentosRanking(refeicoes, "E", "vitaminas");
  var listaK = util.listaAlimentosRanking(refeicoes, "K", "vitaminas");
  var listaCálcio = util.listaAlimentosRanking(refeicoes, "Cálcio", "minerais");
  var listaFerro = util.listaAlimentosRanking(refeicoes, "Ferro", "minerais");
  var listaMagnésio = util.listaAlimentosRanking(refeicoes, "Magnésio", "minerais");
  var listaFósforo = util.listaAlimentosRanking(refeicoes, "Fósforo", "minerais");
  var listaPotássio = util.listaAlimentosRanking(refeicoes, "Potássio", "minerais");
  var listaSódio = util.listaAlimentosRanking(refeicoes, "Sódio", "minerais");
  var listaZinco = util.listaAlimentosRanking(refeicoes, "Zinco", "minerais");

  // Mostrar totais do dia
  totalDiaElemento.innerHTML = `
  
      <div class="total-dia ">
          <h3>Total do Dia:</h3>
           <div class="item-total">
            <div>Calorias: ${totais.totalCalorias.toFixed(2)} kcal</div>
            <div>Proteína: ${totais.totalProteina.toFixed(2)}g</div>
            <div>Carboidratos: ${totais.totalCarboidratos.toFixed(2)}g</div>
            <div>Gordura: ${totais.totalGordura.toFixed(2)}g</div>
            <div>Fibras: ${totais.totalFibras.toFixed(2)}g</div>
          </div>
          <h3>Distribuição de Macronutrientes:</h3>
          <div class="item-total">
            <div>Proteína: ${distribuicaoMacros.proteinaPercentual.toFixed(2)}%</div>
            <div>Carboidratos: ${distribuicaoMacros.carboidratosPercentual.toFixed(2)}%</div>
            <div>Gordura: ${distribuicaoMacros.gorduraPercentual.toFixed(2)}%</div>
          </div>

          <div class="space"></div>
          <h3>Macros por Kg de Peso Corporal:</h3>
          <div class="space2"></div>
            <div class="item-total">
            <div>Proteína: ${macrosPorKg.proteinaPorKg.toFixed(2)}g/kg</div>
            <div>Carboidratos: ${macrosPorKg.carboidratosPorKg.toFixed(2)}g/kg</div>
            <div>Gordura: ${macrosPorKg.gorduraPorKg.toFixed(2)}g/kg</div>
          </div>
<h3>Vitaminas e Minerais:</h3>

<div class="item-total tabela-vitaminas">
  <div class="tabela-cabecalho">
    <div>Nome</div>
    <div>Quantidade</div>
    <div>Total diário</div>
    <div>%</div>
  </div>
  <div class="tabela-linha">
    <div>A</div>
    <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.A.toFixed(1)} µg</span>
      <span class="tooltip-text"><ul>${listaA}</ul></span>
    </div>
    <div>${recomendado.A} µg</div>
    <div>${(totalNutrientes.A*100/recomendado.A).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>B1</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.B1.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaB1}</ul></span>
    </div>
    <div>${recomendado.B1} mg</div>
    <div>${(totalNutrientes.B1*100/recomendado.B1).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>B2</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.B2.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaB2}</ul></span>
    </div>
    <div>${recomendado.B2} mg</div>
    <div>${(totalNutrientes.B2*100/recomendado.B2).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>B3</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.B3.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaB3}</ul></span>
    </div>
    <div>${recomendado.B3} mg</div>
    <div>${(totalNutrientes.B3*100/recomendado.B3).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>B5</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.B5.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaB5}</ul></span>
    </div>
    <div>${recomendado.B5} mg</div>
    <div>${(totalNutrientes.B5*100/recomendado.B5).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>B6</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.B6.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaB6}</ul></span>
    </div>
    <div>${recomendado.B6} mg</div>
    <div>${(totalNutrientes.B6*100/recomendado.B6).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>B7</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.B7.toFixed(1)} µg</span>
      <span class="tooltip-text"><ul>${listaB7}</ul></span>
    </div>
    <div>${recomendado.B7} µg</div>
    <div>${(totalNutrientes.B7*100/recomendado.B7).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>B9</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.B9.toFixed(1)} µg</span>
      <span class="tooltip-text"><ul>${listaB9}</ul></span>
    </div>
    <div>${recomendado.B9} µg</div>
    <div>${(totalNutrientes.B9*100/recomendado.B9).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>B12</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.B12.toFixed(1)} µg</span>
      <span class="tooltip-text"><ul>${listaB12}</ul></span>
    </div>
    <div>${recomendado.B12} µg</div>
    <div>${(totalNutrientes.B12*100/recomendado.B12).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>C</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.C.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaC}</ul></span>
    </div>
    <div>${recomendado.C} mg</div>
    <div>${(totalNutrientes.C*100/recomendado.C).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>D</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.D.toFixed(1)} UI</span>
      <span class="tooltip-text"><ul>${listaD}</ul></span>
    </div>
    <div>${recomendado.D} UI</div>
    <div>${(totalNutrientes.D*100/recomendado.D).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>E</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.E.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaE}</ul></span>
    </div>
    <div>${recomendado.E} mg</div>
    <div>${(totalNutrientes.E*100/recomendado.E).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>K</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.K.toFixed(1)} µg</span>
      <span class="tooltip-text"><ul>${listaK}</ul></span>
    </div>
    <div>${recomendado.K} µg</div>
    <div>${(totalNutrientes.K*100/recomendado.K).toFixed()}%</div>
  </div>
   <div class="tabela-linha">
    <div>Cálcio</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.Cálcio.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaCálcio}</ul></span>
    </div>
    <div>${recomendado.Cálcio} mg </div>
    <div>${(totalNutrientes.Cálcio*100/recomendado.Cálcio).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>Ferro</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.Ferro.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaFerro}</ul></span>
    </div>
    <div>${recomendado.Ferro} mg</div>
    <div>${(totalNutrientes.Ferro*100/recomendado.Ferro).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>Magnésio</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.Magnésio.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaMagnésio}</ul></span>
    </div>
    <div>${recomendado.Magnésio} mg</div>
    <div>${(totalNutrientes.Magnésio*100/recomendado.Magnésio).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>Fósforo</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.Fósforo.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaFósforo}</ul></span>
    </div>
    <div>${recomendado.Fósforo} mg</div>
    <div>${(totalNutrientes.Fósforo*100/recomendado.Fósforo).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>Potássio</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.Potássio.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaPotássio}</ul></span>
    </div>
    <div>${recomendado.Potássio} mg</div>
    <div>${(totalNutrientes.Potássio*100/recomendado.Potássio).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>Sódio</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.Sódio.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaSódio}</ul></span>
    </div>
    <div>${recomendado.Sódio} mg</div>
    <div>${(totalNutrientes.Sódio*100/recomendado.Sódio).toFixed()}%</div>
  </div>
  <div class="tabela-linha">
    <div>Zinco</div>
       <div class="tooltip-container">
      <span class="quantity">${totalNutrientes.Zinco.toFixed(1)} mg</span>
      <span class="tooltip-text"><ul>${listaZinco}</ul></span>
    </div>
    <div>${recomendado.Zinco} mg</div>
    <div>${(totalNutrientes.Zinco*100/recomendado.Zinco).toFixed()}%</div>
  </div>
</div>



      </div>
  `;
}

// Mostrar todas as refeições ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  util.calcularmacrosENutrientes(refeicoes)
  mostrarTotaisDiarios();
  mostrarRefeicoes();
});

console.log(refeicoes)


