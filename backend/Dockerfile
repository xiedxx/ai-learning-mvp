
FROM php:8.2-fpm

# 安装必要扩展
RUN apt-get update && apt-get install -y \
    unzip git curl libpq-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

# 安装 Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# 默认情况下我们挂载 backend 代码
COPY . .

CMD ["php-fpm"]

