# Fundraising Campaign Frontend

A modern React + TypeScript frontend for managing fundraising campaigns with a hierarchical structure: Groups → Solicitors → Donors.

## 🎯 Features

- **Campaign Tracking**: Monitor overall campaign progress with real-time statistics
- **Hierarchical Organization**: Groups contain Solicitors, Solicitors have Donors
- **Global State Management**: Context API for campaign-wide data management
- **Custom Hooks**: Dedicated data-fetching hooks with loading and error states
- **Service Layer**: Centralized Axios API service for clean architecture
- **React Router**: Multi-page navigation (Home, Groups, Solicitors, Donors, About)
- **Responsive Design**: Mobile-friendly UI with gradient styling
- **Read-Only Operations**: No delete/edit functionality - focus on donations
- **Unregistered Access**: Users can donate without logging in

## 📁 Project Structure

```
src/
├── types.ts              # TypeScript interfaces (Donor, Solicitor, Group, etc.)
├── api.ts                # Axios instance with baseURL and interceptors
├── services.ts           # API service functions for data fetching
├── hooks.ts              # Custom hooks (useGroups, useSolicitors, etc.)
├── CampaignContext.tsx   # Global state provider for campaign data
├── Navigation.tsx        # Header navigation component
├── Navigation.css        # Navigation styles
├── ProgressBar.tsx       # Progress visualization component
├── ProgressBar.css       # Progress bar styles
├── CountdownTimer.tsx    # Campaign countdown component
├── CountdownTimer.css    # Countdown timer styles
├── DonationForm.tsx      # Quick donation form
├── DonationForm.css      # Form styles
├── Cards.tsx             # GroupCard, SolicitorCard, DonorCard components
├── Cards.css             # Card component styles
├── Forms.tsx             # AddSolicitorForm component
├── Forms.css             # Form component styles
├── HomePage.tsx          # Home page with campaign overview
├── GroupsPage.tsx        # Groups listing page
├── SolicitorsPage.tsx    # Solicitors listing page with add functionality
├── DonorsPage.tsx        # Donors listing page with total donations
├── AboutPage.tsx         # About/Information page
├── Pages.css             # Shared page styles
├── App.tsx               # Main app with routing
├── App.css               # Global styles
└── main.tsx              # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Backend API server running on `http://localhost:5000/api`

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Lint Code

```bash
npm run lint
```

## 📋 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` or `/home` | Home | Campaign overview, progress, countdown, quick donation |
| `/groups` | Groups | List all campaign groups |
| `/solicitors` | Solicitors | List all solicitors with ability to add new ones |
| `/donors` | Donors | List all donors and total donations |
| `/about` | About | Campaign information and how it works |

## 🔧 Architecture

### API Service Layer (`services.ts`)
- **groupService**: `fetchGroups()`, `getGroupById()`
- **solicitorService**: `fetchSolicitors()`, `getSolicitorsByGroupId()`, `addSolicitor()`
- **donorService**: `fetchDonors()`, `getDonorsBySolicitorId()`
- **campaignService**: `fetchCampaignStats()`, `donate()`

### Custom Hooks (`hooks.ts`)
- `useGroups()` - Fetch all groups with loading/error states
- `useSolicitors(groupId)` - Fetch solicitors for a group
- `useDonors(solicitorId)` - Fetch donors for a solicitor
- `useCampaignStats()` - Fetch campaign statistics
- `useCountdown(endDate)` - Calculate countdown timer

### Context API (`CampaignContext.tsx`)
- `CampaignProvider` - Provides global campaign state
- `useCampaignContext()` - Hook to access campaign context

### Axios Configuration (`api.ts`)
- Base URL from environment variable
- Request/response interceptors for auth tokens
- Error handling

## 📝 Data Models

### TypeScript Interfaces

```typescript
interface Donor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  donationAmount: number;
  donationDate: string;
  solicitorId: string;
}

interface Solicitor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  groupId: string;
  targetAmount: number;
  raisedAmount: number;
  donors?: Donor[];
}

interface Group {
  id: string;
  name: string;
  description?: string;
  targetAmount: number;
  raisedAmount: number;
  solicitors?: Solicitor[];
}

interface CampaignStats {
  totalRaised: number;
  totalGoal: number;
  percentageComplete: number;
  timeLeft: string;
  totalDonors: number;
  totalGroups: number;
}
```

## 🎨 UI Components

### Layout Components
- **Navigation**: Header with route links
- **ProgressBar**: Visual campaign progress
- **CountdownTimer**: Countdown to campaign end

### Cards Components
- **GroupCard**: Display group information
- **SolicitorCard**: Display solicitor details
- **DonorCard**: Display donor with donation amount

### Form Components
- **DonationForm**: Quick donation form
- **AddSolicitorForm**: Add new solicitor to group

### Pages
- **HomePage**: Campaign overview with stats and donation form
- **GroupsPage**: Grid of all groups
- **SolicitorsPage**: List solicitors with add functionality
- **DonorsPage**: Display all donors with totals
- **AboutPage**: Campaign information

## 🔄 Data Flow

1. **User arrives** → HomePage loads with campaign stats
2. **User navigates** → React Router handles routing
3. **Component mounts** → Custom hooks fetch data from API
4. **Data arrives** → Component renders with data
5. **User donates** → DonationForm submits via campaignService
6. **Context updates** → Global campaign stats refresh
7. **Components update** → Progress and totals update across app

## 🛠️ Configuration

### Environment Variables
Create `.env.local` in the client directory:

```env
VITE_API_URL=http://localhost:5000/api
```

The API URL is used by Axios to make requests to your backend server.

## 📦 Dependencies

- **React 19.2.6** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **TypeScript** - Type safety
- **Vite** - Build tool

## ✅ Features Implemented

- ✓ TypeScript interfaces for all data models
- ✓ Axios service layer with interceptors
- ✓ Custom hooks for data fetching
- ✓ Context API for global state
- ✓ React Router with 5 main pages
- ✓ Responsive card-based layouts
- ✓ Progress tracking visualization
- ✓ Countdown timer component
- ✓ Donation form with validation
- ✓ Add solicitor functionality
- ✓ Read-only operations (no delete/edit)
- ✓ Unregistered user access
- ✓ Error handling and loading states

## 📞 API Endpoints Expected

Your backend should provide these endpoints:

```
GET    /api/groups
GET    /api/groups/:id
GET    /api/groups/:groupId/solicitors
GET    /api/solicitors
GET    /api/solicitors/:id
POST   /api/solicitors
GET    /api/solicitors/:solicitorId/donors
GET    /api/donors
GET    /api/donors/:id
POST   /api/donations
GET    /api/campaign/stats
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)

## 📝 License

This project is provided as-is for educational purposes.
