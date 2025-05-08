FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
#CMD ["npx", "ts-node", "-r", "tsconfig-paths/register", "src/index.ts"]

#CMD ["node", "--loader", "ts-node/esm", "--require", "tsconfig-paths/register", "--experimental-specifier-resolution=node", "src/index.ts"]
#CMD ["node", "--loader", "ts-node/esm", "src/index.ts"]
#CMD [
#  "npx", "nodemon",
#  "--watch", "src",
#  "--ext", "ts",
#  "--exec", "node",
#  "--loader", "ts-node/esm",
#  "--require", "tsconfig-paths/register",
#  "--experimental-specifier-resolution=node",
#  "src/index.ts"
#]

#CMD ["npx", "nodemon", "--watch", "src", "--ext", "ts", "--exec", "node", "--loader", "ts-node/esm", "--require", "tsconfig-paths/register", "--experimental-specifier-resolution=node", "src/index.ts"]
#CMD ["node", "--loader", "ts-node/esm", "--require", "tsconfig-paths/register", "--experimental-specifier-resolution=node", "src/index.ts"]
