# Client Gateway

## Dev

1. CLonar el repo
2. Instalar dependencias
3. Crear un archivo env basado en el example `env.template`
4. Ejecutar `npm run start:dev`

## Nast

```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```
