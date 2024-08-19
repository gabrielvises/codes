import * as hub from './hub.js';
import  * as util from "./util.js";

export const ingredientesCremeDeLeite = [
  util.alimento(hub.alimento.queijoRicotta, 300),
  hub.alimento.leiteEmPó,
  util.alimento(hub.alimento.agua,250),
];

export var cremeDeLeiteCaseiro = util.calcularMacrosReceita( "Creme de leite caseiro", ingredientesCremeDeLeite);

export const ingredientespuredebatatadoce = [
    util.alimento(hub.alimento.batataDoce, 1000),
    util.alimento(hub.alimento.leite, 120),
    hub.alimento.azeiteDeOlive,
];

export const ingredientesstrogonoffdefrango = [
      util.alimento(hub.alimento.peitoDeFrango, 1500),
      util.alimento(hub.alimento.azeiteDeOlive, 15),
      hub.alimento.polpaDeTomate,
      cremeDeLeiteCaseiro,
      hub.alimento.ketchup,
      hub.alimento.mostarda,
];

export const ingredientesstrogonoffdecarne = [
      util.alimento(hub.alimento.carnePatinho, 1600),
      util.alimento(hub.alimento.azeiteDeOlive, 20),
      hub.alimento.polpaDeTomate,
      cremeDeLeiteCaseiro,
      hub.alimento.ketchup,
      hub.alimento.mostarda,
];

