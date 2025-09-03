# AI Avatars System

## Overview
The AI Avatars system provides personalized learning experiences through three distinct coaching personalities that dynamically adjust the app's theming, coaching behavior, and micro-interactions.

## Available Avatars

### 🏋️ Coach
- **Theme**: Bold blue accent, high motion intensity
- **Coaching Style**: Energetic, early hints, concise feedback
- **Best For**: Students who need motivation and quick wins

### 🎓 Mentor  
- **Theme**: Calm green accent, medium motion intensity
- **Coaching Style**: Precise, structured explanations, definition-based
- **Best For**: Students who prefer methodical learning

### 🤝 Buddy
- **Theme**: Purple accent, low motion intensity
- **Coaching Style**: Casual, on-demand help, short tips
- **Best For**: Students who want relaxed, friendly guidance

## Architecture

### Core Files
- `src/data/avatars.ts` - Avatar configurations and themes
- `src/components/AvatarPicker.tsx` - UI component for avatar selection
- `src/providers/AvatarThemeProvider.tsx` - Theme injection and management
- `src/lib/coaching.ts` - Coaching behavior and messaging logic

### Database
- Added `avatar_id` column to `profiles` table
- Constraint ensures valid avatar IDs ('coach', 'mentor', 'buddy')

### Integration Points
- **Dashboard**: Avatar picker in header, dynamic motivation messages
- **Profile**: Full avatar selection with previews
- **Theme System**: CSS custom properties for dynamic theming
- **Coaching Messages**: Context-aware hints, explanations, and encouragement

## Adding a New Avatar (< 10 minutes)

### 1. Update Avatar Configuration (2 mins)
```typescript
// src/data/avatars.ts
export type AvatarId = \"coach\" | \"mentor\" | \"buddy\" | \"scholar\"; // Add new ID

export const avatars: Record<AvatarId, AvatarConfig> = {
  // ... existing avatars
  scholar: {
    name: \"Scholar\",
    assets: {
      avatar: \"/path/to/scholar-avatar.png\"
    },
    theme: {
      accent: \"hsl(45, 80%, 50%)\", // Gold theme
      bgGradient: \"from-amber-950 via-amber-900 to-amber-950\",
      card: { radius: \"0.75rem\", shadow: \"shadow-sm\" },
      motion: { intensity: \"medium\", successFx: \"checkmark\" }
    },
    coaching: {
      tone: \"academic\",
      hintPolicy: \"detailed-research\",
      explainFormat: \"theory → evidence → application\",
      motivate: ({ examType, examDate }) => 
        examType && examDate 
          ? `Deep preparation for ${examType} (${examDate}). Knowledge builds upon knowledge.`
          : \"True understanding comes through careful study.\"
    }
  }
};
```

### 2. Update Database Constraint (2 mins)
```sql
-- Add migration to update the constraint
ALTER TABLE public.profiles DROP CONSTRAINT avatar_id_check;
ALTER TABLE public.profiles ADD CONSTRAINT avatar_id_check 
  CHECK (avatar_id IN ('coach', 'mentor', 'buddy', 'scholar'));
```

### 3. Add Coaching Behaviors (3 mins)
```typescript
// src/lib/coaching.ts - Add new cases in relevant methods
private getAcademicSuccess(context: CoachingContext): string {
  return \"Excellent scholarly work. Your analysis demonstrates deep understanding.\";
}

// Update switch statements to include 'academic' tone
switch (config.coaching.tone) {
  case \"academic\":
    return this.getAcademicSuccess(context);
  // ... existing cases
}
```

### 4. Add Avatar Asset (1 min)
- Place avatar image in `public/` directory
- Update the `assets.avatar` path in the configuration

### 5. Test Integration (2 mins)
- Verify avatar appears in picker components
- Test theme application
- Confirm coaching messages work

## Verification Checklist

✅ **Theme Switching**
- [ ] Pick \"Coach\" → app accent changes to blue, hints are brief + early
- [ ] Switch to \"Mentor\" → calmer green palette, explanations use definitions + steps  
- [ ] Switch to \"Buddy\" → purple theme, casual copy, fewer animations

✅ **Persistence**
- [ ] Avatar choice persists across sessions and pages
- [ ] Theme applies consistently across all core learning views

✅ **Accessibility**
- [ ] Motion respects `prefers-reduced-motion` setting
- [ ] All micro-interactions remain functional, never block task flow

✅ **Coaching Behavior**
- [ ] Motivational messages reference exam type and date when available
- [ ] Different explanation formats based on avatar personality
- [ ] Success feedback matches avatar style

✅ **Performance**
- [ ] Theme changes are smooth and immediate
- [ ] No layout shifts when switching avatars
- [ ] CSS custom properties update correctly

## Technical Notes

### CSS Custom Properties
The system injects these CSS variables for theming:
- `--avatar-accent` - Primary accent color
- `--avatar-card-radius` - Card border radius
- `--avatar-motion-intensity` - Animation intensity level
- `--avatar-success-fx` - Success feedback type

### Motion Preferences
Automatically respects system motion preferences and can be overridden per avatar for accessibility.

### Coaching Context
The coaching service accepts context including:
- `examType` - Current exam (SAT, ACT, etc.)
- `examDate` - Target exam date
- `accuracy` - Current performance metrics
- `streakDays` - Study streak information
- `isCorrect` - For question-specific feedback

This system creates a personalized learning environment that adapts to each student's preferred learning style while maintaining professional, accessible design standards.
