# Node.js resmi imajını kullan
FROM node:14

# Uygulama dosyalarını konteynere kopyala
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Uygulamayı çalıştır
CMD [ "node", "server.js" ]
