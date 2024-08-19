import { refeicoes } from "./refeicoes.js";
import  * as vitaminasEMinerais  from "./nutrientes.js";
import  * as alimentosLista  from "./alimento.js";


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

  // Função para calcular os valores reais com base nas referências
  function calcularValoresReais(refeicoes) {
    for (let refeicao in refeicoes) {
      refeicoes[refeicao].forEach(alimento => {
        alimento.valoresReais.calorias = (alimento.caloriasRef * alimento.quantidade) / 100;
        alimento.valoresReais.proteina = (alimento.proteinaRef * alimento.quantidade) / 100;
        alimento.valoresReais.carboidratos = (alimento.carboidratosRef * alimento.quantidade) / 100;
        alimento.valoresReais.gordura = (alimento.gorduraRef * alimento.quantidade) / 100;
        alimento.valoresReais.fibras = (alimento.fibrasRef * alimento.quantidade) / 100;
      });
    }
  }

  function atualizarQuantidadesNutrientes() {

    // Função auxiliar para calcular valores reais
  function calcularValorReal(alimento, nutriente, tipo) {
    const valorRef = alimento[tipo][nutriente].ref;
    return (valorRef * alimento.quantidade) / 100;
  }
    // Itera sobre cada refeição em 'refeicoes'
    for (const refeicao in vitaminasEMinerais) {
      vitaminasEMinerais[refeicao].quantidade = alimentosLista[refeicao].quantidade;

        // Atualiza os valores reais para vitaminas e minerais com a nova quantidade
        for (const vitamina in vitaminasEMinerais[refeicao].vitaminas) {
          vitaminasEMinerais[refeicao].vitaminas[vitamina].real = calcularValorReal(vitaminasEMinerais[refeicao], vitamina, 'vitaminas');
        }

        for (const mineral in vitaminasEMinerais[refeicao].minerais) {
          vitaminasEMinerais[refeicao].minerais[mineral].real = calcularValorReal(vitaminasEMinerais[refeicao], mineral, 'minerais');
        }
    }
  
  }



  
  
  // Função para calcular os totais diários
  function calcularTotais(refeicoes) {
    let totalCalorias = 0;
    let totalProteina = 0;
    let totalCarboidratos = 0;
    let totalGordura = 0; 
    let totalFibras = 0; 
  
    for (let refeicao in refeicoes) {
      refeicoes[refeicao].forEach(alimento => { 
        totalCalorias += alimento.valoresReais.calorias;
        totalProteina += alimento.valoresReais.proteina;
        totalCarboidratos += alimento.valoresReais.carboidratos;
        totalGordura += alimento.valoresReais.gordura;
        totalFibras += alimento.valoresReais.fibras;
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

  // const totais = somarVitaminasEMinerais(vitaminasEMinerais);
// console.log(totais);
// console.log(vitaminasEMinerais)
  
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

// Função para mostrar as informações de todas as refeições no HTML
function mostrarRefeicoes() {
  calcularValoresReais(refeicoes)
  atualizarQuantidadesNutrientes();
  calcularNutrientesTotais();
  mostrarTotaisDiarios();
 

  mostrarRefeicao('preCafeDaManha', 'listaPreCafeDaManha');
  mostrarRefeicao('cafeDaManha', 'listaCafeDaManha');
  mostrarRefeicao('almoco', 'listaAlmoco');
  mostrarRefeicao('lancheDaTarde', 'listaLancheDaTarde');
  mostrarRefeicao('jantar', 'listaJanta');
  mostrarRefeicao('ceia', 'listaCeia');

}

function calcularNutrientesTotais() {
  for (let refeicao in vitaminasEMinerais) {
    var item = vitaminasEMinerais[refeicao];
   
      totalNutrientes.A += item.vitaminas.A.real;
      totalNutrientes.B1 += item.vitaminas.B1.real;
      totalNutrientes.B2 += item.vitaminas.B2.real;
      totalNutrientes.B3 += item.vitaminas.B3.real;
      totalNutrientes.B5 += item.vitaminas.B5.real;
      totalNutrientes.B6 += item.vitaminas.B6.real;
      totalNutrientes.B7 += item.vitaminas.B7.real;
      totalNutrientes.B9 += item.vitaminas.B9.real;
      totalNutrientes.B12 += item.vitaminas.B12.real;
      totalNutrientes.C += item.vitaminas.C.real;
      totalNutrientes.D += item.vitaminas.D.real;
      totalNutrientes.E += item.vitaminas.E.real;
      totalNutrientes.K += item.vitaminas.K.real;

      totalNutrientes.Cálcio += item.minerais.Cálcio.real;
      totalNutrientes.Ferro += item.minerais.Ferro.real;
      totalNutrientes.Magnésio += item.minerais.Magnésio.real;
      totalNutrientes.Fósforo += item.minerais.Fósforo.real;
      totalNutrientes.Potássio += item.minerais.Potássio.real;
      totalNutrientes.Sódio += item.minerais.Sódio.real;
      totalNutrientes.Zinco += item.minerais.Zinco.real;
  }
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
      totalCalorias += item.valoresReais.calorias;
      totalProteina += item.valoresReais.proteina;
      totalCarboidratos += item.valoresReais.carboidratos;
      totalGordura += item.valoresReais.gordura;
      totalFibras += item.valoresReais.fibras;

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
              <div>Calorias: ${item.valoresReais.calorias.toFixed(2)} kcal</div>
              <div>Proteína: ${item.valoresReais.proteina.toFixed(2)}g</div>
              <div>Carboidratos: ${item.valoresReais.carboidratos.toFixed(2)}g</div>
              <div>Gordura: ${item.valoresReais.gordura.toFixed(2)}g</div>
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
  const totais = calcularTotais(refeicoes);

  // Calcular distribuição de macronutrientes em porcentagem
  const distribuicaoMacros = calcularDistribuicaoMacros(totais);

  // Calcular macros por kg
  const macrosPorKg = calcularMacrosPorKg(totais, pesoAtual); // Aqui você pode substituir 85 pelo peso do usuário

  totalkcal = {
    totalCalorias: totais.totalCalorias,
    totalProteina: totais.totalProteina,
    totalCarboidratos: totais.totalCarboidratos,
    totalGordura: totais.totalGordura,
    totalFibras: totais.totalFibras,
  };


  

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
  </div>
  <div class="tabela-linha">
    <div>A</div>
    <div>${totalNutrientes.A.toFixed(1)} µg</div>
    <div>${recomendado.A} µg</div>
  </div>
  <div class="tabela-linha">
    <div>B1</div>
    <div>${totalNutrientes.B1.toFixed(1)} mg</div>
    <div>${recomendado.B1} mg</div>
  </div>
  <div class="tabela-linha">
    <div>B2</div>
    <div>${totalNutrientes.B2.toFixed(1)} mg</div>
    <div>${recomendado.B2} mg</div>
  </div>
  <div class="tabela-linha">
    <div>B3</div>
    <div>${totalNutrientes.B3.toFixed(1)} mg</div>
    <div>${recomendado.B3} mg</div>
  </div>
  <div class="tabela-linha">
    <div>B5</div>
    <div>${totalNutrientes.B5.toFixed(1)} mg</div>
    <div>${recomendado.B5} mg</div>
  </div>
  <div class="tabela-linha">
    <div>B6</div>
    <div>${totalNutrientes.B6.toFixed(1)} mg</div>
    <div>${recomendado.B6} mg</div>
  </div>
  <div class="tabela-linha">
    <div>B7</div>
    <div>${totalNutrientes.B7.toFixed(1)} µg</div>
    <div>${recomendado.B7} µg</div>
  </div>
  <div class="tabela-linha">
    <div>B9</div>
    <div>${totalNutrientes.B9.toFixed(1)} µg</div>
    <div>${recomendado.B9} µg</div>
  </div>
  <div class="tabela-linha">
    <div>B12</div>
    <div>${totalNutrientes.B12.toFixed(1)} µg</div>
    <div>${recomendado.B12} µg</div>
  </div>
  <div class="tabela-linha">
    <div>C</div>
    <div>${totalNutrientes.C.toFixed(1)} mg</div>
    <div>${recomendado.C} mg</div>
  </div>
  <div class="tabela-linha">
    <div>D</div>
    <div>${totalNutrientes.D.toFixed(1)} UI</div>
    <div>${recomendado.D} UI</div>
  </div>
  <div class="tabela-linha">
    <div>E</div>
    <div>${totalNutrientes.E.toFixed(1)} mg</div>
    <div>${recomendado.E} mg</div>
  </div>
  <div class="tabela-linha">
    <div>K</div>
    <div>${totalNutrientes.K.toFixed(1)} µg</div>
    <div>${recomendado.K} µg</div>
  </div>
   <div class="tabela-linha">
    <div>Cálcio</div>
    <div>${totalNutrientes.Cálcio.toFixed(1)} mg</div>
    <div>${recomendado.Cálcio} mg</div>
  </div>
  <div class="tabela-linha">
    <div>Ferro</div>
    <div>${totalNutrientes.Ferro.toFixed(1)} mg</div>
    <div>${recomendado.Ferro} mg</div>
  </div>
  <div class="tabela-linha">
    <div>Magnésio</div>
    <div>${totalNutrientes.Magnésio.toFixed(1)} mg</div>
    <div>${recomendado.Magnésio} mg</div>
  </div>
  <div class="tabela-linha">
    <div>Fósforo</div>
    <div>${totalNutrientes.Fósforo.toFixed(1)} mg</div>
    <div>${recomendado.Fósforo} mg</div>
  </div>
  <div class="tabela-linha">
    <div>Potássio</div>
    <div>${totalNutrientes.Potássio.toFixed(1)} mg</div>
    <div>${recomendado.Potássio} mg</div>
  </div>
  <div class="tabela-linha">
    <div>Sódio</div>
    <div>${totalNutrientes.Sódio.toFixed(1)} mg</div>
    <div>${recomendado.Sódio} mg</div>
  </div>
  <div class="tabela-linha">
    <div>Zinco</div>
    <div>${totalNutrientes.Zinco.toFixed(1)} mg</div>
    <div>${recomendado.Zinco} mg</div>
  </div>
</div>



      </div>
  `;
}

// Mostrar todas as refeições ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  mostrarRefeicoes();
});

// console.log(refeicoes)


