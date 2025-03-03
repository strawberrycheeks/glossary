import axios from "axios";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let terms = [];
const downloadTerms = async () => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/strawberrycheeks/web-glossary/refs/heads/main/dictionary.json"
    );
    terms = response.data.terms;
  } catch (error) {
    console.error("При загрузке терминов произошла ошибка:", error);
  }
};

const expressApp = express();

expressApp.get("/", (_, response) => {
  response.send(
    'Глоссарий для выпускной квалификационной работы на тему "Исследование особенностей моделей машинного обучения с использованием библиотеки TensorFlow.js"'
  );
});

expressApp.get("/mindmap", (_, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

expressApp.get("/terms", (_, response) => {
  response.json(terms);
});

expressApp.get("/terms/:id", (request, response) => {
  const termId = request.params.id;
  const term = terms.find((t) => t.id === termId);

  if (term) {
    response.json(term);
  } else {
    response.status(404).send(`По запросу ${termId} термин не найден`);
  }
});

expressApp.listen(3000, async (error) => {
  if (error) {
    console.error("При запуске сервера произошла ошибка:", error);
    return;
  }

  await downloadTerms();
  console.log(
    `Сервер успешно запущен и доступен по адресу: http://localhost:${3000}`
  );
});
