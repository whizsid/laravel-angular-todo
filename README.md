# Example todo app developed with Laravel and Angular JS

This is a sample Laravel/AngularJS web application

## Build Frontend

1. Install dependencies

```
yarn
```

2. Edit the config file

```
nano resources/ts/config.ts
```

3. Compile the sources/ Build the sources

```
yarn build

// or

yarn start
```


## Build Backend

1. Install dependencies

```
composer install
```

2. Edit the environment variables

```
nano .env
```

3. Migrate the database

```
php artisan migrate
```

4. Server the project

```
php artisan serve
```

