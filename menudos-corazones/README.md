# Menudos Corazones - Landing Page

Esta es la página de campaña interactiva para la **Fundación Menudos Corazones**. Está desarrollada utilizando **Astro**, **Aesthetic CSS**, **GSAP** para animaciones, y se alimenta dinámicamente de un servicio de WordPress Headless.

---

## 🔌 Integración con WordPress Headless API

Este proyecto se alimenta en tiempo de ejecución de un servicio WordPress Headless. Consume el endpoint de páginas filtrado por el slug `home`:

**URL del Endpoint:**
`https://develop-wp2.mystagingwebsite.com/wp-json/headless-api/v1/pages?slug=home`

El servicio de consulta se encuentra en `src/services/getPages.ts`. Los layouts dinámicos retornados por la API en `fields.layout` se procesan e integran directamente en `src/pages/index.astro` mapeándolos a componentes específicos:

- **`homeherobanner`** ➔ `<OHeroBanner />` (Hero section principal con fondos, textos y llamadas a la acción).
- **`stadistics`** ➔ `<OStatistics />` (Sección informativa con tarjetas de estadísticas animadas).
- **`vices` (Voces)** ➔ `<OVoces />` (Galeria interactiva de testimonios en video con reproductor de YouTube integrado).
- **`heart` (Cada Corazón Tiene su Historia)** ➔ `<OStoriesCarousel />` (Carrusel horizontal de historias de pacientes con lector interactivo).

---

## 🎨 Arquitectura del Diseño (AGENTS.md)

Siguiendo las directrices del sistema de diseño descritas en [AGENTS.md](file:///c:/Users/joseg/OneDrive/Escritorio/proyecto/personales/test/iberpixel/AGENTS.md), el proyecto implementa:

1. **Metodología Atomic Design**:
   - **Atoms (`src/components/atoms/`)**: Componentes mínimos e indivisibles (`a-button`, `a-title`, `a-paragraph`, `a-image`).
   - **Molecules (`src/components/molecules/`)**: Grupos de átomos con un propósito funcional simple (`m-nav-menu`, `m-stat-card`, `m-video-card`).
   - **Organisms (`src/components/organisms/`)**: Secciones complejas de la interfaz compuestas por moléculas y/o átomos (`o-header`, `o-hero-banner`, `o-statistics`, `o-voces`, `o-stories-carousel`).

2. **Nomenclatura BEMIT**:
   - Prefijos de estructura: `a-` para átomos, `m-` para moléculas, `o-` para organismos.
   - Formato estándar de clases: Block, Element (`__`), Modifier (`--`). Ejemplo: `.o-hero-banner__title`, `.a-button--primary`.
   - Modificadores de estado interactivo utilizando el prefijo `is-`. Ejemplo: `.is-active`, `.is-disabled`.
   - **Asignación obligatoria de clases**: Todos los elementos HTML en los componentes tienen una clase BEMIT asignada.

3. **Desacoplamiento de Datos (Ficheros de Metadatos)**:
   - Se crearon ficheros JSON con tokens de diseño bajo `src/services/metadata/` (`colors.json`, `typography.json`, `spacing.json`, `components.json`).
   - El acceso a estos tokens se realiza de forma exclusiva mediante funciones de servicio en `src/services/getServices/` (`getColors.ts`, `getTypography.ts`, `getSpacing.ts`, `getComponentData.ts`), abstrayendo al componente del origen de datos.
   - Los estilos CSS de cada componente se mantienen en un archivo `.css` separado e importado al inicio de cada componente `.astro` para mayor modularidad.

---

## ⚡ Animaciones GSAP (GSAP_ANIMATIONS.md)

La interactividad y las transiciones fluidas de la página se controlan a través de **GSAP (GreenSock Animation Platform)** y **SplitType**, bajo las siguientes especificaciones de [GSAP_ANIMATIONS.md](file:///c:/Users/joseg/OneDrive/Escritorio/proyecto/personales/test/iberpixel/GSAP_ANIMATIONS.md):

1. **Inicialización e Integración con Astro**:
   - Control centralizado de inicialización en `src/scripts/gsap-init.ts`.
   - El componente global `<GSAPInit />` carga y prepara GSAP de forma segura únicamente del lado del cliente (`typeof window !== 'undefined'`), garantizando compatibilidad SSR completa.
   - Escucha el evento `astro:page-load` para reactivar y recalcular las animaciones en transiciones de página.

2. **Efectos Utilizados**:
   - **`animateText`**: Divide títulos por palabras y caracteres con `split-type` y los revela secuencialmente con un retraso (stagger) muy fluido.
   - **`fadeInUp` / `scaleIn`**: Animación de entrada con ScrollTrigger para que las tarjetas de estadísticas, historias y videos aparezcan conforme el usuario hace scroll hacia ellas.
   - **Optimización de GPU**: Se añade `will-change: transform, opacity` a las clases animadas en los estilos globales para maximizar el rendimiento.

---

## ⚙️ Comandos y Scripts

Instalar dependencias necesarias:
```sh
pnpm install
```

Iniciar el servidor de desarrollo:
```sh
pnpm run dev
```

Construir la web para producción (SSR / Estática):
```sh
pnpm run build
```
