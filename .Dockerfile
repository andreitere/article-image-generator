FROM node

WORKDIR /app

COPY /dist /app/dist


ENV APP_PORT 3000

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install curl gnupg -y \
    && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install google-chrome-stable -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*


COPY server.js .
COPY package.json .

COPY puppeteer.config.cjs .
RUN npm install

RUN node node_modules/puppeteer/install.js 



EXPOSE ${APP_PORT}

CMD node server.js