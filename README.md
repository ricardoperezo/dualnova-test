# Coaching Impact Command Center

Dashboard de análisis y métricas de coaching en tiempo real.

## Requisitos Previos

- Node.js 20.19 o superior
- Docker
- npm

## Estructura del Proyecto
```
dualnova-project/
├── docker-compose.yml
├── backend/
│   └── src/
└── frontend/
    └── src/
```

## Instalación y Ejecución

### 1. Iniciar Elasticsearch

Desde la raíz del proyecto:
```bash
docker-compose up -d
```

Verificar que Elasticsearch esté corriendo:
```bash
curl http://localhost:9200
```

### 2. Backend

Navegar a la carpeta backend e instalar dependencias:
```bash
cd backend
npm install
```

Iniciar el servidor GraphQL:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:4000/graphql`

### 3. Frontend

En una nueva terminal, navegar a la carpeta frontend e instalar dependencias:
```bash
cd frontend
npm install
```

Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Tecnologías Utilizadas

### Backend
- Elasticsearch 8.11.0
- GraphQL Yoga
- TypeScript
- Node.js

### Frontend
- SvelteKit
- GraphQL Request
- TypeScript

## Endpoints GraphQL

### Query Principal
```graphql
query {
  metrics {
    totalSessions
    totalSessionsChange
    agentCoverage
    agentCoverageChange
    behaviorChangeIndex
    behaviorChangeIndexChange
    roiGenerated
    roiGeneratedChange
    skillFocus
    willFocus
    skillWillChange
  }
  employees {
    employeeId
    firstName
    lastName
    name
    team
    channel
    coach
    performanceScore
    lastCoachingDays
    coachingFrequency
    trend
  }
  coachingSessions {
    date
    dayName
    employee
    coach
    sessionCount
  }
}
```

## Componentes Principales

- **Header**: Título y subtítulo del dashboard con visualización de los filtros
- **MetricsCards**: Tarjetas con métricas clave y cambios porcentuales
- **EmployeeHeatmap**: Matriz visual de rendimiento de empleados
- **CoachingSessions**: Lista de sesiones de coaching por día

## Detener los Servicios

Detener Elasticsearch:
```bash
docker-compose down
```

Detener backend y frontend: `Ctrl + C` en sus respectivas terminales