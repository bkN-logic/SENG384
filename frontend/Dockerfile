# Resmi Node imajını kullan
FROM node:20-alpine

# Çalışma dizinini belirle
WORKDIR /app

# Paket dosyalarını kopyala ve kur
COPY package*.json ./
RUN npm install

# Proje dosyalarını kopyala
COPY . .

# Vite'in varsayılan 3000 portunu aç
EXPOSE 3000

# Geliştirme sunucusunu başlat
CMD ["npm", "run", "dev"]