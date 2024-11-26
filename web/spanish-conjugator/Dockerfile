FROM node
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 8080
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]