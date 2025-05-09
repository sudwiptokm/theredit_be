# Star Wars Character Explorer - QA/Test Plan

## Overview

This document outlines the testing strategy for the Star Wars Character Explorer application. It covers the different types of testing to be performed, test cases, and acceptance criteria.

## Testing Environments

1. **Development Environment**
   - Local development machines
   - Used for unit testing and initial integration testing

2. **Staging Environment**
   - Mirrors production setup
   - Used for system testing, performance testing, and user acceptance testing

3. **Production Environment**
   - Live environment
   - Used for monitoring and post-deployment verification

## Testing Types

### 1. Unit Testing

Unit tests verify that individual components work as expected in isolation.

#### Backend Unit Tests

- **Framework**: Jest
- **Location**: `theredit_be/src/**/*.spec.ts`
- **Command**: `npm run test`

#### Frontend Unit Tests

- **Framework**: Jest with React Testing Library
- **Location**: `theredit_fe/src/**/*.test.tsx`
- **Command**: `npm run test`

### 2. Integration Testing

Integration tests verify that components work together correctly.

#### Backend Integration Tests

- **Framework**: Jest with Supertest
- **Location**: `theredit_be/test/**/*.e2e-spec.ts`
- **Command**: `npm run test:e2e`

#### Frontend Integration Tests

- **Framework**: Cypress
- **Location**: `theredit_fe/cypress/integration/**/*.spec.ts`
- **Command**: `npm run cypress:run`

### 3. End-to-End Testing

End-to-end tests verify that the entire application works correctly from a user's perspective.

- **Framework**: Cypress
- **Location**: `theredit_fe/cypress/e2e/**/*.spec.ts`
- **Command**: `npm run cypress:run`

### 4. Performance Testing

Performance tests verify that the application meets performance requirements.

- **Tools**: Lighthouse, WebPageTest
- **Metrics**: First Contentful Paint, Time to Interactive, Total Blocking Time, Cumulative Layout Shift

### 5. Accessibility Testing

Accessibility tests verify that the application is accessible to users with disabilities.

- **Tools**: axe-core, Lighthouse
- **Standards**: WCAG 2.1 AA

### 6. Security Testing

Security tests verify that the application is secure against common vulnerabilities.

- **Tools**: OWASP ZAP, npm audit
- **Vulnerabilities**: XSS, CSRF, Injection, Broken Authentication

## Test Cases

### Frontend Test Cases

#### Character List Page

1. **Display Character List**
   - **Steps**:
     1. Navigate to the home page
   - **Expected Result**:
     - Character list is displayed with character cards
     - Pagination controls are displayed if there are multiple pages

2. **Search for Character**
   - **Steps**:
     1. Navigate to the home page
     2. Enter a search term in the search box
   - **Expected Result**:
     - Character list updates to show only characters matching the search term
     - "No characters found" message is displayed if no characters match

3. **Pagination**
   - **Steps**:
     1. Navigate to the home page
     2. Click the "Next" button
   - **Expected Result**:
     - Next page of characters is displayed
     - Page number updates in the pagination controls

4. **Character Card Navigation**
   - **Steps**:
     1. Navigate to the home page
     2. Click on a character card
   - **Expected Result**:
     - User is navigated to the character detail page for the selected character

#### Character Detail Page

1. **Display Character Details**
   - **Steps**:
     1. Navigate to a character detail page
   - **Expected Result**:
     - Character name is displayed as the page title
     - Personal information, physical attributes, films, homeworld, and species are displayed

2. **Back Navigation**
   - **Steps**:
     1. Navigate to a character detail page
     2. Click the "Back to all characters" button
   - **Expected Result**:
     - User is navigated back to the character list page

3. **Loading States**
   - **Steps**:
     1. Navigate to a character detail page with a slow network connection
   - **Expected Result**:
     - Loading spinner is displayed while character data is being fetched
     - Character details are displayed once data is loaded

### Backend Test Cases

#### Character List API

1. **Get All Characters**
   - **Request**: `GET /characters`
   - **Expected Response**:
     - Status: 200
     - Body: JSON object with characters array, total count, next, and previous links

2. **Search Characters**
   - **Request**: `GET /characters?search=Luke`
   - **Expected Response**:
     - Status: 200
     - Body: JSON object with characters array matching the search term

3. **Pagination**
   - **Request**: `GET /characters?page=2`
   - **Expected Response**:
     - Status: 200
     - Body: JSON object with the second page of characters

#### Character Detail API

1. **Get Character by ID**
   - **Request**: `GET /characters/1`
   - **Expected Response**:
     - Status: 200
     - Body: JSON object with character details

2. **Get Non-existent Character**
   - **Request**: `GET /characters/999`
   - **Expected Response**:
     - Status: 404
     - Body: Error message indicating character not found

## Acceptance Criteria

### Functional Requirements

1. Users can view a list of Star Wars characters
2. Users can search for characters by name
3. Users can navigate between pages of characters
4. Users can view detailed information about a character
5. Users can navigate back to the character list from the character detail page

### Non-functional Requirements

1. **Performance**:
   - The application loads within 3 seconds on a 3G connection
   - Search results appear within 500ms of the user stopping typing

2. **Accessibility**:
   - The application is accessible to users with disabilities (WCAG 2.1 AA)
   - The application works with keyboard navigation

3. **Responsiveness**:
   - The application is usable on devices with screen widths from 320px to 1920px

4. **Browser Compatibility**:
   - The application works on the latest versions of Chrome, Firefox, Safari, and Edge

## Test Execution and Reporting

### Test Execution Process

1. Run unit tests before each commit
2. Run integration tests before each pull request
3. Run end-to-end tests before each deployment to staging
4. Run performance and accessibility tests before each deployment to production

### Test Reporting

- Unit and integration test results are reported to the CI/CD pipeline
- End-to-end test results are reported to the CI/CD pipeline and stored as artifacts
- Performance and accessibility test results are stored as artifacts and reported to the team

## Defect Management

### Defect Lifecycle

1. **Identification**: Defect is identified during testing
2. **Reporting**: Defect is reported in the issue tracking system
3. **Triage**: Defect is prioritized and assigned
4. **Resolution**: Defect is fixed
5. **Verification**: Fix is verified
6. **Closure**: Defect is closed

### Defect Severity Levels

1. **Critical**: Application crash, data loss, security vulnerability
2. **Major**: Functionality broken, workaround not available
3. **Minor**: Functionality broken, workaround available
4. **Trivial**: Cosmetic issues, typos

## Test Automation

### Continuous Integration

- Unit tests and integration tests are run on every pull request
- End-to-end tests are run on every merge to the main branch
- Performance and accessibility tests are run on every deployment to staging

### Test Data Management

- Test data is generated programmatically
- Test data is reset before each test run
- Test data is isolated between test runs
