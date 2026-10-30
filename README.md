# Blog

Личный технический блог на Hugo и [Typo](https://github.com/tomfran/typo).

Сайт: **https://iampavelkozlov.github.io/blog/**

## Локальный запуск

Нужны Git, Make и Hugo **0.169.0** (версия закреплена в `.hugo-version`). Node.js и Go для сборки не требуются.

```sh
brew install hugo
git clone --recurse-submodules git@github-work:iampavelkozlov/blog.git
cd blog
make dev
```

Hugo напечатает локальный адрес. Черновики доступны только в режиме разработки.
Для уже склонированного проекта: `git submodule update --init --recursive`.

## Новая заметка

```sh
make new SLUG=my-note
```

Файл появится в `content/posts/my-note/index.md`. Заголовок, описание и теги задаются в TOML front matter. Пока `draft = true`, заметка не публикуется. После редактирования установите `draft = false`, выполните `make check`, закоммитьте и отправьте изменения в `main`.

Используйте короткие уникальные slug латиницей. Адрес заметки: `/blog/posts/my-note/`.
Если передаёте `slug` явно, он определяет адрес вместо имени каталога.

Код оформляется обычными fenced-блоками Markdown с языком, например `go` или `sql`.
Для схем укажите язык `mermaid`. Библиотека Mermaid 12.2.0 загружается с jsDelivr только на страницах со схемами и учитывает системную светлую/тёмную тему.

Оглавление, подсветка и копирование кода, теги, RSS и sitemap настроены. Изображения и обложки для публикации не нужны. Контент проекта пока отсутствует.

## Сборка и публикация

```sh
make check
```

Команда собирает production-сайт в `public/`, останавливается при предупреждениях Hugo и проверяет пробельные ошибки Git. Черновики и будущие публикации в production-сборку не попадают. Сгенерированные файлы не коммитятся.

GitHub Actions проверяет pull request и публикует `main` в GitHub Pages. Workflow можно запустить вручную во вкладке Actions. Источник Pages: **GitHub Actions**. Пользовательские токены и отдельная ветка с HTML не нужны.

`baseURL` содержит `/blog/`; внутренние ссылки и локальные шрифты учитывают этот префикс. При подключении своего домена обновите `baseURL` в `hugo.toml` и настройки Pages.

## Обновление темы

Typo подключена Git submodule и закреплена на **v3.0.2**. Изменения оформления находятся в `layouts/`, `assets/` и `static/` проекта. Файлы внутри `themes/typo` не редактируются.

Для обновления выберите релиз, выполните `git -C themes/typo fetch --tags`, затем `git -C themes/typo checkout <tag>`. Проверьте `make check` и оформление статьи с кодом и Mermaid перед коммитом нового указателя submodule. Dependabot предлагает обновления GitHub Actions; Hugo, Typo и Mermaid обновляются отдельно после проверки.
