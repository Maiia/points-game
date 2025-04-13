FROM node:18

# Створити директорію для застосунку
WORKDIR /app

# Копіюємо package.json та встановлюємо залежності
COPY package*.json ./
RUN npm install

# Копіюємо код
COPY . .

# Запускаємо сервіс
CMD ["node", "--loader", "ts-node/esm", "src/index.ts"]