# Reto Técnico Backend  💻
---

## Descripción ℹ️

**API** para la gestion de procesos internos del hospital **ColmenaLab**. Los procesos a gestionar son:
* Doctores
* Pacientes
* Citas médicas
* Ordenes médicas
* Medicamentos
* Inventario de medicamentos

---

### Requerimientos ⚙️
- Docker

---

## Instalación 🚀

1. Clonar el repositorio.

```bash
$ git clone https://github.com/CristianAlba75/test-lab-colmena.git
```
2. Crear archivo .env tomando como referencia el archivo **.env.example**.

---

## Ejecución del API 🏃🏻‍➡️

1. Ejecutar el siguiente comando para levantar los contenedores (**Base de datos** y **API**).

```bash
$ docker compose up -d --build
```

2. Conectarse a la base de datos mediante herramienta de preferencia.

3. Crear usuario administrador de forma manual para dar inicio al flujo. Insertar en la tabla **user** un nuevo registro con los siguientes datos:
    - **email**: ejemplo@gmai.com
    - **password**: admin123 (El password debe ser hasheado con bcrypt)
    - **role**: ADMIN

Luego de crear el usuario, se puede iniciar sesión en la API y crear nuevos usuarios con los roles **DOCTOR** o **PATIENT**.

---

### Autor ✒️

Desarrollado por Cristian Eduardo González Alba

🛠️ <https://github.com/CristianAlba75/test-lab-colmena>