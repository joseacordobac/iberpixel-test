# AGENTS.md - Design System Agent Guidelines

## Overview

This document outlines the structure, configuration, and operational guidelines for AI agents supporting design requests within our design system. The system follows the **Atomic Design methodology** and utilizes the **BEMIT naming convention** to ensure consistency, scalability, and maintainability.

---

## 1. Folder Structure

The design system is organized into a clear hierarchy that aligns with Atomic Design principles:

```
design-system/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
└── services/
    ├── metadata/
    └── getServices/
```

### 1.1 Components Directory

The `components/` directory contains all UI components organized by their complexity level according to Atomic Design methodology.

#### `atoms/`
**Purpose**: Contains the smallest, indivisible building blocks of the interface.

- **Examples**: buttons, input fields, labels, icons, links, typography elements
- **Characteristics**:
  - Cannot be broken down into smaller components
  - Highly reusable across the entire system
  - Single responsibility (one element, one purpose)
  - Minimal dependencies

**Alignment with Atomic Design**: Atoms represent the fundamental HTML elements styled to fit the design system. They are the foundation upon which all other components are built.

#### `molecules/`
**Purpose**: Contains simple groups of atoms that function together as a unit.

- **Examples**: search bars (input + button), form fields (label + input + error message), card headers (icon + title)
- **Characteristics**:
  - Composed of 2-5 atoms
  - Serve a single, clear purpose
  - Relatively simple in structure
  - Reusable in multiple contexts

**Alignment with Atomic Design**: Molecules combine atoms to create functional UI elements. They represent the smallest compound components that deliver meaningful functionality.

#### `organisms/`
**Purpose**: Contains complex components composed of multiple molecules and/or atoms.

- **Examples**: navigation bars, forms, card components, data tables, hero sections
- **Characteristics**:
  - Composed of multiple molecules and atoms
  - Form distinct sections of an interface
  - May contain business logic or complex interactions
  - More context-specific than molecules

**Alignment with Atomic Design**: Organisms are relatively complex UI components that form distinct sections of an interface. They combine molecules and atoms to create sophisticated, functional units.

**NOTE**: css styles for each component must be in a separate file and imported in the component file, the styles must follow the BEMIT naming convention and must be scoped to the component.

### 1.2 Services Directory

The `services/` directory manages data retrieval and metadata for the design system. It follows a clear separation of concerns: data storage in `metadata/` and data access through `getServices/`.

#### `metadata/`
**Purpose**: Stores JSON data files that define design elements, their properties, and general information. This is the single source of truth for all design system data.

- **Contents**: JSON files containing:
  - Color palettes and theme definitions
  - Typography scales and font configurations
  - Spacing systems and layout grids
  - Component property definitions
  - Design tokens and variables
  - Accessibility guidelines
  - General configuration data

- **Important**: This folder contains **raw data only**. Components should never directly import from this folder.

**Example Structure**:
```
services/metadata/
├── colors.json
├── typography.json
├── spacing.json
├── components.json
└── breakpoints.json
```

#### `getServices/`
**Purpose**: Contains service functions that retrieve and provide data from the `metadata/` folder to components. This abstraction layer allows for future migration to external API endpoints without changing component code.

- **Key Benefits**:
  - **Abstraction**: Components don't need to know where data comes from
  - **Flexibility**: Easy to switch from local JSON to external API endpoints
  - **Consistency**: Centralized data access logic
  - **Maintainability**: Single place to update when data source changes

- **Naming Convention**: Services should be named clearly to indicate what data they retrieve (e.g., `getColors.js`, `getTypography.js`, `getComponentData.js`)

**Example Structure**:
```
services/getServices/
├── getColors.js
├── getTypography.js
├── getSpacing.js
├── getComponentData.js
└── getBreakpoints.js
```

**Current Implementation**: Services read from local JSON files in `metadata/`

**Future Migration Path**: Services can be updated to fetch from external endpoints without changing component implementations

**Example Service Function**:
```javascript
// services/getServices/getColors.js
import colorsData from '../metadata/colors.json';

export async function getColors() {
  // Current: Return local data
  return colorsData;
  
  // Future: Fetch from API endpoint
  // const response = await fetch('https://api.example.com/colors');
  // return response.json();
}

export function getColorByName(colorName) {
  return colorsData[colorName];
}
```

---

## 2. Component Creation

### 2.1 Component Analysis Workflow

When receiving a design request, agents should follow this systematic approach:

**Step 1: Analyze the Design Requirement**
- Identify the UI element(s) needed
- Determine the complexity level (atom, molecule, or organism)
- List required functionality and visual properties

**Step 2: Check for Existing Components**
- Search the appropriate directory (`atoms/`, `molecules/`, or `organisms/`)
- Review component documentation and implementations
- Assess if existing components meet the requirements

**Step 3: Decide on Action**
- **Reuse**: If a component exists and meets requirements, use it as-is
- **Modify**: If a component exists but needs adjustments, create a variant or extend it
- **Create**: If no suitable component exists, create a new one

### 2.2 Component Modification Criteria

Modify an existing component when:
- The core functionality remains the same but styling differs
- Additional properties or states are needed
- The component requires minor feature enhancements
- Creating a variant would maintain consistency

**Modification Approach**:
- Create component variants using modifiers (e.g., `a-button--primary`, `a-button--secondary`)
- Extend the base component rather than duplicating code
- Document all modifications and variants
- Update metadata files to reflect new properties

### 2.3 New Component Creation Criteria

Create a new component when:
- No existing component serves a similar purpose
- The functionality is sufficiently unique
- Modification would fundamentally change an existing component
- The component will be reused across multiple contexts

**Creation Guidelines by Type**:

**Atoms** - Create when you have:
- A single HTML element with specific styling
- A fundamental UI element not yet in the system
- An icon, basic input, or primitive visual element

**Molecules** - Create when you have:
- A combination of 2-5 atoms working together
- A simple functional group (e.g., labeled input field)
- A repeatable pattern that appears in multiple organisms

**Organisms** - Create when you have:
- A complex component combining multiple molecules/atoms
- A distinct interface section (e.g., header, footer, card)
- A component with significant internal logic or state management

### 2.4 Component Implementation Process

1. **Create the component file** in the appropriate directory
2. **Apply BEMIT naming conventions** to all elements
3. **Reference metadata** for design tokens (colors, spacing, typography)
4. **Document the component** with usage examples and API
5. **Test accessibility** and responsiveness
6. **Update the component registry** or documentation

---

## 3. Services and Metadata

### 3.1 Architecture Overview

The design system uses a two-layer architecture for data management:

1. **Data Layer (`metadata/`)**: Stores all design system data as JSON files
2. **Service Layer (`getServices/`)**: Provides functions to retrieve and deliver data to components

**Data Flow**:
```
Components → getServices → metadata (JSON files)
                ↓
         (Future: External API)
```

This architecture ensures that when you migrate to external services/endpoints, only the `getServices/` functions need to be updated—components remain unchanged.

### 3.2 Metadata Management

Agents utilize the `services/metadata/` directory to store all design system data in JSON format.

**Key Metadata Files**:

- **`colors.json`**: Color palettes, theme colors, semantic color definitions
- **`typography.json`**: Font families, sizes, weights, line heights
- **`spacing.json`**: Spacing scale, margin/padding values
- **`breakpoints.json`**: Responsive design breakpoints
- **`components.json`**: Registry of all components with their properties and metadata
- **`general.json`**: General configuration and system-wide settings

### 3.3 Creating Metadata Files

**When to Create**:
- Introducing a new design token category
- Defining a new theme or color scheme
- Establishing new spacing or typography scales
- Documenting component specifications
- Adding general system configuration

**Process**:
1. **Identify the metadata type** (colors, spacing, components, etc.)
2. **Create a structured JSON file** in `services/metadata/`
3. **Use consistent naming** (kebab-case, descriptive)
4. **Follow established schema** for the metadata type
5. **Document the purpose** and structure of the data

**Example Structure** (`services/metadata/colors.json`):
```json
{
  "primary": {
    "50": "#e3f2fd",
    "100": "#bbdefb",
    "500": "#2196f3",
    "900": "#0d47a1"
  },
  "semantic": {
    "success": "#4caf50",
    "warning": "#ff9800",
    "error": "#f44336",
    "info": "#2196f3"
  }
}
```

**Example Structure** (`services/metadata/components.json`):
```json
{
  "atoms": {
    "button": {
      "variants": ["primary", "secondary", "ghost"],
      "sizes": ["small", "medium", "large"],
      "states": ["default", "hover", "active", "disabled"]
    }
  },
  "molecules": {
    "search-bar": {
      "components": ["input", "button"],
      "variants": ["default", "compact"]
    }
  }
}
```

### 3.4 Creating Service Functions (getServices)

For every metadata file, create a corresponding service function in `services/getServices/` to retrieve that data.

**Naming Convention**:
- Service file names should match the pattern: `get{MetadataName}.js`
- Function names should be clear and descriptive: `getColors()`, `getTypography()`, `getComponentData()`

**Process**:
1. **Create a new file** in `services/getServices/` (e.g., `getColors.js`)
2. **Import the metadata** from the corresponding JSON file
3. **Export functions** to retrieve all data or specific data subsets
4. **Add error handling** for robust data retrieval
5. **Document the service** with JSDoc comments

**Example Service** (`services/getServices/getColors.js`):
```javascript
/**
 * Color Service
 * Retrieves color data from metadata
 * Future: Can be updated to fetch from external API
 */

import colorsData from '../metadata/colors.json';

/**
 * Get all color definitions
 * @returns {Promise<Object>} All color data
 */
export async function getColors() {
  try {
    // Current: Return local data
    return colorsData;
    
    // Future implementation (commented out):
    // const response = await fetch('https://api.yourservice.com/v1/colors');
    // if (!response.ok) throw new Error('Failed to fetch colors');
    // return await response.json();
  } catch (error) {
    console.error('Error fetching colors:', error);
    return null;
  }
}

/**
 * Get a specific color palette
 * @param {string} paletteName - Name of the palette (e.g., 'primary', 'semantic')
 * @returns {Object|null} Color palette object
 */
export function getColorPalette(paletteName) {
  return colorsData[paletteName] || null;
}

/**
 * Get a specific color value
 * @param {string} paletteName - Name of the palette
 * @param {string} shade - Shade number or name (e.g., '500', 'success')
 * @returns {string|null} Hex color value
 */
export function getColor(paletteName, shade) {
  return colorsData[paletteName]?.[shade] || null;
}
```

**Example Service** (`services/getServices/getComponentData.js`):
```javascript
/**
 * Component Data Service
 * Retrieves component metadata and configuration
 */

import componentsData from '../metadata/components.json';

/**
 * Get all component data
 * @returns {Promise<Object>} All component metadata
 */
export async function getAllComponents() {
  try {
    return componentsData;
    // Future: await fetch('https://api.yourservice.com/v1/components');
  } catch (error) {
    console.error('Error fetching component data:', error);
    return null;
  }
}

/**
 * Get data for a specific component type
 * @param {string} type - Component type ('atoms', 'molecules', 'organisms')
 * @param {string} componentName - Name of the component
 * @returns {Object|null} Component configuration
 */
export function getComponentConfig(type, componentName) {
  return componentsData[type]?.[componentName] || null;
}

/**
 * Get all available variants for a component
 * @param {string} type - Component type
 * @param {string} componentName - Name of the component
 * @returns {Array} Array of variant names
 */
export function getComponentVariants(type, componentName) {
  return componentsData[type]?.[componentName]?.variants || [];
}
```

### 3.5 Updating Metadata Files

**When to Update**:
- Design system evolves or receives new requirements
- Adding new variants or options to existing categories
- Refining or deprecating existing tokens
- Correcting inconsistencies

**Process**:
1. **Locate the appropriate JSON file** in `services/metadata/`
2. **Make the necessary changes** to the data structure
3. **Validate JSON syntax** to ensure it's properly formatted
4. **Update the corresponding service** in `getServices/` if needed (e.g., new helper functions)
5. **Test components** that use the updated data
6. **Document the changes** in a changelog

**Important**: When updating metadata, the service functions in `getServices/` typically don't need changes unless you're adding new data access patterns.

### 3.6 Using Services in Components

Components should **always** retrieve data through `getServices/` functions, **never** by directly importing from `metadata/`.

**Correct Approach**:
```javascript
// In a component file
import { getColors, getColor } from '../../services/getServices/getColors.js';
import { getComponentConfig } from '../../services/getServices/getComponentData.js';

async function initButton() {
  const colors = await getColors();
  const primaryColor = getColor('primary', '500');
  const buttonConfig = getComponentConfig('atoms', 'button');
  
  // Use the data to render component
}
```

**Incorrect Approach** (Don't do this):
```javascript
// ❌ Wrong: Direct import from metadata
import colorsData from '../../services/metadata/colors.json';
```

**Why This Matters**:
- When you switch to external endpoints, you only update the `getServices/` functions
- Components continue working without any code changes
- Centralized error handling and data transformation
- Consistent data access patterns across the system

### 3.7 Migration to External Services

When you're ready to migrate to external API endpoints:

**Step 1**: Update the service functions in `getServices/`
```javascript
// Before (local JSON)
export async function getColors() {
  return colorsData;
}

// After (external API)
export async function getColors() {
  const response = await fetch('https://api.yourservice.com/v1/colors');
  if (!response.ok) throw new Error('Failed to fetch colors');
  return await response.json();
}
```

**Step 2**: Test the services to ensure they return data in the expected format

**Step 3**: No changes needed in components—they continue using the same service functions

**Benefits**:
- Zero component refactoring required
- Gradual migration (service by service)
- Easy to rollback if issues arise
- Can maintain both local and remote data sources during transition

---

## 4. BEMIT Naming Convention

### 4.1 Overview

**BEMIT** combines BEM (Block, Element, Modifier) methodology with ITCSS (Inverted Triangle CSS) principles to create a structured, scalable naming convention.

**Importance**:
- **Clarity**: Class names clearly communicate purpose and hierarchy
- **Maintainability**: Easy to understand and modify component structure
- **Scalability**: Consistent naming supports system growth
- **Specificity Management**: Predictable CSS specificity
- **Team Collaboration**: Shared naming language across designers and developers

### 4.2 BEMIT Structure for Components

The design system uses prefixes to indicate component type based on Atomic Design levels:

#### Atoms: `a-{component-name}`

**Structure**:
```
a-{component-name}
a-{component-name}__element
a-{component-name}--modifier
a-{component-name}__element--modifier
```

**Examples**:
```html
<!-- Button Atom -->
<button class="a-button a-button--primary">
  <span class="a-button__icon">→</span>
  <span class="a-button__text">Submit</span>
</button>

<!-- Input Atom -->
<input class="a-input a-input--large" type="text">

<!-- Label Atom -->
<label class="a-label a-label--required">Email</label>
```

#### Molecules: `m-{component-name}`

**Structure**:
```
m-{component-name}
m-{component-name}__element
m-{component-name}--modifier
m-{component-name}__element--modifier
```

**Examples**:
```html
<!-- Search Bar Molecule -->
<div class="m-search-bar">
  <input class="a-input m-search-bar__input" type="search">
  <button class="a-button m-search-bar__button">Search</button>
</div>

<!-- Form Field Molecule -->
<div class="m-form-field m-form-field--error">
  <label class="a-label m-form-field__label">Username</label>
  <input class="a-input m-form-field__input" type="text">
  <span class="m-form-field__error">This field is required</span>
</div>
```

#### Organisms: `o-{component-name}`

**Structure**:
```
o-{component-name}
o-{component-name}__element
o-{component-name}--modifier
o-{component-name}__element--modifier
```

**Examples**:
```html
<!-- Navigation Organism -->
<nav class="o-navigation o-navigation--sticky">
  <div class="o-navigation__logo">
    <img class="a-image" src="logo.svg" alt="Logo">
  </div>
  <ul class="o-navigation__menu">
    <li class="o-navigation__item">
      <a class="a-link o-navigation__link o-navigation__link--active">Home</a>
    </li>
  </ul>
</nav>

<!-- Card Organism -->
<article class="o-card o-card--featured">
  <header class="o-card__header">
    <h2 class="a-heading o-card__title">Article Title</h2>
  </header>
  <div class="o-card__body">
    <p class="a-paragraph o-card__text">Content here...</p>
  </div>
  <footer class="o-card__footer">
    <button class="a-button o-card__action">Read More</button>
  </footer>
</article>
```

### 4.3 Naming Rules

**CRITICAL REQUIREMENT**: Every HTML tag must have at least one class assigned to it.

**Naming Conventions**:
- Use **lowercase** letters only
- Separate words with **hyphens** (kebab-case)
- Use **double underscores** (`__`) for elements
- Use **double hyphens** (`--`) for modifiers
- Be **descriptive but concise**
- Avoid abbreviations unless universally understood

**Additional Guidelines**:

1. **Block (Component) Names**: 
   - Should describe what the component is, not what it looks like
   - Good: `a-button`, `m-search-bar`, `o-header`
   - Bad: `a-blue-thing`, `m-box-with-inputs`

2. **Element Names**:
   - Describe the element's role within the component
   - Good: `o-card__title`, `m-form-field__label`
   - Bad: `o-card__top-text`, `m-form-field__thing`

3. **Modifier Names**:
   - Describe a variation or state
   - Good: `a-button--primary`, `o-card--featured`, `a-input--disabled`
   - Bad: `a-button--blue`, `o-card--big`

4. **Combining Classes**:
   - Atom classes can be used within molecules and organisms
   - Always include both the atom class and the context class
   ```html
   <button class="a-button o-card__action">Click</button>
   ```

### 4.4 State Classes

For interactive states, use the `is-` prefix:

```html
<button class="a-button is-loading">Loading...</button>
<div class="m-accordion is-expanded">...</div>
<nav class="o-navigation is-hidden">...</nav>
```

### 4.5 Utility Classes

For single-purpose utilities, use the `u-` prefix:

```html
<div class="o-card u-margin-top-lg">...</div>
<span class="a-text u-text-center u-color-primary">...</span>
```

---

## 5. Agent Responsibilities

### 5.1 Core Responsibilities

AI agents supporting the design system have the following key responsibilities:

#### 1. **Review and Understand the System**
- Study the folder structure and organization
- Familiarize with existing components in all directories
- Understand the metadata files and design tokens
- Know the BEMIT naming conventions thoroughly

#### 2. **Analyze Design Requirements**
- Parse design requests to identify needed components
- Determine component complexity (atom, molecule, or organism)
- Identify required functionality, states, and variants
- Extract design specifications (colors, spacing, typography)

#### 3. **Component Assessment**
- Search for existing components that match requirements
- Evaluate if existing components can be reused as-is
- Determine if modifications or variants are needed
- Decide when new components must be created

#### 4. **Component Creation and Modification**
- Create new components in the appropriate directory
- Apply proper BEMIT naming conventions to all elements
- Ensure every HTML tag has a class assigned
- **CRITICAL**: Build organisms implementing molecules when create organisms, and molecules implementing atoms when create molecules. NEVER use raw HTML tags (like h1, button, input) inside organisms or molecules for elements that should be atoms. Every functional element must be an atom.
- Implement responsive design and accessibility standards

#### 5. **Metadata and Service Management**
- Create JSON files in `services/metadata/` for design data
- Create corresponding service functions in `services/getServices/`
- Ensure services provide clean, documented APIs for data retrieval
- Structure services to support future migration to external endpoints
- Never allow components to directly import from `metadata/`
- Update metadata files to reflect system evolution
- Maintain consistency between metadata structure and service functions

#### 6. **Code Quality and Consistency**
- Write clean, semantic HTML
- Follow CSS best practices and architecture
- Ensure accessibility compliance (ARIA labels, keyboard navigation, contrast ratios)
- Maintain consistent code style across all components

#### 7. **Documentation**
- Document all components with usage examples
- Explain component props, variants, and states
- Provide code snippets for implementation
- Update the component registry when adding or modifying components

#### 8. **Testing and Validation**
- Verify components work across browsers and devices
- Test responsive behavior at all breakpoints
- Validate accessibility with automated and manual testing
- Ensure components integrate properly with the system

### 5.2 Workflow Summary

When receiving a design request, agents should follow this workflow:

```
1. ANALYZE
   ↓
   - Understand the design requirement
   - Identify component type (atom/molecule/organism)
   
2. SEARCH
   ↓
   - Check existing components
   - Review metadata files
   
3. DECIDE
   ↓
   - Reuse existing component
   - Modify existing component
   - Create new component
   
4. IMPLEMENT
   ↓
   - Apply BEMIT naming
   - Use metadata/design tokens
   - Ensure accessibility
   
5. DOCUMENT
   ↓
   - Update component registry
   - Provide usage examples
   
6. VALIDATE
   ↓
   - Test functionality
   - Verify consistency
   - Check accessibility
```

### 5.3 Quality Checklist

Before completing any design task, agents must verify:

- [ ] Component is in the correct directory (atoms/molecules/organisms)
- [ ] Atomic composition: Organisms use molecules/atoms; Molecules use atoms. (No raw tags for components)
- [ ] All HTML tags have classes assigned
- [ ] BEMIT naming convention is correctly applied
- [ ] Component retrieves data through `getServices/` (never directly from `metadata/`)
- [ ] Metadata files are properly structured JSON
- [ ] Service functions exist for all metadata files
- [ ] Service functions include error handling
- [ ] Component is responsive and accessible
- [ ] Code is clean, semantic, and well-organized
- [ ] Component is documented with usage examples
- [ ] Component registry metadata is updated
- [ ] Component integrates properly with existing system

### 5.4 Continuous Improvement

Agents should continuously:
- Identify opportunities to refactor and improve existing components
- Suggest new metadata categories or design tokens
- Propose system enhancements and optimizations
- Maintain awareness of design system trends and best practices
- Ensure the system remains scalable and maintainable

---

## 6. Service Layer Principles

### 6.1 The Service Pattern

The design system enforces a strict separation between data and data access:

**❌ NEVER DO THIS**:
```javascript
// Direct import from metadata
import colors from '../services/metadata/colors.json';
```

**✅ ALWAYS DO THIS**:
```javascript
// Import from getServices
import { getColors } from '../services/getServices/getColors.js';
```

### 6.2 Why This Matters

**Current Benefits**:
- Centralized data access logic
- Consistent error handling
- Easy to add data transformation or validation
- Single place to debug data issues

**Future Benefits** (when migrating to external API):
- Update only service files, not components
- Maintain backward compatibility
- Easy A/B testing between local and remote data
- Gradual migration path
- Zero refactoring of component code

### 6.3 Service Layer Rules

**Rule 1: One Service per Metadata File**
- Each JSON file in `metadata/` should have a corresponding service in `getServices/`
- Service name: `get{MetadataFileName}.js`

**Rule 2: Services Must Be Async-Ready**
- Even if reading local JSON, export async functions
- This future-proofs for API migration
- Example: `export async function getColors() { return colorsData; }`

**Rule 3: Provide Helper Functions**
- Don't just export raw data
- Include specific getters: `getColor(palette, shade)`, `getComponentVariants(type, name)`
- Make data access convenient for components

**Rule 4: Include Error Handling**
- Always use try-catch in service functions
- Return null or default values on error
- Log errors for debugging

**Rule 5: Document Service APIs**
- Use JSDoc comments for all exported functions
- Specify parameter types and return types
- Include usage examples

### 6.4 Example Service Template

```javascript
/**
 * {DataType} Service
 * Retrieves {data description} from metadata
 * Future: Will fetch from external API endpoint
 */

import {dataName}Data from '../metadata/{filename}.json';

/**
 * Get all {data type} data
 * @returns {Promise<Object>} All {data type} data
 */
export async function get{DataType}() {
  try {
    // Current: Return local data
    return {dataName}Data;
    
    // Future: Uncomment when migrating to API
    // const response = await fetch('https://api.example.com/{endpoint}');
    // if (!response.ok) throw new Error('Failed to fetch {data type}');
    // return await response.json();
  } catch (error) {
    console.error('Error fetching {data type}:', error);
    return null;
  }
}

/**
 * Get specific item from {data type}
 * @param {string} key - The item key
 * @returns {any} The requested data or null
 */
export function get{DataType}Item(key) {
  return {dataName}Data[key] || null;
}
```

### 6.5 Component Integration Pattern

**Standard Component Pattern**:
```javascript
// Import services at the top
import { getColors } from '../../services/getServices/getColors.js';
import { getComponentConfig } from '../../services/getServices/getComponentData.js';

// Use in component initialization
async function initComponent() {
  // Fetch data through services
  const colors = await getColors();
  const config = await getComponentConfig('atoms', 'button');
  
  // Use data to configure component
  applyColors(colors);
  applyConfig(config);
}

// Call initialization
initComponent();
```

**React Component Example**:
```javascript
import { useEffect, useState } from 'react';
import { getColors } from '../../services/getServices/getColors.js';

function Button() {
  const [colors, setColors] = useState(null);
  
  useEffect(() => {
    async function loadColors() {
      const data = await getColors();
      setColors(data);
    }
    loadColors();
  }, []);
  
  if (!colors) return <div>Loading...</div>;
  
  return (
    <button style={{ backgroundColor: colors.primary['500'] }}>
      Click Me
    </button>
  );
}
```

---

## 7. Best Practices

### 7.1 Component Development
- **Start small**: Build atoms first, then combine into molecules and organisms
- **Single responsibility**: Each component should do one thing well
- **Composition over inheritance**: Favor combining simple components over complex hierarchies
- **Flexibility**: Design components to be reusable in multiple contexts

### 7.2 Naming
- **Be consistent**: Always follow BEMIT conventions without exception
- **Be descriptive**: Names should clearly communicate purpose
- **Think semantically**: Focus on function, not appearance
- **Avoid coupling**: Don't tie names to specific implementations

### 7.3 Maintenance
- **Document everything**: Code should be self-documenting, but add comments for complex logic
- **Version control**: Track changes and maintain changelog
- **Deprecation strategy**: Plan for removing outdated components gracefully
- **Regular audits**: Review the system periodically for inconsistencies

### 7.4 Service Layer
- **Always use getServices**: Never import directly from metadata folder
- **Keep services thin**: Services should retrieve and return data, not contain business logic
- **Comment future API endpoints**: Include commented-out API calls in services as migration guide
- **Maintain sync**: When adding metadata, immediately create the corresponding service
- **Test both paths**: When migrating to API, test both local and remote data sources

### 7.5 Page Routing and Component Refactoring (Astro)
- **Folder-based Routing**: Every page should be created as a directory containing an `index.astro` and a dedicated `.css` file (e.g., `src/pages/sobre-mi/index.astro` and `src/pages/sobre-mi/sobre-mi.css`), except for the root `index.astro` which remains in place.
- **Component Extraction**: Inline HTML sections in pages that follow BEMIT classes (`o-`, `m-`, `a-`) must be systematically extracted into their corresponding components within `src/components/organisms/`, `src/components/molecules/`, etc.
- **Style and Logic Encapsulation**: Extracted components must have their own `.css` file for styles and `<script>` tags for their specific interactions (e.g., GSAP animations), keeping the page file clean and the components highly cohesive and reusable.

### 7.6 Service-First Metadata Content Rule (Meta Reto)
- **Zero Hardcoded Data in Components/Pages**: Every single text block, header, bio paragraph, brand list, audio track list, image URL, or CTA link on any page MUST be retrieved dynamically from a service in `src/services/getServices/`.
- **Metadata Structure**: For every new page or component containing content, create a metadata file inside `src/services/metadata/` in JSON or TS format, and a corresponding service function in `src/services/getServices/` to return this metadata.
- **Orchestration at Page Level**: Astro pages (`src/pages/**/*.astro`) must act as orchestrators. They fetch the data in their frontmatter using the services and pass it down as props to the presentational components.
- **Strict Separation of Concerns**: Components must be completely pure and presentational. They must accept their content via a `data` prop instead of containing hardcoded text or assets, allowing seamless migration to external API headless CMS endpoints in the future.

---

## 8. Conclusion

This design system provides a structured, scalable approach to building consistent user interfaces with a clear path for future growth. By following the Atomic Design methodology, utilizing BEMIT naming conventions, and maintaining a clean service layer architecture, AI agents can effectively support design requests while maintaining system integrity and quality.

**Key Takeaways**:

1. **Atomic Design**: Build small (atoms), compose to medium (molecules), assemble to complex (organisms)
2. **BEMIT Naming**: Consistent, predictable class names for all HTML elements
3. **Service Layer**: Always retrieve data through `getServices/`, never directly from `metadata/`
4. **Future-Ready**: The architecture supports seamless migration to external API endpoints

Remember: The goal is not just to build components, but to create a cohesive, maintainable design system that empowers teams to build better products faster—today with local data, tomorrow with external services, without breaking existing components.

---

**Document Version**: 1.0  
**Last Updated**: 2026-04-08  
**Maintained By**: AI Design System Agents
