# Animaciones GSAP

Este proyecto utiliza **GSAP (GreenSock Animation Platform)** para crear animaciones fluidas y modernas, optimizadas para **Server-Side Rendering (SSR)** con Astro.

## 📦 Dependencias Instaladas

- `gsap`: Librería principal de animaciones
- `split-type`: Para animaciones de texto por caracteres, palabras o líneas

## 🎯 Características Principales

### ✅ Optimizado para SSR
Todas las animaciones están diseñadas para ejecutarse **solo en el cliente**, evitando errores durante el renderizado del servidor.

### ✅ Compatibilidad con Astro Transitions
Las animaciones se reinicializan automáticamente después de las transiciones de página de Astro.

### ✅ ScrollTrigger Integrado
Animaciones que se activan cuando los elementos entran en el viewport del usuario.

## 🛠️ Estructura del Sistema de Animaciones

```
src/
├── scripts/
│   └── gsap-init.ts          # Utilidades y funciones de animación
├── components/
│   └── atoms/
│       └── GSAPInit/
│           └── GSAPInit.astro # Inicializador global de GSAP
└── layouts/
    └── Layout.astro           # Layout principal con GSAPInit incluido
```

## 📚 Funciones de Animación Disponibles

### `initGSAP()`
Inicializa GSAP con configuraciones globales optimizadas.

### `animateText(selector, options)`
Anima texto con efectos de aparición por caracteres, palabras o líneas.

**Opciones:**
- `type`: 'chars' | 'words' | 'lines' (default: 'chars')
- `stagger`: Retraso entre cada elemento (default: 0.03)
- `duration`: Duración de la animación (default: 0.8)
- `delay`: Retraso inicial (default: 0)
- `scrollTrigger`: Activar con scroll (default: true)

**Ejemplo:**
```javascript
animateText('.my-title', {
  type: 'chars',
  stagger: 0.02,
  duration: 0.8,
  scrollTrigger: false
});
```

### `fadeInUp(selector, options)`
Anima elementos con fade in desde abajo.

**Opciones:**
- `stagger`: Retraso entre elementos (default: 0.15)
- `duration`: Duración (default: 0.8)
- `delay`: Retraso inicial (default: 0)
- `y`: Distancia vertical (default: 60)
- `scrollTrigger`: Activar con scroll (default: true)

### `fadeInLeft(selector, options)`
Anima elementos con fade in desde la izquierda.

### `fadeInRight(selector, options)`
Anima elementos con fade in desde la derecha.

### `scaleIn(selector, options)`
Anima elementos con efecto de escala.

**Opciones:**
- `scale`: Escala inicial (default: 0.8)
- Otras opciones similares a fadeInUp

### `parallaxImage(selector)`
Crea efecto parallax en imágenes durante el scroll.

## 🎨 Componentes Animados

### HeroBigFont
- Título con animación de caracteres
- Descripción con fade in
- Imagen con scale in
- Tarjeta flotante con animación continua

### About
- Imagen desde la izquierda
- Logo con fade in
- Quote con animación de palabras
- Texto de biografía con fade in

### Publications
- Título con animación de palabras
- Tarjetas con stagger escalonado

### VideoClips
- Videos con scale in escalonado
- Botón con fade in

### Brochure
- Contenido desde la izquierda
- Icono desde la derecha
- Hover effect en botón

### Header
- Fade in desde arriba al cargar

### FormContact
- Ya incluye animaciones GSAP personalizadas

## 🔧 Cómo Agregar Animaciones a Nuevos Componentes

### 1. Agregar clases identificadoras
```astro
<div class="my-component my-animated-element">
  <h2 class="my-title">Título</h2>
  <p class="my-text">Texto</p>
</div>
```

### 2. Importar funciones de animación
```astro
<script>
  import { fadeInUp, animateText } from '../../../scripts/gsap-init';

  function initMyComponentAnimations() {
    animateText('.my-title', {
      type: 'words',
      stagger: 0.08,
    });

    fadeInUp('.my-text', {
      duration: 1,
      delay: 0.3,
    });
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMyComponentAnimations);
  } else {
    initMyComponentAnimations();
  }

  // Re-ejecutar después de transiciones de Astro
  document.addEventListener('astro:page-load', initMyComponentAnimations);
</script>
```

### 3. (Opcional) Agregar will-change en CSS global
Para mejor rendimiento, agrega las clases a `src/global/style.css`:

```css
.my-animated-element {
    will-change: transform, opacity;
}
```

## ⚡ Mejores Prácticas

### ✅ DO
- Usar `scrollTrigger: true` para elementos fuera del viewport inicial
- Usar `scrollTrigger: false` para elementos del hero/above the fold
- Mantener duraciones entre 0.6s y 1.2s para mejor UX
- Usar stagger para grupos de elementos (0.1 - 0.2s)

### ❌ DON'T
- No animar demasiados elementos simultáneamente
- No usar duraciones muy largas (>2s)
- No olvidar el evento 'astro:page-load' para transiciones
- No ejecutar animaciones en el servidor (siempre verificar `typeof window !== 'undefined'`)

## 🎭 Tipos de Easing Disponibles

GSAP incluye múltiples tipos de easing:
- `power1.out`, `power2.out`, `power3.out`, `power4.out`
- `back.out(1.4)` - Efecto de rebote
- `elastic.out(1, 0.3)` - Efecto elástico
- `sine.inOut` - Suave y natural
- `expo.out` - Aceleración dramática

## 🐛 Troubleshooting

### Las animaciones no se ejecutan
1. Verifica que `GSAPInit` esté incluido en el Layout
2. Asegúrate de que las clases CSS existan en el DOM
3. Revisa la consola del navegador para errores

### Animaciones se ejecutan dos veces
- Verifica que no haya listeners duplicados
- Asegúrate de limpiar eventos anteriores si es necesario

### Elementos "saltan" antes de animar
- Agrega `will-change: transform, opacity` en CSS
- Verifica que los selectores sean correctos

## 📖 Recursos

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Documentation](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [SplitType Documentation](https://github.com/lukePeavey/SplitType)

## 🚀 Rendimiento

Todas las animaciones están optimizadas para:
- 60 FPS en dispositivos modernos
- Uso eficiente de GPU con `transform` y `opacity`
- Lazy loading con ScrollTrigger
- Compatibilidad con SSR de Astro
