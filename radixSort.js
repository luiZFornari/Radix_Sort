const { log } = require("console");
const fs = require("fs");
const { stringify } = require("querystring");
const { parser } = require("stream-json");
const { streamArray } = require("stream-json/streamers/StreamArray");
var inputData = [];
var entradaIndex = 1999888;

// Função para processar cada objeto JSON lido do arquivo, colocando-o em um vetor
async function processJsonObject(jsonObj) {
  //console.log(jsonObj);
  inputData.push(jsonObj);
}

// Caminho do arquivo JSON de origem
const filePath = "./data.json";

// Cria um fluxo de leitura para o arquivo
const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });

// Cria um pipeline de fluxo com StreamArray
const jsonStream = readStream.pipe(parser()).pipe(streamArray());

// Lê e processa cada objeto JSON do array
jsonStream.on("data", ({ key, value }) => {
  processJsonObject(value);
});

// Captura erros no fluxo de leitura
readStream.on("error", (error) => {
  console.error(`Erro ao ler o arquivo: ${error.message}`);
});

// Captura erros no fluxo JSON
jsonStream.on("error", (error) => {
  console.error(`Erro ao analisar o JSON: ${error.message}`);
});

// Finaliza o processo ao terminar a leitura
jsonStream.on("end", () => {
  console.log("Leitura do arquivo concluída.");

  const months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  let monthData = [[], [], [], [], [], [], [], [], [], [], [], []];

  //Função para achar o numero mais grande do log
  function getMax(inputData, n) {
    let mx = inputData[0].log;
    for (let i = 1; i < n; i++)
      if (inputData[i].log > mx) mx = inputData[i].log;
    return mx;
  }

  //Função para mostrar os arrays dos meses oprdenados
  function showArrays(monthData) {
    for (let month in monthData) {
      console.log(month);
      monthData[month].forEach((e) => {
        console.log(e);
        console.log("----------");
      });
    }
  }

  //Função para achar o  impostor
  function impostor(monthData, index) {
    var somaTotalIndex = 0;
    var ValorIndex = index;

    //Função para colcocar cada objeto JSON em um array de acordo com o mês

    for (let i = 0; i < monthData.length; i++) {
      let month = monthData[i];
      somaTotalIndex += month.length;
      if (somaTotalIndex >= index) {
        var antes = new Date().getTime();
        radixsort(month);

        var depois = new Date().getTime();
        diferenca = depois - antes;
        console.log("Tempo de execução da ordenação: " + diferenca + "ms");

        antes = new Date().getTime();
        log;
        if (!month[ValorIndex - 1]) {
          log("Index invalido");
        } else {
          log("O impostor é: ");
          log(month[ValorIndex - 1]);
        }
        depois = new Date().getTime();
        diferenca = depois - antes;
        log("Tempo de execução da busca: " + diferenca + "ms");
        return;
      }
      ValorIndex -= month.length;
    }
  }

  function countSort(inputData, n, exp) {
    let output = new Array(n);
    let i;
    let count = new Array(10);
    for (let i = 0; i < 10; i++) count[i] = 0;

    for (i = 0; i < n; i++) {
      let x;
      x = Math.floor(inputData[i].log / exp) % 10;
      count[x]++;
    }

    for (i = 1; i < 10; i++) count[i] += count[i - 1];

    for (i = n - 1; i >= 0; i--) {
      let index;
      index = Math.floor(inputData[i].log / exp) % 10;
      output[count[index] - 1] = inputData[i];
      count[index]--;
    }

    for (i = 0; i < n; i++) inputData[i] = output[i];
  }

  // Itere sobre os arrays de cada mês e aplique a ordenação por log
  function radixsort(monthData) {
    let n = monthData.length;

    if (n > 0) {
      // Encontra o valor máximo do log
      let m = getMax(monthData, n);

      // Ordena por log utilizando o Counting Sort
      for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
        countSort(monthData, n, exp);
      }
    }
  }

  //showArrays(monthData);

  var antes = new Date().getTime();
  inputData.forEach((entry) => {
    var nummes = months[entry.month];
    monthData[nummes].push(entry);
  });
  impostor(monthData, entradaIndex);
  var depois = new Date().getTime();
  var diferenca = depois - antes;
  log(
    "Tempo de execução total, com a separação dos meses: " + diferenca + "ms"
  );
});
