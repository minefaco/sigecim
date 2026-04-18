

Diagrama de flujo del software:
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
    Seleccion --> Persistencia[Registro en Base de Datos SQL]:::proceso
    Persistencia --> Notificacion[Generación de comprobante/notificación]:::proceso
    
    Notificacion --> Fin((Fin: Cita Programada)):::inicio_fin

    %% Notas de Contexto (Fronteras)
    subgraph SGC_Sistema_de_Gestion
        Ingreso
        Consulta
        Seleccion
        Persistencia
        Notificacion
    end