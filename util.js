export function calcularMacrosReceita(nomeReceita, ingredientes) {
    // Inicializar os valores totais
    let totais = {
        calorias: 0,
        proteina: 0,
        carboidratos: 0,
        gordura: 0,
        fibras: 0,
        pesoTotal: 0
    };

    // Iterar sobre os ingredientes para calcular os totais
    ingredientes.forEach(ingrediente => {
        let peso = ingrediente.quantidade;
        let calorias = (ingrediente.caloriasRef / 100) * peso;
        let proteina = (ingrediente.proteinaRef / 100) * peso;
        let carboidratos = (ingrediente.carboidratosRef / 100) * peso;
        let fibras = (ingrediente.fibrasRef / 100) * peso;
        let gordura = (ingrediente.gorduraRef / 100) * peso;

        totais.calorias += calorias;
        totais.proteina += proteina;
        totais.carboidratos += carboidratos;
        totais.gordura += gordura;
        totais.fibras += fibras;
        totais.pesoTotal += peso;
    });

    // Calcular os valores por 100g
    let resultado = {
        nome: nomeReceita,
        quantidade: totais.pesoTotal,
        caloriasRef: (totais.calorias / totais.pesoTotal) * 100,
        proteinaRef: (totais.proteina / totais.pesoTotal) * 100,
        carboidratosRef: (totais.carboidratos / totais.pesoTotal) * 100,
        gorduraRef: (totais.gordura / totais.pesoTotal) * 100,
        fibrasRef: (totais.fibras / totais.pesoTotal) * 100,
        valoresReais: {
            calorias: 0,
            proteina: 0, 
            carboidratos: 0,
            gordura: 0
        }
    };

    return resultado;
}

export function alimento(alimento, quantidade) {
    return {
        ...alimento,
        quantidade: quantidade
    };
}