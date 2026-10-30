# Medium Clone (Angular + NgRx)

A Medium style blogging app built with Angular and NgRx. It follows the [RealWorld](https://github.com/gothinkster/realworld) spec: users can sign up, write and edit articles, read feeds, filter by tags and add articles to favorites.

This is a learning project from a course about NgRx. I used it to practise a feature based store structure in a larger Angular app. The backend is a separate NestJS project: [mediumclone-nest](https://github.com/serj7220/mediumclone-nest).

## Features

- Sign up, sign in, sign out and user settings
- Global feed, personal feed and feeds by tag, with pagination
- Create, edit, view and delete articles
- Add articles to favorites
- User profiles
- Popular tags
- Server side validation errors shown in the forms

## How it is built

- **One store slice per feature.** Each feature (`auth`, `article`, `edit-article`, `settings` and others) has its own `actions`, `reducers`, `selectors` and `effects`. The root module only connects them.
- **Effects for all side effects.** API calls, redirects after login and saving the token live in NgRx Effects, so components only dispatch actions and read state through selectors.
- **Router state in the store** with `@ngrx/router-store`, and Redux DevTools support with `@ngrx/store-devtools`.
- **HTTP interceptor** adds the auth token to every request.
- **Reusable shared modules:** feed, pagination, tag list, popular tags, favorites button, article form, loading and error messages.

## Run locally

1. Start the backend from [mediumclone-nest](https://github.com/serj7220/mediumclone-nest). The app expects it on `http://localhost:3000` (see `src/environments`). You can also point `apiUrl` to any API that follows the RealWorld spec.
2. Start the frontend:

```bash
npm install
npm start
```

3. Open http://localhost:4200.

## Stack

Angular 13 (NgModules), NgRx 13 (Store, Effects, Router Store, Store DevTools), RxJS 7, TypeScript.
