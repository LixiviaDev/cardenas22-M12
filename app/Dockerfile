# Usa una imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu proyecto al contenedor
COPY package*.json ./

# Instala las dependencias definidas en package.json
RUN npm install

# Copia el resto de los archivos de tu proyecto
COPY . .

# Expone el puerto que tu aplicación utiliza (ajusta si es diferente)
EXPOSE 3000

# Comando por defecto al iniciar el contenedor
CMD ["npm", "start"]
