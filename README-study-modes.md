# Study Modes System

The Study Modes system provides personalized learning environments through different study modes that adapt the app's theming, coaching style, and micro-interactions without using "avatar" terminology in the UI.

## Overview

Three study modes are available:
- **⚡ Focus Mode**: Peak performance training with high-energy environment
- **🎓 Mentor Mode**: Deep understanding focus with academic environment  
- **🌊 Momentum Mode**: Stress-free learning flow with relaxed pace

## Architecture

### Core Files

- `src/data/modes.ts` - Study mode configurations and type definitions
- `src/components/ModeSelector.tsx` - Mode selection UI component with benefits display
- `src/providers/ModeThemeProvider.tsx` - Theme application and persistence
- `src/lib/coaching.ts` - Coaching behaviors and messaging (reused from avatar system)

### Integration Points

- **Dashboard**: Header mode selector and motivational messages
- **UserProfile**: Mode selection in settings  
- **Practice/Results**: Coaching feedback and success animations
- **Global**: Theme variables and background gradients

## Adding/Editing a Study Mode (< 5 minutes)

### 1. Add Mode Configuration (`src/data/modes.ts`)

```typescript
// Add to ModeId type
export type ModeId = "focus" | "mentor" | "momentum" | "newMode";

// Add to studyModes object
newMode: {
  id: "newMode",
  name: "New Mode",
  tagline: "Your custom learning approach",
  icon: "🎯", // Choose appropriate emoji
  benefits: [
    "Benefit 1 that users will see",
    "Benefit 2 explaining the value",
    "Benefit 3 for this mode",
    "Benefit 4 as special feature",
    "Benefit 5 unique to this mode"
  ],
  optimizes: "What this mode is designed to optimize for",
  theme: {
    accent: "hsl(hue, saturation%, lightness%)",
    bgGradient: "from-color-950 via-color-900 to-color-950",
    backgroundPattern: "pattern-name", // optional
    atmosphere: {
      primary: "hsl(...)",
      secondary: "hsl(...)", 
      surface: "hsl(...)",
      muted: "hsl(...)"
    },
    card: { 
      radius: "1rem", 
      shadow: "shadow-md",
      border: "border-color/opacity"
    },
    motion: { intensity: "medium", successFx: "pulse" },
    typography: {
      headingFont: "font-semibold tracking-normal",
      bodyFont: "font-normal"
    }
  },
  coaching: {
    tone: "supportive", // Add to coaching.ts if new tone
    hintPolicy: "balanced",
    explainFormat: "step-by-step with examples",
    motivate: ({ examType, examDate }) =>
      examType && examDate
        ? `Custom message for ${examType} on ${examDate}`
        : "Default motivational message"
  }
}
```

### 2. Add Background Pattern (Optional)

If using a new background pattern, add CSS to `src/index.css`:

```css
.pattern-name {
  background-image: /* your pattern */;
  background-size: /* appropriate size */;
}
```

### 3. Update Coaching Service (If New Tone)

In `src/lib/coaching.ts`, add handling for new tone in relevant methods:

```typescript
// In getSuccessFeedback method
case 'supportive':
  return isCorrect 
    ? "Great job! You're building confidence."
    : "That's okay - every mistake teaches us something.";
```

### 4. Test Integration

1. Mode appears in selector dialog
2. Theme changes apply (background, accent color, card styling)
3. Coaching messages reflect the new tone
4. Persistence works across sessions
5. Benefits are clearly displayed

## Theme Customization

### Color System
- Use HSL format: `hsl(hue, saturation%, lightness%)`
- Accent colors should have good contrast in both light/dark modes
- Background gradients use Tailwind's `from-` `via-` `to-` classes

### Motion System
- **high**: Full animations, prominent success effects
- **medium**: Moderate animations, balanced feedback
- **low**: Minimal animations, subtle feedback

Automatically respects `prefers-reduced-motion` system setting.

### Success Effects
- **pulse**: Pulsing glow effect
- **checkmark**: Animated checkmark appearance
- **confetti-dots**: Small celebration particles

## Coaching Behaviors

### Tone Options
- **energetic**: Motivational, action-oriented language
- **calm-precise**: Measured, academic language
- **casual**: Friendly, conversational language

### Hint Policies
- **early-short**: Quick hints appear early
- **late-structured**: Detailed hints after multiple attempts
- **on-demand**: Hints only when explicitly requested

### Explanation Formats
Customize how mistakes are explained:
- Steps-based: "1. First, identify... 2. Then, apply..."
- Definition-based: "Definition → Principle → Example"
- Example-based: "Here's a similar problem..."

## State Management

### Persistence
- Mode selection stored in `localStorage`
- Survives browser sessions and page reloads
- Falls back to "focus" if no selection found

### Theme Application
- CSS variables injected at document root
- Tailwind classes applied to body element
- Data attributes for motion preferences

### Context Integration
- CoachingService receives user context (exam type, date, performance)
- Messages adapt based on progress and milestones
- Nudges avoid repetition with internal tracking

## UI Guidelines

### Benefits Display
- Each mode shows 5 clear benefits
- Benefits focus on what the user gains
- Use action-oriented language
- Include unique value propositions

### Mode Selection
- Radio-style selection for single choice
- Large, clear mode cards with icons
- Immediate visual feedback for selection
- Apply/Cancel buttons for confirmation

### Current Mode Indicator
- Show current mode in header trigger
- Display mode icon and name
- Include tagline/optimization focus

## Accessibility

- Motion respects `prefers-reduced-motion`
- Success animations never block task flow
- High contrast maintained across themes
- Keyboard navigation supported in mode selector
- Screen reader friendly labels and descriptions

## Verification Checklist

- [ ] Mode selector appears in Dashboard header
- [ ] Mode selection persists across sessions
- [ ] Theme changes apply globally (background, accent, cards)
- [ ] Coaching messages reflect selected mode personality
- [ ] Success animations match mode configuration
- [ ] Motion respects system accessibility preferences
- [ ] Motivational messages include exam context when available
- [ ] Benefits are clearly displayed in selector
- [ ] All three default modes work correctly
- [ ] No "avatar" terminology appears in UI
- [ ] Mode optimizations are clearly communicated

## Troubleshooting

### Theme Not Applying
Check that `ModeThemeProvider` wraps the app root and CSS variables are being set on `document.documentElement`.

### Coaching Messages Not Updating
Verify `CoachingService` is receiving the correct mode-to-avatar mapping and context data.

### Benefits Not Displaying
Ensure all mode configurations include the `benefits` array with 5 items.

### Persistence Issues
Check browser localStorage permissions and fallback behavior to "focus" mode.