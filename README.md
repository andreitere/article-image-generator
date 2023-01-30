# Article Image Generator

This repository contains a fastify server + a tailwind built html template usefull to generate images for blog article preview on social media

![example output](./example-output.jpg)


## Developing the template

A custom tailwind theme is configured (see [tailwind.config.cjs](./tailwind.config.cjs)). 


In [index.html](./index.html) you can find and customize the full template.

[main.js](./src/main.js) is usefull mainly when serving the index.html file with the fastify server (see [server.js](./server.js)) to pull the parameters (title and description) and simply inject them into the html.


## Building the template

Run `pnpm run build` to build the template. This will generate/update the [dist](./dist/) folder which will be served by fastify.


## Calling the endpoints

By default the server runs on port 3000. See [server.js](./server.js) `APP_PORT` variable. This can be configured also in the [.Dockerfile](./.Dockerfile)

### Generate image


```js
await fetch(`http://0.0.0.0:3001`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      description,
      slug
    }),
    json: true
  })
```

Slug is the name under which the jpg file will pe saved.

As a response from this endpoints you will get back something like this:

```json
{
    file: 'filename.jpg'
}
```

All the generated files are `jpg`.

### Retrieving the image

To retrieve the image simply execute a GET request to 

```
http://localhost:3000/screens/${file}
```

eg: http://localhost:3000/screens/filename.jpg
