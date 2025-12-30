# Contributing to GenForm 🚀

First off, thank you for considering contributing to GenForm! It's people like you that make GenForm such a great tool. We welcome contributions from everyone, whether you're fixing a typo, reporting a bug, or implementing a new feature.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🎯 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm**
- **Git**
- **PostgreSQL** (or access to a PostgreSQL database)

### Required Accounts

You'll need accounts for these services:

- [Clerk](https://clerk.dev/) - For authentication
- [Google AI Studio](https://makersuite.google.com/) - For Gemini API key
- [Stripe](https://stripe.com/) - For payment processing (optional for basic development)
- [Vercel](https://vercel.com/) - For deployment (optional)

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what you expected
- Include screenshots or GIFs if applicable
- Note your environment (OS, browser, Node version, etc.)

**Use the [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.yml)**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- List any alternative solutions you've considered

**Use the [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.yml)**

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Issues that should only require a few lines of code
- `help wanted` - Issues that need extra attention
- `beginner-friendly` - Good for newcomers

### Documentation

Documentation improvements are always welcome! This includes:

- README updates
- Code comments
- API documentation
- Tutorial content
- Blog posts or articles

## 💻 Development Setup

### 1. Fork and Clone the Repository

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/GenForm.git
cd GenForm

# Add upstream remote
git remote add upstream https://github.com/Amansingh0807/GenForm.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/genform"

# Google AI (Gemini)
GEMINI_API_KEY=your_gemini_api_key

# Stripe (Optional for basic development)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up the Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔄 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch naming conventions:**
- `feature/` - New features (e.g., `feature/add-dark-mode`)
- `fix/` - Bug fixes (e.g., `fix/form-validation`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/optimize-queries`)
- `test/` - Test additions or fixes (e.g., `test/add-form-tests`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### 2. Make Your Changes

- Write clean, readable, and maintainable code
- Follow the existing code style
- Add comments for complex logic
- Keep commits atomic and focused
- Test your changes thoroughly

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Build the project
npm run build

# Test in development mode
npm run dev
```

**Manual Testing Checklist:**
- [ ] Feature works as expected
- [ ] No console errors or warnings
- [ ] UI is responsive (mobile, tablet, desktop)
- [ ] Dark mode works correctly
- [ ] No breaking changes to existing features
- [ ] Database operations work correctly

### 4. Commit Your Changes

```bash
git add .
git commit -m "type: brief description"
```

See [Commit Message Guidelines](#commit-message-guidelines) below.

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

1. Go to the [original repository](https://github.com/Amansingh0807/GenForm)
2. Click "New Pull Request"
3. Click "compare across forks"
4. Select your fork and branch
5. Fill out the PR template completely
6. Submit the pull request

## 🎨 Style Guidelines

### TypeScript/JavaScript

- Use **TypeScript** for all new files
- Follow the existing code style
- Use **ES6+ syntax** (arrow functions, destructuring, etc.)
- Use **async/await** instead of promises when possible
- Prefer **functional components** over class components in React
- Use **TypeScript types/interfaces** instead of `any`

### React Components

- Use **functional components** with hooks
- Follow **component composition** patterns
- Keep components **small and focused**
- Use **proper prop typing**
- Extract reusable logic into **custom hooks**

### Naming Conventions

- **Components**: PascalCase (e.g., `FormEditor.tsx`)
- **Utilities/Helpers**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FORM_LIMIT`)
- **CSS Classes**: kebab-case (e.g., `form-container`)
- **Types/Interfaces**: PascalCase (e.g., `FormData`)

### File Structure

```
src/
├── app/                 # Next.js app directory
│   ├── (auth)/         # Auth routes group
│   ├── dashboard/      # Dashboard routes
│   └── api/            # API routes
├── components/         # React components
│   └── ui/            # Reusable UI components
├── actions/           # Server actions
├── lib/               # Utility functions
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── prisma/            # Database schema & migrations
```

### CSS/Styling

- Use **Tailwind CSS** for styling
- Use **Shadcn/UI** components when possible
- Keep custom CSS minimal
- Use **CSS variables** for theming
- Follow **mobile-first** approach

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes

### Examples

```bash
feat(forms): add drag and drop field reordering

fix(auth): resolve sign-in redirect issue

docs(readme): update installation instructions

refactor(api): optimize form submission endpoint

perf(dashboard): improve forms list loading time

style(components): format code with prettier

test(forms): add unit tests for form validation

chore(deps): update dependencies
```

### Guidelines

- Use the **imperative mood** ("add" not "added")
- Don't capitalize the first letter
- No period (.) at the end
- Keep the subject line under 50 characters
- Separate subject from body with a blank line
- Use the body to explain **what** and **why**, not **how**

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Changes tested thoroughly
- [ ] Screenshots included for UI changes
- [ ] PR template filled out completely

### PR Checklist

1. **Title**: Clear and descriptive
2. **Description**: Detailed explanation of changes
3. **Issue Link**: Reference related issues
4. **Type**: Mark the type of change
5. **AI Disclosure**: Be transparent about AI tool usage
6. **Screenshots**: Include for UI changes
7. **Testing**: Describe how you tested

### Review Process

1. **Automated Checks**: PR must pass all CI checks
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: At least one maintainer must approve
5. **Merge**: Maintainer will merge your PR

### After Your PR is Merged

- Delete your branch (optional)
- Update your local main branch
- Celebrate! 🎉

```bash
git checkout main
git pull upstream main
git branch -d feature/your-feature-name
```

## 🌟 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit for their contributions
- Invited to join the contributors team (for active contributors)

## 💬 Community

### Get Help

- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features
- **Discord**: Join our community server (coming soon)

### Stay Updated

- Star the repository to stay updated
- Watch for releases and announcements
- Follow the project on social media

## 🙏 Thank You

Your contributions, big or small, make a huge difference to the GenForm project and community. Whether you're fixing typos, reporting bugs, or building new features, we appreciate your time and effort!

---

**Happy Contributing! 🚀**

If you have any questions, feel free to reach out by opening an issue or discussion.
