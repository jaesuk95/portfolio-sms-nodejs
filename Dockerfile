#ENV TZ=Asia/Seoul
#
## Use an official NodeJS runtime as a parent image
#FROM node:14
#
## Set the working directory to /app
#WORKDIR /app
#
## Copy the current directory contents into the container at /app
#COPY . /app
#
## Install any needed dependencies specified in package.json
#RUN npm install
#
## Make port 6000 available to the world outside this container
#EXPOSE 6000
#
## Define environment variables
#ENV NODE_ENV=production
#
## Run the app when the container launches
#CMD ["npm", "start"]


FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 6000
CMD [ "npm", "start" ]
