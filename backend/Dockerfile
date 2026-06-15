FROM node:22-alpine

WORKDIR /app

COPY . .

# Remove a pasta node_modules se existir, para evitar conflitos
RUN rm -rf node_modules
# Instala as dependências do projeto sem o node_modules
RUN npm install 

CMD ["npm", "start"]

EXPOSE 8080