# web-glossary

## Глоссарий терминов

Глоссарий представляет из себя файл в формате JSON, в котором хранятся термины и их определения. Термин в словаре имеет структуру:

```json
{
  "id": "",
  "name": "",
  "description": "",
  "relations": [
    {
      "id": "",
      "relation": ""
    },
    {
      "id": "",
      "relation": ""
    }
  ],
  "references": ["", ""]
}
```

## Запуск приложения

Серверная часть глоссария может быть запущена с помощью команды `npm run dev`.

Также можно запустить сервер в Docker. Docker-образ опубликован на Docker Hub, получить к нему доступ можно получить при помощи команды:

```
docker pull sstrawberrycheeks/glossary-api:latest
```

и затем запустить контейнер при помощи команды:

```
docker run -p 3000:3000 sstrawberrycheeks/glossary-api:latest
```

## Семантический граф

Семантический граф построен при помощи библиотеки [Sigma.js](https://www.sigmajs.org/).

Граф доступен по адресу /mindmap после запуска сервера/контейнера. Также полученный граф опубликован на [GitHub Pages](https://strawberrycheeks.github.io/web-glossary/).
