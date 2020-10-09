export function ValidStreet(str: string) {
  let comAcento = `ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ"`;
  let semAcento = `AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr`;
  let novaStr = "";
  for (let i = 0; i < str.length; i++) {
    let troca = false;
    for (let a = 0; a < comAcento.length; a++) {
      if (str.substr(i, 1) == comAcento.substr(a, 1)) {
        novaStr += semAcento.substr(a, 1);
        troca = true;
        break;
      }
    }
    if (troca == false) {
      novaStr += str.substr(i, 1);
    }
  }
  return novaStr;
}
