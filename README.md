

### 📊 Diagrama de Flujo del Proceso

```mermaid
graph TD
    %% Definición de Estilos
    classDef inicio_fin fill:#f9f,stroke:#333,stroke-width:2px;
    classDef proceso fill:#bbf,stroke:#333,stroke-width:2px;
    classDef decision fill:#fff4dd,stroke:#d4a017,stroke-width:2px;

    %% Flujo del Proceso
    Inicio((Inicio: Solicitud de Cita)):::inicio_fin --> Ingreso[Paciente ingresa datos al sistema]:::proceso
    Ingreso --> Consulta{¿Existe disponibilidad?}:::decision
    
    Consulta -- No --> Alternativas[Sistema ofrece horarios alternos]:::proceso
    Alternativas --> Consulta
    
    Consulta -- Sí --> Seleccion[Selección de especialista y horario]:::proceso
    Seleccion --> Persistencia[Registro en MongoDB]:::proceso
    Persistencia --> Notificacion[Generación de comprobante]:::proceso
    
    Notificacion --> Fin((Fin: Cita Programada)):::inicio_fin

    subgraph SGC_Sistema_de_Gestion
        Ingreso
        Consulta
        Seleccion
        Persistencia
        Notificacion
    end

    ## Credenciales de Acceso (Entorno de Pruebas)

Para facilitar las pruebas de los diferentes roles y permisos del sistema **SIGECIM**, puedes utilizar las siguientes cuentas precargadas mediante el script `seed.js`:

| Rol | Usuario | Correo Electrónico | Contraseña |
| :--- | :--- | :--- | :--- |
| 🚩 **Admin** | Administrador General | `admin@sigecim.com` | `admin123` |
| 🩺 **Médico** | Dr. Gregory House | `house@sigecim.com` | `med123` |
| 🩺 **Médico** | Dra. Meredith Grey | `grey@sigecim.com` | `med123` |
| 🩺 **Médico** | Dr. Shaun Murphy | `murphy@sigecim.com` | `med123` |
| ⌨️ **Recepción** | Pam Beesly | `pam@sigecim.com` | `recep123` |
| ⌨️ **Recepción** | Emily Charlton | `emily@sigecim.com` | `recep123` |
| 👤 **Paciente** | Juan Pérez | `juan@paciente.com` | `paci123` |
| 👤 **Paciente** | Maria García | `maria@paciente.com` | `paci123` |
| 👤 **Paciente** | Carlos Ruiz | `carlos@paciente.com` | `paci123` |
| 👤 **Paciente** | Ana Martínez | `ana@paciente.com` | `paci123` |
| 👤 **Paciente** | Luis Rodríguez | `luis@paciente.com` | `paci123` |

> **Nota:** Estas cuentas se generan automáticamente al ejecutar el comando `node seed.js`. La base de datos se limpia y se vuelve a poblar con estos datos cada vez que se ejecuta el script.

### 🧪 Casos de Prueba Recomendados
1. **Perfil Médico:** Ingresa con el paciente `Juan Pérez` para ver una ficha médica con alergias y datos clínicos completos.
2. **Agendamiento:** Como paciente, verifica que en el formulario de citas solo aparezcan los usuarios con el rol `Medico`.
3. **Seguridad:** Intenta acceder a `/usuarios` estando logueado como un `Paciente` (el sistema debería denegar el acceso según los middlewares).