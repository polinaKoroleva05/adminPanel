# Панель администрирования пользователей

При отсутствии активной авторизации пользователь попадает на страницу авторизации:
![Авторизация](https://github.com/polinaKoroleva05/adminPanel/blob/main/public/login.png)
Если пользователь успешно авторизован, он перенаправляется на главную страницу:
![Главная страница](https://github.com/polinaKoroleva05/adminPanel/blob/main/public/mainPage.png)
В приложении можно редактировать, создавать и удалять пользователей:
![Страница создания](https://github.com/polinaKoroleva05/adminPanel/blob/main/public/createPage.png)
При удалении запрашивается подтверждение:
![Запрос удаления](https://github.com/polinaKoroleva05/adminPanel/blob/main/public/delete.png)
Доступна темная тема:
![Главная страница темная тема](https://github.com/polinaKoroleva05/adminPanel/blob/main/public/mainPageDark.png)

Запуск:
1. Склонируйте репозиторий
2. Выполните для установки зависимостей: `npm install`
3. Запустите: `npm run dev`

Дефолтная учетка:
- email - admin@inno.tech 
- password - admin

Использованные технологии:
1. React + TypeScript
2. React Router v6
3. Tanstack Query
4. Сборщик проекта: Vite
5. UI-фреймворк: Mantine
6. Инструменты стилизации:CSS Modules
7. Менеджер форм mantine/form
8. i18next для локализации

В качестве API использовался: [https://github.com/Pardeg/forms-server](https://github.com/Pardeg/forms-server)