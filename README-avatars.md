# AI Avatars System

The AI Avatars system provides personalized learning experiences through different AI personalities that adapt the app's theming, coaching style, and micro-interactions.

## Overview

Three AI avatars are available:
- **Coach**: Energetic, early hints, high-energy animations
- **Mentor**: Calm and precise, structured explanations, medium energy
- **Buddy**: Casual tone, on-demand help, low-energy animations

## Architecture

### Core Files

- `src/data/avatars.ts` - Avatar configurations and type definitions
- `src/components/AvatarPicker.tsx` - Avatar selection UI component
- `src/providers/AvatarThemeProvider.tsx` - Theme application and persistence
- `src/lib/coaching.ts` - Coaching behaviors and messaging

### Integration Points

- **Dashboard**: Header avatar picker and motivational messages
- **UserProfile**: Avatar selection in settings
- **Practice/Results**: Coaching feedback and success animations
- **Global**: Theme variables and background gradients

## Adding a New Avatar (< 10 minutes)

### 1. Add Avatar Configuration (`src/data/avatars.ts`)

```typescript
// Add to AvatarId type
export type AvatarId = "coach" | "mentor" | "buddy" | "newAvatar";

// Add to avatars object
newAvatar: {
  name: "New Avatar",
  assets: { 
    avatar: "/path/to/avatar-image.png"
  },
  theme: {
    accent: "hsl(hue, saturation%, lightness%)",
    bgGradient: "from-color-950 via-color-900 to-color-950",
    card: { radius: "1rem", shadow: "shadow-md" },
    motion: { intensity: "medium", successFx: "pulse" }
  },
  coaching: {
    tone: "supportive", // or "energetic", "calm-precise", "casual"
    hintPolicy: "balanced", // or "early-short", "late-structured", "on-demand"
    explainFormat: "step-by-step with examples",
    motivate: ({ examType, examDate }) =>
      examType && examDate
        ? `Custom message for ${examType} on ${examDate}`
        : "Default motivational message"
  }
}
```

### 2. Add Avatar Image

Place the avatar image in `/public/` or use an existing uploaded image path.

### 3. Test the Integration

1. Avatar appears in picker dialog
2. Theme changes apply (background, accent color, card styling)
3. Coaching messages reflect the new tone
4. Persistence works across sessions

### 4. Customize Coaching Behavior (Optional)

Extend `src/lib/coaching.ts` methods to handle your new tone:

```typescript
// In getSuccessFeedback method
case 'supportive':
  return isCorrect 
    ? "Great job! You're building confidence with each correct answer."
    : "That's okay - every mistake is a learning opportunity.";
```

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
- Avatar selection stored in `localStorage`
- Survives browser sessions and page reloads
- Falls back to "coach" if no selection found

### Theme Application
- CSS variables injected at document root
- Tailwind classes applied to body element
- Data attributes for motion preferences

### Context Integration
- CoachingService receives user context (exam type, date, performance)
- Messages adapt based on progress and milestones
- Nudges avoid repetition with internal tracking

## Accessibility

- Motion respects `prefers-reduced-motion`
- Success animations never block task flow
- High contrast maintained across themes
- Keyboard navigation supported in avatar picker

## Verification Checklist

- [ ] Avatar picker appears in Dashboard header
- [ ] Avatar selection persists across sessions
- [ ] Theme changes apply globally (background, accent, cards)
- [ ] Coaching messages reflect selected avatar personality
- [ ] Success animations match avatar configuration
- [ ] Motion respects system accessibility preferences
- [ ] Motivational messages include exam context when available
- [ ] Empty state messages reflect avatar tone
- [ ] All three default avatars work correctly

## Troubleshooting

### Theme Not Applying
Check that `AvatarThemeProvider` wraps the app root and CSS variables are being set on `document.documentElement`.

### Coaching Messages Not Updating
Verify `CoachingService` is receiving the correct avatar ID and context data.

### Images Not Loading
Ensure avatar image paths are correct and files exist in the public directory.

### Persistence Issues
Check browser localStorage permissions and fallback behavior.