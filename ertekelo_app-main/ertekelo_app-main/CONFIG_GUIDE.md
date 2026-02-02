# Google Review Management App - Configuration Guide

## Quick Start

This is a production-ready review management application designed to ethically filter negative feedback internally while directing positive feedback to Google Maps. All configuration is managed through a single `config.ts` file.

## Configuration File: `src/config.ts`

### Available Settings

```typescript
isClientActive: boolean
```
- Controls whether the app is active or in maintenance mode
- Set to `false` to display a maintenance screen
- Set to `true` to enable normal operation
- Default: `true`

```typescript
companyName: string
```
- Display name of the business
- Shown on all screens and in the header
- Example: `"Dr. Kovács Fogászat"`

```typescript
logoUrl: string
```
- URL to the company logo
- Displayed as a circular image on all screens
- Supports any image URL (JPEG, PNG, etc.)
- Default: Placeholder URL using initials

```typescript
googleReviewUrl: string
```
- Direct link to Google Maps write review window
- Format: `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`
- Get your Place ID from [Google My Business](https://www.google.com/business/)
- Users will be directed here for positive reviews (4-5 stars)

```typescript
adminEmail: string
```
- Email address where negative feedback notifications could be sent
- Currently logged to console
- Future: Can be integrated with backend email service
- Example: `"info@drkovacs.hu"`

```typescript
reviewTags: string[]
```
- Array of tags users can select to build their review
- Used in the Positive Flow (4-5 stars)
- Helps overcome "writer's block" and create better reviews
- Current tags: `["Gyors", "Fájdalommentes", "Profi", "Tiszta"]`
- Customize these to match your service!

```typescript
colors: { primary: string, primaryHex: string }
```
- Brand color configuration
- `primary`: Tailwind color class (e.g., `"blue-600"`)
- `primaryHex`: Hex value for inline styles (e.g., `"#3B82F6"`)
- Both must match for consistent theming

## How It Works

### 1. The Sentiment Filter (Landing Page)
- Users see 5 stars and rate their experience
- **1-3 stars** → Goes to Negative Flow (internal feedback)
- **4-5 stars** → Goes to Positive Flow (Google redirect)

### 2. The Negative Flow (Service Recovery)
- Users are encouraged to provide feedback directly
- Primary action: "Vélemény elküldése a Vezetőségnek" (submit to management)
- Secondary action: Small link to write on Google (compliance)
- Goal: Keep negative reviews internal, solve problems
- Feedback is logged to console (ready for backend integration)

### 3. The Positive Flow (The Accelerator)
- Smart Tags help users build their review
- Preview shows the generated review text
- One-click: Copy text to clipboard + redirect to Google
- Toast notification confirms success

### 4. Maintenance Mode
- Set `isClientActive: false` to show a maintenance screen
- Useful for disabling the app or payment issues
- All users see this instead of the review form

## Customization Examples

### Change Brand Color
```typescript
colors: {
  primary: "green-600",
  primaryHex: "#16A34A",
}
```

### Change Review Tags
```typescript
reviewTags: ["Быстро", "Качество", "Рекомендую", "Честные цены"]
```

### Add More Tags
```typescript
reviewTags: ["Gyors", "Fájdalommentes", "Profi", "Tiszta", "Kedves", "Higiénikus"]
```

### Disable App Temporarily
```typescript
isClientActive: false
```

## User Flow Summary

```
1. User sees 5 stars
   ↓
2. User clicks a rating
   ↓
   ├─ 1-3 stars → Negative Flow
   │  ├─ Textarea for feedback
   │  ├─ Primary: Submit to management
   │  └─ Secondary: Write on Google (optional)
   │
   └─ 4-5 stars → Positive Flow
      ├─ Smart Tags (configurable)
      ├─ Review preview
      └─ Copy & redirect to Google
```

## Integration Points

### Console Logging
Currently, feedback is logged to the browser console:
- Negative feedback: `console.log('Feedback submitted:', feedback)`
- Positive feedback: `console.log('Review sent to Google:', reviewText)`

### Backend Integration
To save feedback to a database:
1. Replace `console.log` in `App.tsx` with API calls
2. Use Supabase, Firebase, or your backend
3. Send `feedback` and `reviewText` to your server

### Email Notifications
The `adminEmail` field is ready for integration with email services like:
- SendGrid
- Mailgun
- AWS SES
- Supabase (Edge Functions)

## Mobile Optimization

All buttons are thumb-friendly with minimum 48px height.
The app is fully responsive and tested on:
- Mobile (360px - 480px)
- Tablet (768px - 1024px)
- Desktop (1200px+)

## Language

All text is in **Hungarian**. To change:
1. Edit component strings in `src/components/`
2. Translate config values if needed
3. Update placeholder text in forms

## Support

For issues or questions:
1. Check if `isClientActive` is `true`
2. Verify URLs are correct (especially `googleReviewUrl`)
3. Check browser console for logged feedback
4. Ensure all config values are strings or arrays
