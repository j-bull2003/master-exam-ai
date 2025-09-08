# SAT-Only Platform Pricing Guide

## Current Pricing Structure

The platform has been updated to SAT-only preparation with the following pricing tiers:

### Pricing Plans
1. **Annual Plan** - $39.99/mo (BEST VALUE)
   - Billed at $479.99 annually
   - 7-day free trial included

2. **6-Month Plan** - $54.99/mo  
   - Billed at $329.99 every 6 months
   - 7-day free trial included

3. **3-Month Plan** - $79.99/mo
   - Billed at $239.99 every 3 months  
   - 7-day free trial included

4. **Monthly Plan** - $159.99/mo
   - Billed at $159.99 monthly
   - 7-day free trial included

### How to Update Pricing

To modify the pricing structure, update the following files:

1. **src/pages/Pricing.tsx** - Main pricing page display
   - Update price amounts in the pricing grid section
   - Modify billing descriptions
   - Update "BEST VALUE" badge if needed

2. **src/data/faq.ts** - FAQ pricing information  
   - Update pricing FAQ answer with new amounts

3. **Any future checkout/payment components** - Ensure pricing consistency

### Features Included in All Plans
- Unlimited SAT practice questions
- AI-powered personalization  
- Full-length SAT mock exams
- Advanced analytics dashboard
- Comprehensive SAT preparation
- Detailed performance insights
- Expert-authored SAT content
- Mobile app access
- 24/7 customer support
- Progress tracking
- Weakness identification
- SAT-specific study plans

### Design Notes
- Annual plan highlighted as "BEST VALUE"
- All plans include 7-day free trial
- Promo code option available
- Premium design with gradient buttons
- Consistent branding with SAT focus

### Copy Strategy
- "Limited free access. Upgrade for full prep experience."
- Focus on SAT specialization
- No mentions of other exams
- Clean, rounded pricing numbers
- ~20% cheaper than competitors