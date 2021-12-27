FROM node:16-alpine
 

# Our working directory 
WORKDIR /app 

 

# Set node env 
ENV NODE_ENV=production 
 

# Copy the required files 
COPY package.json . 
COPY yarn.lock . 
COPY favicon.ico . 
COPY src/ src/ 
COPY config/ config/ 
COPY public/robots.txt public/ 

 
 

# Install dependencies and run build 
RUN yarn --production --frozen-lockfile 
RUN yarn build 

 
EXPOSE 1337 


CMD ["yarn", "start"] 