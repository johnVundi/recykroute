# Onboarding Pages Access Guide

## 🎯 User Flow

All onboarding pages are accessed from the **Landing Page** (`/` or `/landing`)

## 📍 Button Locations

### Landing Page (`src/pages/LandingPage.tsx`)

The landing page now displays **4 role selection buttons** in a 2x2 grid:

```
┌─────────────────────────────────┐
│    WELCOME TO RECYKROUTE        │
│  Please select your role:       │
│                                 │
│  ┌─────────────┬──────────────┐ │
│  │   Waste     │  Aggregator  │ │
│  │  Generator  │              │ │
│  │  (Sky Blue) │  (Sky Blue)  │ │
│  ├─────────────┼──────────────┤ │
│  │  Recycler   │County Official│
│  │ (Emerald)   │   (Blue)     │ │
│  └─────────────┴──────────────┘ │
└─────────────────────────────────┘
```

## 🚀 Navigation Routes

When a user clicks a button:
1. **Loading animation** displays (GettingReady component)
2. After animation completes, user is redirected to their onboarding page

### Route Mappings:

| Button Text | User Type | Loading Messages | Redirects To |
|------------|-----------|------------------|--------------|
| **Waste Generator** | `generator` | "Setting up your profile…<br>Preparing your waste management profile" | `/onboarding/waste-generator` |
| **Aggregator** | `aggregator` | "Setting up your profile…<br>Preparing your collector workspace" | `/onboarding/aggregator` |
| **Recycler** | `recycler` | "Setting up your facility…<br>Preparing your recycling center profile" | `/onboarding/recycler` |
| **County Official** | `county-official` | "Setting up your account…<br>Preparing your administrative dashboard" | `/onboarding/county-official` |

## 📋 Required Routes in App.tsx

Add these routes to your router configuration:

```tsx
import WasteGeneratorOnboardingPage from './pages/WasteGeneratorOnboardingPage'
import AggregatorOnboardingPage from './pages/AggregatorOnboardingPage'
import RecyclerOnboardingPage from './pages/RecyclerOnboardingPage'
import CountyOfficialOnboardingPage from './pages/CountyOfficialOnboardingPage'

// In your Routes configuration:
<Route path="/onboarding/waste-generator" element={<WasteGeneratorOnboardingPage />} />
<Route path="/onboarding/aggregator" element={<AggregatorOnboardingPage />} />
<Route path="/onboarding/recycler" element={<RecyclerOnboardingPage />} />
<Route path="/onboarding/county-official" element={<CountyOfficialOnboardingPage />} />
```

## 🎨 Button Styling

- **Waste Generator & Aggregator**: Sky blue (`bg-[#0277c7]`)
- **Recycler**: Emerald green (`bg-emerald-600`) 
- **County Official**: Blue (`bg-blue-600`)

All buttons have hover states and transitions for better UX.

## 🔄 Complete User Journey

1. User visits Landing Page
2. Selects their role (one of 4 buttons)
3. Sees personalized loading animation (2 steps, ~1.5 seconds)
4. Redirected to role-specific onboarding page
5. Completes multi-step onboarding form
6. Data saved to localStorage
7. Redirected to `/dashboard`

## 📦 Files Updated

- ✅ `src/pages/LandingPage.tsx` - Added 2 new buttons + handlers
- ✅ `src/components/GettingReady.tsx` - Added recycler & county-official loading steps
- ✅ `src/components/onboarding/RecyclersOnboarding.tsx` - 6-step onboarding
- ✅ `src/components/onboarding/CountOfficialsOnboarding.tsx` - 3-step onboarding
- ✅ `src/pages/RecyclerOnboardingPage.tsx` - Page wrapper
- ✅ `src/pages/CountyOfficialOnboardingPage.tsx` - Page wrapper
- ✅ `src/components/onboarding/index.ts` - Export updates

## 🎯 Next Steps

1. Add the routes to `App.tsx` (see above)
2. Test each user flow from landing page
3. Verify localStorage data is saved correctly
4. (Optional) Add authentication checks before onboarding
