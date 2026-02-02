# pull official base image
FROM node:13.12.0-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
# RUN npm install @mui/material @mui/lab @emotion/react @emotion/sty
RUN npm install "@uiw/react-textarea-code-editor@2.0.1"

# add app
COPY . ./

# start app
CMD ["npm", "start"]





### pull official base image
##FROM node:13.12.0-alpine
##
### set working directory
##WORKDIR /app
##
### add `/app/node_modules/.bin` to $PATH
##ENV PATH /app/node_modules/.bin:$PATH
##
### install app dependencies
##COPY package.json ./
##COPY package-lock.json ./
##RUN npm install --silent
##RUN npm install react-scripts@3.4.1 -g --silent
##
#### add app
###COPY src /app
###
#### start app
###CMD npm run build
###CMD npm run start /build
##
##COPY . ./
##
### start app
##CMD ["npm", "start"]
#
## pull official base image
#FROM node:14.2.0-alpine
#
## set working directory
#WORKDIR /frontend
#
## add `/app/node_modules/.bin` to $PATH
#ENV PATH /frontend/node_modules/.bin:$PATH
#
## install app dependencies
#COPY package.json ./
#COPY package-lock.json ./
#RUN npm cache clean --force
#RUN npm install --no-package-lock
#RUN npm install react-scripts@3.4.1 -g --no-package-lock
#
## add app
#COPY . ./
#
## start app
#RUN npm run build
#
##COPY --from=build-stage /app/build/ /usr/share/nginx/html
#RUN cd build
#CMD npm run start
#

