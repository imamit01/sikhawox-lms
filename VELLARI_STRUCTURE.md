# 🎓 SIKHAWOX - Directory Structure
│   │   ├── page.tsx               # Landing page
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (student)/
│   │   │   ├── dashboard/         # Student dashboard with daily tasks
│   │   │   ├── my-courses/        # Enrolled courses (post-approval)
│   │   │   ├── marketplace/       # Browse & purchase courses
│   │   │   ├── mock-tests/        # Mock test history & runner
│   │   │   └── progress/          # Visual analytics
│   │   ├── (instructor)/
│   │   │   ├── courses/           # Manage teaching courses
│   │   │   └── analytics/
│   │   ├── (admin)/
│   │   │   ├── dashboard/         # "God View" analytics
│   │   │   ├── purchase-requests/ # Approve/Reject purchases
│   │   │   ├── course-builder/    # Create courses & problems
│   │   │   ├── student-spy/       # Login history & progress
│   │   │   └── team-management/   # Manage moderators
│   │   └── api/
│   │       ├── auth/
│   │       ├── courses/
│   │       ├── purchase-requests/
│   │       │   ├── create/
│   │       │   ├── approve/       # Critical: Admin approval endpoint
│   │       │   └── reject/
│   │       ├── code-execution/    # Judge0 integration
│   │       ├── activity-logs/
│   │       └── mock-tests/
│   ├── components/
│   │   ├── brand/
│   │   │   ├── VellariLogo.tsx    # Brand logo component
│   │   │   └── VellariBranding.tsx
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx        # Responsive sidebar
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── admin/
│   │   │   ├── PurchaseApprovalCard.tsx
│   │   │   ├── StudentSpyPanel.tsx
│   │   │   └── GodViewDashboard.tsx
│   │   ├── student/
│   │   │   ├── DailyTasksList.tsx
│   │   │   ├── ProgressChart.tsx  # Recharts integration
│   │   │   └── CourseCard.tsx
│   │   ├── coding/
│   │   │   ├── MonacoIDE.tsx      # Monaco editor wrapper
│   │   │   ├── CodeRunner.tsx
│   │   │   └── TestCaseViewer.tsx
│   │   └── ui/                    # Shadcn/UI components
│   ├── lib/
│   │   ├── prisma.ts              # Prisma client
│   │   ├── auth.ts                # Auth configuration
│   │   ├── judge0.ts              # Judge0 API client
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useUser.ts
│   │   ├── useCourses.ts
│   │   └── useCodeExecution.ts
│   ├── store/                     # Zustand stores
│   │   ├── authStore.ts
│   │   └── codeStore.ts
│   └── types/
│       ├── index.ts
│       └── prisma.ts
├── .env.example
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 SIKHAWOX Brand Guidelines

### Color Palette
- **Primary**: Emerald Green (#10B981) or Deep Royal Blue (#1E40AF)
- **Secondary**: Complementary accent colors
- **Background**: Modern dark mode with subtle gradients
- **Text**: High contrast for readability

### Typography
- **Headings**: Bold, modern sans-serif (Inter, Outfit)
- **Body**: Clean, readable (Roboto, Inter)

### Logo Placement
- Top-left in navigation
- Center on auth pages
- Footer branding
- Welcome messages: "Welcome to SIKHAWOX"
