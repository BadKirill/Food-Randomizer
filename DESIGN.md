# Food Randomizer Design System (Starbucks-Inspired)

## 1. Design Direction

Food Randomizer should feel:
- warm
- cozy
- clean
- friendly

This system is inspired by the Starbucks visual language:
- warm neutral surfaces
- confident green brand accents
- soft rounded geometry
- clear hierarchy

Core product signature to keep:
- **big circular Random CTA** in the center of the Random screen.

## 2. Brand Tokens

### Color Tokens

```yaml
color:
  bg.app: "#F2F0EB"           # warm cream app background
  bg.surface: "#FFFFFF"       # cards, modals, sheets
  bg.surface-soft: "#EDEBE9"  # secondary blocks

  brand.green.strong: "#006241"  # primary brand green
  brand.green.accent: "#00754A"  # CTA green
  brand.green.dark: "#1E3932"    # deep green for strong sections
  brand.green.soft: "#D4E9E2"    # light mint accents

  text.primary: "rgba(0,0,0,0.87)"
  text.secondary: "rgba(0,0,0,0.58)"
  text.on-dark: "#FFFFFF"

  border.default: "#D3DDE9"
  border.strong: "#C3CFDF"

  state.success: "#2E7D32"
  state.error: "#C82014"
  state.warning: "#CBA258"
```

### Radius Tokens

```yaml
radius:
  sm: 10
  md: 12
  lg: 16
  xl: 20
  pill: 999
  circle: 999
```

### Spacing Tokens

```yaml
space:
  xs: 4
  sm: 8
  md: 12
  lg: 16
  xl: 24
  xxl: 32
```

### Shadow Tokens

```yaml
shadow:
  card:
    ios: "0 1 2 rgba(0,0,0,0.12)"
    android: 2
  floating:
    ios: "0 8 12 rgba(0,0,0,0.14)"
    android: 6
```

## 3. Typography

Use one clean sans stack for mobile consistency.

```yaml
font:
  family: "System / Inter / Helvetica Neue / Arial / sans-serif"
  h1:
    size: 32
    weight: "800"
    lineHeight: 38
  h2:
    size: 24
    weight: "700"
    lineHeight: 30
  h3:
    size: 20
    weight: "700"
    lineHeight: 26
  body:
    size: 16
    weight: "400"
    lineHeight: 24
  body-sm:
    size: 14
    weight: "400"
    lineHeight: 20
  label:
    size: 14
    weight: "700"
    lineHeight: 18
  button:
    size: 16
    weight: "700"
    lineHeight: 20
```

## 4. Components

### 4.1 Primary CTA (Random Circle)

- Shape: perfect circle
- Size: 240-280px based on viewport
- Fill: `brand.green.soft` or gradient from soft-to-accent green
- Border: `2px brand.green.accent`
- Text: bold, centered
- Press state: `scale(0.95)` + slight opacity drop
- Loading state: quick rotating food frames/emoji

### 4.2 Buttons

- Primary:
  - bg: `brand.green.accent`
  - text: white
  - radius: pill
- Secondary:
  - bg: white
  - border: `1px border.default`
  - text: `text.primary`
  - radius: md
- Destructive text action:
  - no border
  - text: `state.error`

### 4.3 Cards

- Background: `bg.surface`
- Radius: `lg`
- Border: `1px border.default`
- Shadow: `shadow.card`

### 4.4 Inputs

- Height: min 56
- Radius: `md`
- Border: `1px border.default`
- Clear button:
  - circular
  - subtle translucent neutral background
  - centered vertically

### 4.5 Top Navigation (Mode Switch)

- Position: top of content
- Two tabs: Random / Manage
- Active tab:
  - bg: light green/cream tint
  - border: green
  - icon + label darker

## 5. Screen Rules

### Random Screen

- Top: mode tabs
- Inside random card:
  - filter trigger at top-left
  - centered big Random circle
  - error text under CTA

### Manage Screen

- Header card:
  - title + logged-in user
  - logout as red text action in header
- Subtabs:
  - Add Form / Dishes List
- Edit mode:
  - show explicit `Cancel Edit`

## 6. Motion

- Duration: 120-220ms default
- Easing: standard ease-in-out
- Interactions:
  - button press scale
  - modal/sheet slide
  - random loading frame switch (fast, looping)

## 7. Accessibility

- Text contrast >= WCAG AA
- Tap targets >= 44x44
- Do not communicate state with color only
- Keep body text minimum 14px

## 8. Implementation Guidance

- Keep this design system token-first.
- Prefer changing values in a centralized theme object.
- Reuse components (Button, Card, Input, Tab) instead of ad-hoc styles.

---

This file is the project reference for visual consistency across mobile screens.
