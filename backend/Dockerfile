# Resmi Node.js imajını kullan
FROM node:20-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# Paket dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Geri kalan tüm proje dosyalarını kopyala
COPY . .

# Uygulamanın çalışacağı portu dışarı aç
EXPOSE 5000

# Uygulamayı başlat
CMD ["npm", "start"]