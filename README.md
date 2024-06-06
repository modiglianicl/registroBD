# Configurando model/db.js

DB_USER= USUARIO DEL SERVIDOR
DB_PASSWORD= PASSWORD DEL USUARIO PARA EL SERVIDOR
DB_HOST= DIRECCION DEL SERVIDOR
DB_DATABASE= QUE BASE DE DATO ESTAREMOS USANDO EN NUESTRA DB

Recordar importar el .env!

# Comandos index.js

- Si no se le otorga argumentos , hara una query a toda lBD

## registrar
Se deben de usar todos los argumentos, si no no registrará, esto es para control de la integridad de los datos.
ejemplo:
index.js registrar nombre rut curso nivel

## buscar
Busca por RUT
ejemplo:
index.js buscar 17.809.555-k

## editar
El rut siempre es el ultimo argumento, y el obligatorio!
ejemplo:
index.js editar nombre curso nivel rut
Este se puede hacer con menos argumentos, por ejemplo
index.js editar nombre curso rut
index.js editar nombre rut

## borrar
Permite borrar con el rut.
ejemplo index.js borrar rut