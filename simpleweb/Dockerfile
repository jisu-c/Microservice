# Specify a base image
FROM node:alpine

# Install some dependencies
WORKDIR /user/app
COPY ./ /user/app
RUN npm install

# Default command
CMD ["npm", "start"]