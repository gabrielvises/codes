import  * as marmita from "./marmita.js";
import  * as hub from "./hub.js";
import  * as util from "./util.js";


export const refeicoes = {
    preCafeDaManha: [
      util.alimento(hub.alimento.maca,100),
      util.alimento(hub.alimento.mamaoFormosa,100),
      util.alimento(hub.alimento.kiwi,50),
      util.alimento(hub.alimento.melao,100),
      util.alimento(hub.alimento.pera,50),

    ],
    cafeDaManha: [
      util.alimento(hub.alimento.ovos, 100),
      util.alimento(hub.alimento.azeiteDeOlive, 5),
      util.alimento(hub.alimento.aveia, 30),
      util.alimento(hub.alimento.brócolis, 30),
      util.alimento(hub.alimento.pao,30),
    ],
    almoco: [
      ...marmita.marmita
    ],
    lancheDaTarde: [
     util.alimento(hub.alimento.leite, 300),
     util.alimento(hub.alimento.whey, 30),
     util.alimento(hub.alimento.banana, 110),
     util.alimento(hub.alimento.morango, 50),
    ],
    jantar: [
      ...marmita.marmita
     ],
    ceia: [
      util.alimento(hub.alimento.abacate, 100),
      util.alimento(hub.alimento.amendoas, 15),
    ]
  };


