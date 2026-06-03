import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Safe registration of GSAP plugins on the client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function initGSAP() {
  if (typeof window === 'undefined') return;
  // Global configuration if needed
  gsap.config({
    nullTargetWarn: false,
  });
}

interface AnimateTextOptions {
  type?: 'chars' | 'words' | 'lines';
  stagger?: number;
  duration?: number;
  delay?: number;
  scrollTrigger?: boolean;
}

export function animateText(selector: string, options: AnimateTextOptions = {}) {
  if (typeof window === 'undefined') return;

  const {
    type = 'chars',
    stagger = 0.03,
    duration = 0.8,
    delay = 0,
    scrollTrigger = true,
  } = options;

  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    // Split the text
    const textSplit = new SplitType(element as HTMLElement, { types: type });
    const targets = type === 'chars' ? textSplit.chars : type === 'words' ? textSplit.words : textSplit.lines;

    if (!targets || targets.length === 0) return;

    // Reset initial styles to avoid flash of content
    gsap.set(targets, { opacity: 0, y: 15 });

    const animConfig: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power2.out',
    };

    if (scrollTrigger) {
      animConfig.scrollTrigger = {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      };
    }

    gsap.to(targets, animConfig);
  });
}

interface FadeInOptions {
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
  x?: number;
  scrollTrigger?: boolean;
}

export function fadeInUp(selector: string, options: FadeInOptions = {}) {
  if (typeof window === 'undefined') return;

  const {
    stagger = 0.15,
    duration = 0.8,
    delay = 0,
    y = 60,
    scrollTrigger = true,
  } = options;

  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  // Set initial states
  gsap.set(elements, { opacity: 0, y });

  const animConfig: gsap.TweenVars = {
    opacity: 1,
    y: 0,
    duration,
    delay,
    stagger,
    ease: 'power2.out',
  };

  if (scrollTrigger) {
    animConfig.scrollTrigger = {
      trigger: elements[0],
      start: 'top 85%',
      toggleActions: 'play none none none',
    };
  }

  gsap.to(elements, animConfig);
}

export function fadeInLeft(selector: string, options: FadeInOptions = {}) {
  if (typeof window === 'undefined') return;

  const {
    stagger = 0.15,
    duration = 0.8,
    delay = 0,
    x = -60,
    scrollTrigger = true,
  } = options;

  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  gsap.set(elements, { opacity: 0, x });

  const animConfig: gsap.TweenVars = {
    opacity: 1,
    x: 0,
    duration,
    delay,
    stagger,
    ease: 'power2.out',
  };

  if (scrollTrigger) {
    animConfig.scrollTrigger = {
      trigger: elements[0],
      start: 'top 85%',
      toggleActions: 'play none none none',
    };
  }

  gsap.to(elements, animConfig);
}

export function fadeInRight(selector: string, options: FadeInOptions = {}) {
  if (typeof window === 'undefined') return;

  const {
    stagger = 0.15,
    duration = 0.8,
    delay = 0,
    x = 60,
    scrollTrigger = true,
  } = options;

  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  gsap.set(elements, { opacity: 0, x });

  const animConfig: gsap.TweenVars = {
    opacity: 1,
    x: 0,
    duration,
    delay,
    stagger,
    ease: 'power2.out',
  };

  if (scrollTrigger) {
    animConfig.scrollTrigger = {
      trigger: elements[0],
      start: 'top 85%',
      toggleActions: 'play none none none',
    };
  }

  gsap.to(elements, animConfig);
}

interface ScaleInOptions {
  scale?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  scrollTrigger?: boolean;
}

export function scaleIn(selector: string, options: ScaleInOptions = {}) {
  if (typeof window === 'undefined') return;

  const {
    scale = 0.8,
    stagger = 0.15,
    duration = 0.8,
    delay = 0,
    scrollTrigger = true,
  } = options;

  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  gsap.set(elements, { opacity: 0, scale });

  const animConfig: gsap.TweenVars = {
    opacity: 1,
    scale: 1,
    duration,
    delay,
    stagger,
    ease: 'back.out(1.2)',
  };

  if (scrollTrigger) {
    animConfig.scrollTrigger = {
      trigger: elements[0],
      start: 'top 85%',
      toggleActions: 'play none none none',
    };
  }

  gsap.to(elements, animConfig);
}

export function parallaxImage(selector: string) {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    gsap.to(element, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}
