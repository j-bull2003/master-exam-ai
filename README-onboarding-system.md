# Onboarding System Integration

## Overview
Complete end-to-end onboarding system that captures exam selection, target dates, university goals, and persists everything to user profiles with immediate dashboard reflection.

## Files Created/Updated

### Data Models
- `src/data/admissionTests.ts` - Central config for exam types and their topics
- `src/data/universityRequirements.ts` - University exam requirements mapping
- `src/types/profile.ts` - TypeScript interfaces for user profiles
- `src/lib/topicMap.ts` - Maps exam types to available practice topics
- `src/lib/profile-api.ts` - API functions for profile management

### Components
- `src/components/OnboardingFlow.tsx` - 5-step onboarding with validation
- `src/pages/Dashboard.tsx` - Updated to show profile data and goals

### Database
- Added `target_university`, `target_course`, `study_mode` columns to profiles table

## Onboarding Flow Steps
1. **Account Creation** - Name, email, password with validation
2. **Exam Selection** - Choose from available admission tests
3. **Exam Date** - Date picker with future date validation
4. **University Selection** - Optional target university with course input if requirements vary
5. **Confirmation** - Review and create account with profile data

## How to Add/Edit Content

### Adding New Exam Types
Edit `src/data/admissionTests.ts`:
```typescript
{
  id: "NEW_EXAM",
  name: "New Exam",
  topics: ["Topic 1", "Topic 2", "Topic 3"]
}
```

### Adding Universities
Edit `src/data/universityRequirements.ts`:
```typescript
{
  universityId: "new-uni",
  universityName: "New University",
  specificity: "EXACT" | "VARIES" | "UNKNOWN",
  defaultExamType?: "SAT", // if EXACT
  notes: "Additional requirements info"
}
```

## Data Flow
1. User completes onboarding → `ProfileAPI.saveOnboardingData()`
2. Dashboard loads → `ProfileAPI.getProfile()`
3. Topics loaded → `getTopicsForExam(examType)`
4. Goals displayed from `profile.targetUniversity` and `profile.targetCourse`

## Verification Checklist
- [x] Onboarding selections persist to database
- [x] Dashboard shows exam type, date countdown, and goals
- [x] Practice topics load based on selected exam
- [x] University selection handles VARIES requirements with course input
- [x] Data persists across sessions and page refreshes
- [x] Form validation prevents invalid dates and missing required fields