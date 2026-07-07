# Contributing to StormOS

Thank you for your interest in contributing to StormOS. This document provides guidelines for contributing to the project.

---

## Overview

StormOS is a premium portfolio operating system for Storm, a software engineer. Contributions are welcome, but please understand that this is a personal project with a specific vision.

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git installed
- Basic knowledge of React, TypeScript, and Next.js
- Familiarity with the project documentation

### Setup

1. **Fork the repository**
   - Fork the repository on GitHub
   - Clone your fork locally

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm run test
   ```

5. **Run linting**
   ```bash
   npm run lint
   ```

---

## Coding Standards

### Code Conventions

Follow the code conventions documented in `AI_GUIDELINES.md`:

- Use TypeScript for all code
- Follow the documented folder structure
- Use kebab-case for file names
- Use PascalCase for React components
- Use camelCase for variables and functions
- Use UPPER_SNAKE_CASE for constants

### Style Guidelines

- Use Prettier for code formatting
- Use ESLint for linting
- Follow the documented design system
- Use documented design tokens only
- No arbitrary values unless documented

### Component Guidelines

- Make components reusable
- Use composition over inheritance
- Keep components focused
- Document component props with TypeScript
- Include accessibility attributes

### Testing Guidelines

- Write tests for components
- Write tests for hooks
- Write tests for utilities
- Maintain test coverage > 80%
- Test accessibility

---

## Documentation Requirements

### Before Contributing

**Read the documentation:**
1. Read the main README
2. Read the Design System documentation
3. Read the Component Library documentation
4. Read the User Journey documentation
5. Read the Technical Architecture documentation
6. Read the Engineering Principles
7. Read the AI Guidelines

### During Development

**Follow the documentation:**
- Use documented design tokens only
- Follow documented patterns
- Implement documented components as specified
- Don't deviate from documented decisions

### After Development

**Update documentation:**
- Update relevant documentation if patterns change
- Document new patterns if introduced
- Document deviations with reasoning
- Keep documentation in sync with code

---

## Contribution Workflow

### 1. Create an Issue

Before making changes:
- Check if an issue already exists
- Create a new issue if needed
- Describe the problem or feature
- Reference relevant documentation
- Wait for approval if major change

### 2. Create a Branch

Create a branch for your contribution:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Changes

- Follow coding standards
- Follow documentation
- Write tests
- Update documentation
- Keep changes focused

### 4. Commit Changes

Commit with descriptive messages:
```bash
git commit -m "feat(components): add button component with variants"
```

Follow conventional commits format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `refactor:` for refactoring
- `test:` for test changes
- `chore:` for maintenance tasks

### 5. Push Changes

Push your branch to your fork:
```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

Create a pull request:
- Describe your changes
- Reference the issue
- Link to documentation updates
- Include screenshots if UI changes
- Wait for review

### 7. Address Feedback

- Respond to review comments
- Make requested changes
- Update documentation if needed
- Push additional commits

### 8. Merge

- Wait for approval
- Merge when approved
- Delete branch if desired

---

## Types of Contributions

### Bug Fixes

- Describe the bug
- Provide steps to reproduce
- Include expected behavior
- Include actual behavior
- Reference relevant documentation

### Features

- Describe the feature
- Explain why it's needed
- Reference relevant documentation
- Get approval before implementing
- Follow documented patterns

### Documentation

- Fix typos or errors
- Improve clarity
- Add missing information
- Update outdated information
- Follow documentation style

### Performance

- Identify performance issue
- Provide measurements
- Propose solution
- Implement optimization
- Document improvement

### Accessibility

- Identify accessibility issue
- Reference WCAG guidelines
- Propose solution
- Implement fix
- Test with accessibility tools

---

## What to Contribute

### Welcome Contributions

- Bug fixes
- Accessibility improvements
- Performance optimizations
- Documentation improvements
- Test improvements
- Minor feature additions

### Requires Discussion

- Major features
- Architecture changes
- Design changes
- Breaking changes
- New dependencies

### Not Accepted

- Changes that conflict with vision
- Changes that conflict with non-goals
- Changes that deviate from documentation
- Changes without documentation updates
- Changes that add unnecessary complexity

---

## Review Process

### What to Expect

- Review may take time depending on availability
- Feedback will be constructive and specific
- Changes may be requested
- Documentation updates may be required
- Testing may be required

### Review Criteria

- Does it follow the documentation?
- Does it follow coding standards?
- Does it include tests?
- Does it include documentation?
- Does it align with the vision?
- Does it add unnecessary complexity?

### Approval

- Approval required before merge
- Major changes require discussion
- Breaking changes require migration guide
- Documentation must be updated
- Tests must pass

---

## Questions and Support

### Before Asking

- Search existing issues
- Read the documentation
- Search the codebase
- Try to solve independently

### When Asking

- Be specific about the problem
- Provide context and examples
- Reference relevant documentation
- Be patient for response

### Where to Ask

- GitHub Issues for bugs and features
- GitHub Discussions for questions
- Email for private inquiries (if applicable)

---

## Recognition

Contributors will be recognized in:
- Contributors section in README
- Changelog entries
- Release notes

---

## Code of Conduct

### Expectations

- Be respectful and constructive
- Be inclusive and welcoming
- Be patient and understanding
- Be collaborative and supportive

### Unacceptable Behavior

- Harassment or discrimination
- Personal attacks
- Unwelcome contact
- Disruptive behavior

### Reporting

Report issues to maintainers via email or GitHub.

---

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

## Questions?

If you have questions about contributing, please:
- Open an issue on GitHub
- Start a discussion on GitHub
- Contact the maintainers

---

**Thank you for contributing to StormOS!**
