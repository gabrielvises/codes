import  * as util from "./util.js";
import  * as receita from "./receita.js";
import * as hub from './hub.js'
  
var pure = util.calcularMacrosReceita( "Purê de Batata Doce", receita.ingredientespuredebatatadoce);
var strogonoffDeFrango = util.calcularMacrosReceita( "Strogonoff de Frango", receita.ingredientesstrogonoffdefrango);
var strogonoffDeCarne = util.calcularMacrosReceita( "Strogonoff de Carne", receita.ingredientesstrogonoffdecarne);

export const proteina = [
    hub.alimento.frangoSassami,
    // util.alimento(strogonoff, 180),
    util.alimento(strogonoffDeFrango, 190),
];
export const batatadoce = [
      hub.alimento.batataDoce,
      util.alimento(pure, 80),
];

export const marmita = [
    proteina[1],
    batatadoce[1],
    hub.alimento.arrozIntegral,
    util.alimento(hub.alimento.brócolis,25),
    util.alimento(hub.alimento.feijaoPreto, 120),
    
 
];

