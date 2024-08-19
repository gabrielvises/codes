import  * as marmita from "./marmita.js";
import  * as hub from "./hub.js";
import  * as util from "./util.js";


export const refeicoes = {
    preCafeDaManha: [
      hub.alimento.maca,
      hub.alimento.mamaoFormosa,
      hub.alimento.kiwi,
      hub.alimento.melao,
      hub.alimento.pera,

    ],
    cafeDaManha: [
      hub.alimento.ovos,
      hub.alimento.azeiteDeOlive,
      hub.alimento.aveia,
      hub.alimento.brócolis,
      hub.alimento.pao
    ],
    almoco: [
      ...marmita.marmita
    ],
    lancheDaTarde: [
     hub.alimento.leite,
     hub.alimento.whey,
     hub.alimento.banana,
     util.alimento(hub.alimento.morango,50),
    ],
    jantar: [
      ...marmita.marmita
     ],
    ceia: [
      hub.alimento.abacate,
      hub.alimento.amendoas,
    ]
  };


