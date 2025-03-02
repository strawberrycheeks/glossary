import axios from "axios";
import express from "express";

const TERMS_URL =
  "https://raw.githubusercontent.com/strawberrycheeks/web-glossary/refs/heads/main/dictionary.json";
const PORT = 3000;

type Term = {
  id: string;
  name: string;
  description: string;
  url: string;
};

let terms: Term[] = [];

const downloadTerms = async () => {
  try {
    const response = await axios.get(TERMS_URL);
    terms = response.data.terms;
  } catch (error) {
    console.error("При загрузке терминов произошла ошибка:", error);
  }
};

const expressApp = express();

expressApp.get("/", (_, response) => {
  response
    .status(200)
    .send(
      'Глоссарий для выпускной квалификационной работы на тему "Исследование особенностей моделей машинного обучения с использованием библиотеки TensorFlow.js"'
    );
});

expressApp.get("/terms", (_, response) => {
  response.status(200).json(terms);
});

expressApp.get("/terms/:id", (request, response) => {
  const termId = request.params.id;
  const term = terms.find((t) => t.id === termId);

  if (term) {
    response.status(200).json(term);
  } else {
    response
      .status(404)
      .json({ error: `По запросу ${termId} термин не найден` });
  }
});

expressApp.listen(PORT, async (error) => {
  if (error) {
    console.error("При запуске сервера произошла ошибка:", error);
    return;
  }

  await downloadTerms();
  console.log(
    `Сервер успешно запущен и доступен по адресу: http://localhost:${PORT}`
  );
});
