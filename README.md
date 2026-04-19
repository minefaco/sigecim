# SIGECIM - Sistema de Gestión de Citas Médicas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

**SIGECIM** es una plataforma web integral desarrollada para la administración eficiente de una clínica o centro médico. Permite la interacción fluida entre pacientes, médicos, recepcionistas y administradores bajo un modelo de arquitectura limpia (MVC).

---

## Características Principales por Rol

* **Administrador:** Gestión de usuarios y acceso a la agenda global de la clínica.
* **Recepcionista:** Creación manual de citas (con búsqueda inteligente por documento/nombre), confirmación, cancelación y visualización de fichas médicas detalladas.
* **Médico:** Consultorio virtual exclusivo. Permite ver los pacientes asignados del día, registrar diagnósticos, recetar medicamentos y finalizar consultas.
* **Paciente:** Visualización del perfil médico (EPS, alergias, tipo de sangre), agendamiento de citas filtrando especialistas y acceso al historial de consultas.

---

## Tecnologías y Dependencias Principales

El proyecto está construido sobre el ecosistema de JavaScript y Node.js.

* **Backend:** Express.js
* **Base de Datos:** MongoDB (Modelado con Mongoose)
* **Motor de Plantillas:** EJS (con `ejs-mate` para Layouts)
* **Autenticación y Seguridad:** `express-session`, `bcrypt` (encriptación de contraseñas)
* **Manejo de Formularios Web:** `method-override` (Para soportar peticiones PUT/DELETE)
* **Frontend Interactivo:** Bootstrap 5 (CSS/JS) y [Tom Select](https://tom-select.js.org/) (Vía CDN para búsquedas dinámicas).

---

## Guía de Instalación y Puesta en Marcha

Sigue estas instrucciones cuidadosamente para levantar el entorno de desarrollo local.

### 1. Requisitos Previos
Asegúrate de tener instalados en tu máquina:
* [Node.js](https://nodejs.org/es/) (v14 o superior)
* [MongoDB](https://www.mongodb.com/try/download/community) (Local) o una cuenta en MongoDB Atlas.
* Git

### 2. Clonar el Repositorio
```bash
git clone [https://github.com/minefaco/sigecim.git](https://github.com/tu-usuario/sigecim.git)
cd sigecim

    ## Credenciales de Acceso (Entorno de Pruebas)

Para facilitar las pruebas de los diferentes roles y permisos del sistema **SIGECIM**, puedes utilizar las siguientes cuentas precargadas mediante el script `seed.js`:

| Rol | Usuario | Correo Electrónico | Contraseña |
| :--- | :--- | :--- | :--- |
| **Admin** | Administrador General | `admin@sigecim.com` | `admin123` |
| **Médico** | Dr. Gregory House | `house@sigecim.com` | `med123` |
| **Médico** | Dra. Meredith Grey | `grey@sigecim.com` | `med123` |
| **Médico** | Dr. Shaun Murphy | `murphy@sigecim.com` | `med123` |
| **Recepción** | Pam Beesly | `pam@sigecim.com` | `recep123` |
| **Recepción** | Emily Charlton | `emily@sigecim.com` | `recep123` |
| **Paciente** | Juan Pérez | `juan@paciente.com` | `paci123` |
| **Paciente** | Maria García | `maria@paciente.com` | `paci123` |
| **Paciente** | Carlos Ruiz | `carlos@paciente.com` | `paci123` |
| **Paciente** | Ana Martínez | `ana@paciente.com` | `paci123` |
| **Paciente** | Luis Rodríguez | `luis@paciente.com` | `paci123` |

> **Nota:** Estas cuentas se generan automáticamente al ejecutar el comando `node seed.js`. La base de datos se limpia y se vuelve a poblar con estos datos cada vez que se ejecuta el script.

