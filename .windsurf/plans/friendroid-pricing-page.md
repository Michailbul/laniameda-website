# Friendroid Pricing Page Integration

Add a pricing section to the friendroid proposal page using a pricing card component adapted to the red gradient theme.

## Project Analysis

The project has:
- shadcn structure with components at `/src/components/ui/`
- Tailwind CSS v4 already configured
- TypeScript enabled
- Card component already exists
- `class-variance-authority` already installed
- Red/orange gradient theme from HeroSection: `colors=[{rgba(50,0,0,1)}, {rgba(183,28,28,1)}, {rgba(244,67,54,1)}, {rgba(255,152,0,1)}, {rgba(255,235,59,1)}]`

## Implementation Steps

### 1. Install dependencies

Need to install:
- `react-icons` - for FaCheck, FaPhoneAlt icons
- `@radix-ui/react-slot` - for button component
- `@radix-ui/react-tooltip` - for tooltip component

### 2. Create shadcn components

Create missing UI components:
- `button.tsx` - standard shadcn button
- `tooltip.tsx` - standard shadcn tooltip

### 3. Create pricing-card-with-features.tsx

Adapt the component to the red gradient theme:
- Replace blue gradient CTA button with red gradient matching the theme
- Use `from-red-900 via-red-600 to-orange-500` gradient
- Keep the card structure with features tooltips

### 4. Create PricingSection component

Create a new section component in the friendroid proposal that:
- Uses the pricing card component
- Follows the snap-section pattern like HeroSection and NextPageSection
- Uses the ThemeProvider for light/dark mode support
- Has a snap-section id="pricing" for navigation

### 5. Update page.tsx

- Add "pricing" to the sections array
- Import and add `<PricingSection />` after NextPageSection

## Expected Result

A new pricing section will be added to the friendroid proposal page, accessible via the "Start Project" navbar link and scroll navigation.
