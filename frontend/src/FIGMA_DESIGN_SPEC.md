# Cryonix - Complete Design Specification for Figma

## Table of Contents
1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Layout & Grid](#layout--grid)
5. [Effects & Styles](#effects--styles)
6. [Components Library](#components-library)
7. [Page Layouts](#page-layouts)
8. [Iconography](#iconography)
9. [Responsive Breakpoints](#responsive-breakpoints)

---

## Brand Identity

### Brand Name
**Cryonix**

### Tagline
"The Netflix of Algo-Trading"

### Mission Statement
Empowering retail investors with AI-driven trading tools previously only available to hedge funds.

### Key Metrics
- **Win Rate**: 57%
- **Total Returns**: +104%

### Logo
- **Type**: Circular golden gradient logo with "CRYONIX" text
- **Colors**: Golden gradient (#FFD700 to #FFA500)
- **Usage**: Appears in navigation bar (left side)

---

## Color System

### Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Neon Blue** | `#00FFFF` | Primary brand color, CTA buttons, headings, links, glows |
| **Emerald Green** | `#00FF99` | Secondary color, success states, positive metrics |
| **Matte Black** | `#0a0a0f` | Main background |
| **Dark Gray** | `#14141f` | Card backgrounds, secondary backgrounds |

### Neutral Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Card Background** | `#1a1a2e` | Component backgrounds |
| **Border** | `rgba(0, 255, 255, 0.3)` | Card borders, dividers |
| **Muted Text** | `#a0a0b0` | Secondary text, labels |
| **White** | `#ffffff` | Primary text content |

### Semantic Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Success** | `#00FF99` | Success messages, positive values |
| **Warning** | `#FFB800` | Warning states, alerts |
| **Error/Destructive** | `#FF4444` | Error messages, negative values, stop-loss |
| **Info** | `#00FFFF` | Information, highlights |

### Gradient Definitions

#### Logo Gradient
```
Type: Linear
Angle: 135°
Stops:
  - 0%: #FFD700
  - 100%: #FFA500
```

#### Primary Glow Gradient
```
Type: Radial
Stops:
  - 5%: rgba(0, 255, 255, 0.4)
  - 95%: rgba(0, 255, 255, 0.1)
```

#### Card Gradient (Glassmorphism)
```
Type: Linear
Angle: 135°
Stops:
  - 0%: rgba(26, 26, 46, 0.6)
  - 100%: rgba(26, 26, 46, 0.4)
```

---

## Typography

### Font Families
- **Primary**: Inter (preferred) or Poppins
- **Fallback**: system-ui, -apple-system, sans-serif

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Color |
|---------|------|--------|-------------|----------------|-------|
| **H1 - Hero** | 56px | 700 | 1.2 | -0.02em | #ffffff |
| **H1 - Page Title** | 36px | 700 | 1.2 | -0.01em | #00FFFF |
| **H2 - Section** | 30px | 600 | 1.3 | -0.01em | #ffffff |
| **H3 - Card Title** | 24px | 600 | 1.4 | 0 | #00FFFF |
| **H4 - Subsection** | 20px | 600 | 1.4 | 0 | #ffffff |
| **Body Large** | 18px | 400 | 1.6 | 0 | #ffffff |
| **Body** | 16px | 400 | 1.6 | 0 | #ffffff |
| **Body Small** | 14px | 400 | 1.5 | 0 | #a0a0b0 |
| **Caption** | 12px | 400 | 1.4 | 0.01em | #a0a0b0 |
| **Button Text** | 16px | 500 | 1.5 | 0.01em | inherit |
| **Stats/Metrics** | 36px | 700 | 1.2 | -0.01em | varies |

### Text Styles

#### Glow Text Effect
- Used on: Primary headings, hero titles
- Text Shadow: 
  - `0 0 20px rgba(0, 255, 255, 0.5)`
  - `0 0 40px rgba(0, 255, 255, 0.3)`

#### Muted Text
- Color: `#a0a0b0`
- Used for: Labels, descriptions, timestamps

---

## Layout & Grid

### Container Widths
- **Max Width**: 1280px (max-w-7xl)
- **Content Padding**: 24px horizontal (px-6)

### Spacing Scale
```
4px   = 0.25rem (space-1)
8px   = 0.5rem  (space-2)
12px  = 0.75rem (space-3)
16px  = 1rem    (space-4)
24px  = 1.5rem  (space-6)
32px  = 2rem    (space-8)
48px  = 3rem    (space-12)
64px  = 4rem    (space-16)
96px  = 6rem    (space-24)
```

### Grid Systems

#### Desktop Grid (>1024px)
- Columns: 12
- Gutter: 24px
- Margin: Auto (centered)

#### Tablet Grid (768px - 1024px)
- Columns: 8
- Gutter: 20px
- Margin: 24px

#### Mobile Grid (<768px)
- Columns: 4
- Gutter: 16px
- Margin: 16px

### Section Spacing
- **Top Padding**: 96px (pt-24)
- **Bottom Padding**: 48px (pb-12)
- **Between Sections**: 64px (space-y-16)

---

## Effects & Styles

### Glassmorphism Effect
```
Background: rgba(26, 26, 46, 0.6)
Backdrop Filter: blur(12px)
Border: 1px solid rgba(0, 255, 255, 0.3)
Border Radius: 8px
Box Shadow: 0 8px 32px rgba(0, 0, 0, 0.37)
```

### Glow Effects

#### Primary Glow (Cyan)
```
Box Shadow: 
  - 0 0 20px rgba(0, 255, 255, 0.3)
  - 0 0 40px rgba(0, 255, 255, 0.2)
```

#### Secondary Glow (Green)
```
Box Shadow:
  - 0 0 20px rgba(0, 255, 153, 0.3)
  - 0 0 40px rgba(0, 255, 153, 0.2)
```

#### Gold Glow (Logo)
```
Box Shadow:
  - 0 0 20px rgba(255, 215, 0, 0.4)
  - 0 0 40px rgba(255, 215, 0, 0.2)
```

### Background Patterns

#### Grid Background
```css
background-image: 
  linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
background-size: 40px 40px;
opacity: 0.1;
```

#### Gradient Overlay
```css
background: linear-gradient(
  180deg,
  rgba(0, 255, 255, 0.05) 0%,
  transparent 100%
);
```

### Border Radius
- **Small**: 4px (rounded)
- **Medium**: 8px (rounded-lg) - Default for cards
- **Large**: 16px (rounded-xl)
- **Full**: 9999px (rounded-full) - For badges, avatars

### Shadows

#### Card Shadow
```
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
```

#### Elevated Shadow
```
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2)
```

#### Focus Shadow
```
box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.3)
```

---

## Components Library

### 1. Navigation Bar

**Dimensions**: Full width × 72px height

**Layout**:
- Left: Logo + "CRYONIX" text
- Center: Navigation links (Desktop only)
- Right: CTA button or user menu

**Desktop Navigation Links** (spacing: 32px):
- Features
- Pricing
- Support

**Styling**:
- Background: `rgba(10, 10, 15, 0.95)`
- Backdrop Blur: 12px
- Border Bottom: 1px solid `rgba(0, 255, 255, 0.1)`
- Position: Fixed top
- Z-index: 50

**Mobile**: Hamburger menu icon (right side)

---

### 2. Buttons

#### Primary Button
```
Background: #00FFFF (Neon Blue)
Text Color: #0a0a0f (Dark)
Padding: 12px 32px
Border Radius: 8px
Font Weight: 500
Font Size: 16px
Glow: Primary Cyan Glow
Hover: Brightness 110%, Glow increased
```

#### Secondary Button
```
Background: #00FF99 (Emerald Green)
Text Color: #0a0a0f (Dark)
Padding: 12px 32px
Border Radius: 8px
Font Weight: 500
Font Size: 16px
Glow: Secondary Green Glow
Hover: Brightness 110%, Glow increased
```

#### Outline Button
```
Background: Transparent
Border: 1px solid #00FFFF
Text Color: #00FFFF
Padding: 12px 32px
Border Radius: 8px
Font Weight: 500
Font Size: 16px
Hover: Background rgba(0, 255, 255, 0.1)
```

#### Ghost Button
```
Background: Transparent
Text Color: #a0a0b0
Padding: 12px 24px
Hover: Background rgba(255, 255, 255, 0.05)
```

**Button Sizes**:
- Small: 8px 16px, 14px font
- Medium: 12px 32px, 16px font (default)
- Large: 16px 40px, 18px font

---

### 3. Cards

#### Standard Card (Glassmorphism)
```
Background: rgba(26, 26, 46, 0.6)
Backdrop Filter: blur(12px)
Border: 1px solid rgba(0, 255, 255, 0.3)
Border Radius: 8px
Padding: 24px
Box Shadow: 0 8px 32px rgba(0, 0, 0, 0.37)
```

#### Card Header
```
Padding Bottom: 16px
Border Bottom: 1px solid rgba(0, 255, 255, 0.1)
Margin Bottom: 16px
```

#### Card Title
```
Font Size: 24px
Font Weight: 600
Color: #00FFFF
```

#### Card Description
```
Font Size: 14px
Color: #a0a0b0
Margin Top: 4px
```

---

### 4. Form Inputs

#### Text Input
```
Background: rgba(26, 26, 46, 0.8)
Border: 1px solid rgba(0, 255, 255, 0.3)
Border Radius: 8px
Padding: 12px 16px
Font Size: 16px
Color: #ffffff
Height: 48px

Placeholder Color: #a0a0b0

Focus State:
  Border: 1px solid #00FFFF
  Box Shadow: 0 0 0 3px rgba(0, 255, 255, 0.2)
  Outline: none

Error State:
  Border: 1px solid #FF4444
  Box Shadow: 0 0 0 3px rgba(255, 68, 68, 0.2)
```

#### Label
```
Font Size: 14px
Font Weight: 500
Color: #ffffff
Margin Bottom: 8px
Display: block
```

#### Input with Icon
- Icon Position: Right side, 16px from edge
- Icon Size: 20px × 20px
- Icon Color: #a0a0b0

---

### 5. Badges

#### Status Badge
```
Padding: 4px 12px
Border Radius: 9999px (full)
Font Size: 12px
Font Weight: 500
Border: 1px solid (varies)
Background: transparent or 20% opacity of border color
```

**Badge Variants**:

- **Success**: Border `#00FF99`, Background `rgba(0, 255, 153, 0.2)`, Text `#00FF99`
- **Warning**: Border `#FFB800`, Background `rgba(255, 184, 0, 0.2)`, Text `#FFB800`
- **Error**: Border `#FF4444`, Background `rgba(255, 68, 68, 0.2)`, Text `#FF4444`
- **Info**: Border `#00FFFF`, Background `rgba(0, 255, 255, 0.2)`, Text `#00FFFF`
- **Default**: Border `#a0a0b0`, Background `rgba(160, 160, 176, 0.2)`, Text `#a0a0b0`

---

### 6. Stat Cards

```
Layout: Grid layout (5 columns on desktop)
Card Style: Glassmorphism
Min Height: 120px

Content Structure:
  - Label (top): 14px, #a0a0b0
  - Value (large): 36px, 700 weight, colored by type
  - Change (optional): 14px, colored (green/red)
```

**Stat Value Colors**:
- Positive metrics: `#00FF99`
- Neutral metrics: `#00FFFF`
- Negative metrics: `#FF4444`
- General metrics: `#a0a0b0`

---

### 7. Feature Cards (Homepage)

```
Size: Equal width in 3-column grid
Background: Glassmorphism
Padding: 32px
Border Radius: 8px
Hover: Transform translateY(-4px), Glow increased

Layout:
  - Icon (top): 48px × 48px, #00FFFF
  - Title: 20px, 600 weight, #ffffff
  - Description: 14px, #a0a0b0, line-height 1.6
  - Spacing: 16px between elements
```

---

### 8. Avatar

#### User Avatar (Dashboard)
```
Size: 48px × 48px
Border Radius: 50% (circle)
Border: 2px solid #00FFFF
Background: Glassmorphism or Image

Fallback:
  Background: rgba(0, 255, 255, 0.2)
  Text: Initials, 18px, 600 weight, #00FFFF
```

---

### 9. Progress Bars

```
Height: 8px
Background: rgba(160, 160, 176, 0.2)
Border Radius: 9999px (full)

Fill:
  Background: linear-gradient(90deg, #00FFFF, #00FF99)
  Border Radius: 9999px
  Transition: width 0.3s ease
```

---

### 10. Tabs

#### Tab List
```
Background: rgba(26, 26, 46, 0.5)
Border Radius: 8px
Padding: 4px
Display: Grid or Flex
```

#### Tab Trigger (Inactive)
```
Background: Transparent
Color: #a0a0b0
Padding: 12px 24px
Border Radius: 6px
Font Weight: 500
```

#### Tab Trigger (Active)
```
Background: rgba(0, 255, 255, 0.2)
Color: #00FFFF
Padding: 12px 24px
Border Radius: 6px
Font Weight: 600
Box Shadow: 0 0 10px rgba(0, 255, 255, 0.2)
```

---

### 11. Charts

**Chart Colors**:
- Primary Line: `#00FFFF` (Neon Blue)
- Secondary Line: `#00FF99` (Emerald Green)
- Grid Lines: `rgba(255, 255, 255, 0.1)`
- Axis Labels: `#a0a0b0`

**Chart Background**:
- Gradient Fill under line: Linear from `rgba(0, 255, 255, 0.4)` to `rgba(0, 255, 255, 0.1)`

**Tooltip**:
```
Background: #14141f
Border: 1px solid rgba(0, 255, 255, 0.3)
Border Radius: 8px
Padding: 8px 12px
Font Size: 14px
Color: #ffffff
Label Color: #00FFFF
```

---

### 12. Footer

**Layout**:
- 4 columns on desktop
- Stacked on mobile
- Full width, dark background

```
Background: #0a0a0f
Border Top: 1px solid rgba(0, 255, 255, 0.1)
Padding: 64px 24px 32px

Column Headers:
  Font Size: 16px
  Font Weight: 600
  Color: #00FFFF
  Margin Bottom: 16px

Links:
  Font Size: 14px
  Color: #a0a0b0
  Margin Bottom: 8px
  Hover: Color #00FFFF

Copyright:
  Text Align: Center
  Font Size: 14px
  Color: #a0a0b0
  Margin Top: 48px
  Border Top: 1px solid rgba(0, 255, 255, 0.1)
  Padding Top: 24px
```

---

## Page Layouts

### 1. Homepage

#### Hero Section
```
Height: 100vh (full viewport)
Display: Flex, centered
Background: Gradient overlay on grid pattern

Content (centered):
  - Logo: 120px × 120px, golden gradient, glow
  - Headline: 56px, 700 weight, white with glow
  - Subheadline: 24px, #00FFFF
  - Description: 18px, #a0a0b0, max-width 600px
  - CTA Button: Primary button, margin-top 32px
  - Trust Metrics: 3 stat items (horizontal), margin-top 48px
    - "57% Win Rate", "$2.4M+ Traded", "10K+ Users"
    - Font size 16px, #a0a0b0, Icon + text
```

#### Features Section
```
Padding: 96px 0
Max Width: 1280px

Header:
  - Title: H2 (30px), centered, "Why Choose Cryonix"
  - Description: 18px, centered, #a0a0b0, max-width 700px
  - Margin Bottom: 64px

Grid: 3 columns (desktop), 1 column (mobile)
Gap: 32px

6 Feature Cards:
  1. AI-Powered Trading - Brain icon
  2. Real-Time Analytics - Activity icon
  3. Risk Management - Shield icon
  4. 24/7 Automation - Zap icon
  5. Smart Diversification - TrendingUp icon
  6. Institutional Grade - Award icon
```

#### How It Works Section
```
Padding: 96px 0
Background: rgba(0, 255, 255, 0.02)

Header: Same style as Features

Steps: 4 step cards (horizontal timeline)
Each step:
  - Number badge: 48px circle, #00FFFF background
  - Title: 20px, 600 weight
  - Description: 14px, #a0a0b0
  - Icon: 32px, positioned top-right
  - Connector line between steps (except last)
```

#### CTA Section
```
Padding: 96px 0
Background: Glassmorphism card (full width)
Text Align: Center

Content:
  - Headline: 36px, 700 weight, #ffffff
  - Description: 18px, #a0a0b0
  - CTA Button: Primary, large size
```

---

### 2. Login Page

```
Layout: Centered card (max-width 450px)
Vertical centering: min-height 100vh, flex center

Card:
  - Width: 450px
  - Padding: 48px
  - Glassmorphism style
  - Logo: Centered, 80px × 80px
  - Title: "Welcome Back", 30px, centered, #00FFFF
  - Description: 14px, centered, #a0a0b0

Form:
  - Email input
  - Password input with show/hide icon
  - "Forgot Password?" link (right-aligned, 14px, #00FFFF)
  - Submit button (full width, primary)
  - Spacing: 24px between fields

Divider: 32px margin top/bottom
  - Text: "Don't have an account?"
  - Link: "Create Account", #00FFFF

Error Messages:
  - Font size: 14px
  - Color: #FF4444
  - Position: Below input
  - Margin top: 8px
```

---

### 3. Create Account Page

```
Same layout as Login Page

Card Width: 500px

Form Fields:
  - Full Name input
  - Email input
  - Password input with validation indicators
  - Confirm Password input
  - Terms checkbox with link

Password Requirements (shown below password field):
  - Font size: 12px
  - Color: #a0a0b0 (incomplete), #00FF99 (complete)
  - Check icon: shown when complete
  - Requirements:
    - At least 8 characters
    - One uppercase letter
    - One lowercase letter
    - One number
    - One special character

Submit Button: Full width, primary, "Create Account"

Footer Link: "Already have an account? Log in"
```

---

### 4. KYC Verification Page

```
Layout: Multi-step form (centered, max-width 600px)

Progress Indicator (top):
  - 3 steps: "Personal Info", "Verification", "Complete"
  - Active step: #00FFFF
  - Completed: #00FF99 with check icon
  - Inactive: #a0a0b0
  - Connector lines between steps

Step 1 - Personal Information:
  - Full Name
  - Date of Birth
  - Country (dropdown)
  - Address
  - City
  - Postal Code
  - Phone Number

Step 2 - Document Upload:
  - Document Type (dropdown): Passport, Driver's License, ID Card
  - Upload zones (2):
    - 200px height, dashed border
    - Icon: Upload cloud, 48px
    - Text: "Click to upload or drag and drop"
    - Accepted: "PNG, JPG up to 10MB"
  - Preview: Shows uploaded image with remove button

Step 3 - Confirmation:
  - Success icon: Check in circle, 64px, #00FF99
  - Message: "Verification Submitted"
  - Description: Review timeline
  - CTA: "Go to Dashboard"

Navigation:
  - Back button (outline)
  - Next/Submit button (primary)
  - Spacing: 32px from content
```

---

### 5. Dashboard Page

#### Header Section
```
Layout: Flex row, space-between
Margin bottom: 32px

Left:
  - Greeting: "Welcome back, Ayush" (24px, #ffffff)
  - Subtitle: Current date + time (14px, #a0a0b0)

Right:
  - User avatar + name + dropdown
  - Notification bell icon
```

#### Stats Overview
```
Grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
Gap: 24px
Margin bottom: 32px

Cards:
  1. Total Portfolio Value: $124,750
  2. Total Returns: +104%
  3. Active Positions: 12
  4. Win Rate: 57%
```

#### Main Content Grid
```
Layout: 2 columns (desktop), 1 column (mobile)
Gap: 24px

Left Column (66% width):
  - Real-Time Trading Performance Chart
    - Height: 400px
    - Area chart with gradient fill
    - X-axis: Trade Steps
    - Y-axis: Cumulative P&L
  
  - Quick Actions
    - Grid: 3 buttons
    - Icons + labels
    - Start Bot, View Portfolio, Settings

Right Column (33% width):
  - Bot Status Card
    - Status badge (Running/Stopped)
    - Toggle switch
    - Last updated timestamp
  
  - Recent Activity
    - List of last 5 activities
    - Time + action + status dot
```

---

### 6. Portfolio Page

#### Header
```
Flex row, space-between
Margin bottom: 32px

Left:
  - Title: "Portfolio Performance" (36px, #00FFFF, glow)
  - Subtitle: "Track your AI-powered trading results"

Right:
  - Pause/Start Bot button
  - Status badge (Running/Stopped with pulse animation)
```

#### Real-Time Chart
```
Card: Full width
Height: 300px
Chart Type: Area chart
Gradient fill: Cyan gradient
Data: 10,000+ trade steps
Caption: "Live cumulative profit tracking"
```

#### Key Statistics
```
Grid: 5 columns (desktop), 2-3 columns (tablet), 1 column (mobile)
Gap: 24px

Stats:
  1. Win Rate: 57% (green)
  2. Total Returns: +104% (green)
  3. Sharpe Ratio: 2.86 (cyan)
  4. Daily Volatility: 1.2% (gray)
  5. Max Drawdown: -5.8% (red)
```

#### Tabs Section
```
Tab List: 2 tabs (grid, equal width)
  - Open Trades
  - Bot Activity Log

Open Trades Tab:
  - Header: Title + Download Report button
  - Trade Cards (list):
    - Pair name (BTC/USDT)
    - Badge (Long/Short)
    - Entry price
    - Current price
    - P&L (absolute and %)
    - Background: rgba(160, 160, 176, 0.2)
    - Hover: rgba(160, 160, 176, 0.3)

Bot Activity Log Tab:
  - Activity items (list):
    - Status dot (green/red)
    - Action description
    - Timestamp
    - Background: rgba(160, 160, 176, 0.2)
```

---

### 7. Features Page

```
Hero:
  - Title: "Powerful Features" (48px, centered)
  - Subtitle: 18px, max-width 700px, centered

Feature Sections (alternating layout):
  - Even sections: Image left, content right
  - Odd sections: Content left, image right
  - Image: 50% width, placeholder from Unsplash
  - Content: 50% width
    - Icon: 56px
    - Title: 30px, #00FFFF
    - Description: 16px, #a0a0b0
    - Feature list: Bullets with check icons

Sections:
  1. AI-Powered Trading Algorithms
  2. Real-Time Analytics Dashboard
  3. Advanced Risk Management
  4. 24/7 Automated Trading
  5. Portfolio Diversification
  6. Institutional-Grade Security
```

---

### 8. Pricing Page

```
Hero:
  - Title: "Simple, Transparent Pricing" (48px)
  - Subtitle: "Choose the plan that fits your needs"
  - Toggle: Monthly/Annual (with "Save 20%" badge)

Pricing Cards Grid: 3 columns
Gap: 32px

Card Structure:
  - Badge: "Most Popular" (for Pro plan)
  - Plan Name: 24px, 600 weight
  - Price: 48px, 700 weight, #00FFFF
  - Billing: 14px, #a0a0b0
  - Description: 14px
  - Features list:
    - Check icon (green)
    - Feature text
    - Spacing: 12px between items
  - CTA Button: Full width

Plans:
  1. Starter: $29/mo
     - Features: Basic bot, 3 strategies, email support
  
  2. Pro: $79/mo (MOST POPULAR)
     - Features: Advanced bot, unlimited strategies, priority support, API access
  
  3. Enterprise: Custom
     - Features: Everything + dedicated manager, custom strategies, SLA

FAQ Section:
  - Accordion style
  - 5-6 common questions
  - Glassmorphism cards
```

---

### 9. Support Page

```
Hero:
  - Title: "How Can We Help?" (48px)
  - Search bar (centered, max-width 600px)
    - Icon: Search, left side
    - Placeholder: "Search for help..."

Quick Links Grid: 3 columns
  - Icon cards for:
    - Getting Started
    - FAQ
    - Contact Support
    - Documentation
    - Community Forum
    - Video Tutorials

FAQ Section:
  - Accordion component
  - Categories:
    - Account & Billing
    - Trading Bot
    - Security
    - Technical

Contact Form:
  - Max width: 600px, centered
  - Fields:
    - Name
    - Email
    - Subject (dropdown)
    - Message (textarea, 150px height)
  - Submit button: Primary, full width
```

---

### 10. Legal Pages (Terms, Privacy, Disclaimer, Cookie Policy)

```
Layout: Single column, max-width 800px, centered
Padding: 96px 24px

Header:
  - Title: 48px, #00FFFF, centered
  - Last Updated: 14px, #a0a0b0, centered
  - Margin bottom: 64px

Content:
  - Section titles: 24px, 600 weight, #ffffff
  - Subsection titles: 18px, 600 weight, #ffffff
  - Body text: 16px, #a0a0b0, line-height 1.8
  - Spacing: 32px between sections
  - Lists: 16px, #a0a0b0, 8px spacing
  - Links: #00FFFF, underline on hover

Sections include:
  - Introduction
  - Terms/Privacy details
  - User responsibilities
  - Disclaimers
  - Contact information
```

---

## Iconography

### Icon Library
**Source**: Lucide React (v0.263.1)

### Icon Sizes
- Small: 16px
- Medium: 20px (default for UI)
- Large: 24px
- XLarge: 32px
- Feature icons: 48px
- Hero icons: 64px

### Icon Colors
- Primary: `#00FFFF`
- Secondary: `#00FF99`
- Muted: `#a0a0b0`
- White: `#ffffff`
- Error: `#FF4444`

### Common Icons Used

| Icon Name | Usage |
|-----------|-------|
| Brain | AI features |
| Activity | Analytics, charts |
| Shield | Security, protection |
| Zap | Automation, speed |
| TrendingUp | Growth, performance |
| Award | Quality, institutional grade |
| Lock | Security, password |
| Eye / EyeOff | Show/hide password |
| Mail | Email |
| User | Profile, account |
| Bell | Notifications |
| Download | Export, download |
| Upload | File upload |
| Play / Pause | Bot control |
| Check | Confirmation, success |
| X / XCircle | Close, error |
| ChevronDown | Dropdowns |
| Menu | Mobile navigation |
| Search | Search functionality |
| Settings | Configuration |
| LogOut | Sign out |
| Calendar | Date selection |
| Info | Information |
| AlertCircle | Warnings |

---

## Responsive Breakpoints

### Breakpoint System
```
Mobile: 0 - 639px
Tablet: 640px - 1023px
Desktop: 1024px - 1279px
Large Desktop: 1280px+
```

### Responsive Behaviors

#### Navigation
- **Desktop**: Horizontal links in center
- **Tablet**: Horizontal links, condensed spacing
- **Mobile**: Hamburger menu, slide-in panel

#### Grids
- **Features**: 3 cols → 2 cols → 1 col
- **Stats**: 5 cols → 3 cols → 2 cols → 1 col
- **Pricing**: 3 cols → 1 col
- **Footer**: 4 cols → 2 cols → 1 col

#### Typography
- **H1 Hero**: 56px → 48px → 36px
- **H1 Page**: 36px → 30px → 24px
- **H2**: 30px → 24px → 20px
- **Body**: 16px → 16px → 14px

#### Spacing
- **Section padding**: 96px → 64px → 48px
- **Container padding**: 24px → 20px → 16px
- **Card gaps**: 32px → 24px → 16px

#### Charts
- **Height**: 400px → 300px → 250px
- **Hide axis labels on small screens**
- **Reduce data points for performance**

---

## Component States

### Interactive States

#### Buttons
- **Default**: Base colors with glow
- **Hover**: Brightness 110%, glow increased, transform scale(1.02)
- **Active**: Brightness 90%, scale(0.98)
- **Focus**: Focus ring (3px, rgba(0, 255, 255, 0.3))
- **Disabled**: Opacity 50%, cursor not-allowed

#### Links
- **Default**: #00FFFF or #a0a0b0
- **Hover**: Underline, brightness 110%
- **Active**: Brightness 90%
- **Visited**: Same as default

#### Inputs
- **Default**: Border rgba(0, 255, 255, 0.3)
- **Focus**: Border #00FFFF, glow shadow
- **Error**: Border #FF4444, error shadow
- **Success**: Border #00FF99, success shadow
- **Disabled**: Opacity 50%, cursor not-allowed

#### Cards
- **Default**: Base glassmorphism
- **Hover**: Transform translateY(-2px), glow increased (for interactive cards)
- **Active**: Transform translateY(0)

---

## Animation & Transitions

### Timing Functions
```
Default: cubic-bezier(0.4, 0, 0.2, 1)
Smooth: cubic-bezier(0.4, 0, 0.6, 1)
Bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Transition Durations
- **Fast**: 150ms (hover, click)
- **Normal**: 300ms (default)
- **Slow**: 500ms (page transitions)

### Common Animations

#### Pulse (Bot Status)
```
Animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
Keyframes:
  0%, 100%: opacity 1
  50%: opacity 0.5
```

#### Fade In
```
Animation: fadeIn 0.5s ease-in
Keyframes:
  from: opacity 0
  to: opacity 1
```

#### Slide Up
```
Animation: slideUp 0.5s ease-out
Keyframes:
  from: transform translateY(20px), opacity 0
  to: transform translateY(0), opacity 1
```

#### Glow Pulse (for primary elements)
```
Animation: glowPulse 3s ease-in-out infinite
Keyframes:
  0%, 100%: box-shadow (normal)
  50%: box-shadow (increased intensity)
```

---

## Export Guidelines for Figma

### Layer Organization
```
Pages:
  ├── 🎨 Design System
  │   ├── Colors
  │   ├── Typography
  │   ├── Effects
  │   └── Components
  ├── 📱 Mobile
  │   ├── Homepage
  │   ├── Login
  │   ├── Dashboard
  │   └── ...
  ├── 💻 Desktop
  │   ├── Homepage
  │   ├── Login
  │   ├── Dashboard
  │   └── ...
  └── 🧩 Component Library
      ├── Buttons
      ├── Cards
      ├── Forms
      └── ...
```

### Naming Conventions
- **Frames**: `[Page Name] / [Section Name]`
- **Components**: `[Category] / [Component Name]`
- **Variants**: Use Figma variants for button states, badge types, etc.
- **Auto Layout**: Use for all components
- **Constraints**: Set appropriately for responsive behavior

### Color Styles
Create color styles for:
- Primary (Neon Blue)
- Secondary (Emerald Green)
- Background (Matte Black, Dark Gray)
- Text (White, Muted)
- Semantic (Success, Warning, Error)
- Borders (with opacity)

### Text Styles
Create text styles for each type scale entry:
- H1 Hero
- H1 Page
- H2
- H3
- H4
- Body Large
- Body
- Body Small
- Caption
- Button

### Effect Styles
Create effect styles for:
- Glassmorphism
- Primary Glow
- Secondary Glow
- Card Shadow
- Focus Shadow

### Components to Create
1. Button (with variants: primary, secondary, outline, ghost)
2. Input (with states: default, focus, error)
3. Card
4. Badge (with variants: success, warning, error, info)
5. Nav Bar
6. Footer
7. Stat Card
8. Feature Card
9. Chart Component
10. User Avatar
11. Logo

---

## Additional Notes

### Accessibility
- Ensure all interactive elements have focus states
- Maintain 4.5:1 contrast ratio minimum for text
- Use semantic HTML structure
- Include ARIA labels where needed
- Keyboard navigation support

### Performance
- Optimize images (WebP format recommended)
- Lazy load images below fold
- Use CSS transforms for animations (GPU-accelerated)
- Minimize use of backdrop-filter on low-end devices

### Brand Voice
- **Tone**: Professional, confident, innovative
- **Language**: Clear, direct, technically accurate
- **Avoid**: Overly complex jargon, hype without substance
- **Emphasize**: AI-powered, institutional-grade, accessible to retail

---

## Quick Reference: Key Measurements

```
Logo Size: 120px × 120px (hero), 40px × 40px (nav)
Nav Height: 72px
Button Height: 48px (medium)
Input Height: 48px
Card Padding: 24px
Border Radius: 8px (default)
Max Container: 1280px
Section Padding: 96px vertical
Grid Gap: 24px
Icon Size: 20px (UI), 48px (features)
Avatar Size: 48px

Primary Color: #00FFFF
Secondary Color: #00FF99
Background: #0a0a0f
Card BG: rgba(26, 26, 46, 0.6)

Font: Inter or Poppins
H1: 56px / 36px
H2: 30px
H3: 24px
Body: 16px
Small: 14px
```

---

## Implementation Checklist

When recreating in Figma:

- [ ] Set up color palette with styles
- [ ] Create text styles for all type scales
- [ ] Create effect styles (glassmorphism, glows, shadows)
- [ ] Build component library with variants
- [ ] Create logo component
- [ ] Design navigation bar (desktop + mobile)
- [ ] Design footer
- [ ] Create all page layouts (desktop)
- [ ] Create all page layouts (mobile)
- [ ] Add responsive behaviors
- [ ] Create interactive prototypes
- [ ] Test all interactive states
- [ ] Export assets for development

---

**Document Version**: 1.0  
**Last Updated**: October 12, 2025  
**Created for**: Cryonix Web Application  
**Design System**: Figma Recreation Guide
