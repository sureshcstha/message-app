# Message App

A **React** app for sharing and managing messages, built with Vite, Redux Toolkit, and Tailwind CSS. It uses **Redux Toolkit** for state management, **redux-persist** for persisting auth state, and **Tailwind CSS** for styling. The app supports user authentication, password management, and CRUD operations for messages, with role-based access control.

## Live Demo

The app is hosted on Netlify and available at:  
[https://luvnotes.netlify.app](https://luvnotes.netlify.app)

## 📸 Screenshots
![Message App login page](/src/assets/luvnotes-login-page.png "This shows screenshot of the login page")
![Message App home page](/src/assets/luvnotes-home-page.png "This shows screenshot of the home page")
![Message App profile page](/src/assets/luvnotes-profile-page.png "This shows screenshot of the user profile page")

## Features

- **User authentication**: Signup, login, password reset/change, logout
- **Role-based access**: Protected routes for contributors, editors, admins, superadmins
- **Messages**: Add, edit, delete, like, and copy messages
- **Categories**: Filter messages by category
- **UI**: Responsive UI with Tailwind CSS, toast notifications, loading spinners, pagination, scroll-to-top button

## Async Actions with Thunks

This app uses Redux Toolkit's `createAsyncThunk` to handle asynchronous operations such as API requests for authentication and message management. Thunks allow the app to dispatch actions based on the result of these requests (loading, success, error), keeping the UI state in sync with backend data.

## How It Works

1. **Sign Up or Log In:**  
   Create an account or log in to access message features.

2. **Browse Messages:**  
   View, and filter messages by category. Use pagination to navigate through messages.

3. **Add, Edit, or Delete Messages:**
   Authenticated users can add new messages or edit messages.

4. **Like and Copy Messages:**  
   Like messages to show appreciation or copy message text to share elsewhere.

5. **Manage Account:**  
   Change your password, reset it if forgotten, or log out securely.

6. **Role-Based Access:**  
   Contributor, editor, admin, and superadmin roles have different permissions for managing messages and categories.


## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```
git clone https://github.com/sureshcstha/message-app.git
cd message-app
npm install
```

### Project Structure
- `src/App.jsx` – Main app router and layout
- `src/main.jsx` - Entry point, Redux and persistence setup
- `src/app/store.js` – Redux store configuration
- `src/features/auth/authService.js` – Handles all authentication-related API calls and token management for the app
- `src/features/auth/authSlice.js` – Manages authentication state in Redux. It handles user signup, login, logout, password actions, and token refresh, updating the state based on API responses.
- `src/pages/` – All main pages (login, signup, messages, admin, etc.)
- `src/components/` – Reusable UI components
- `src/hooks/useMessages.js` – Custom hook for message/category API calls
- `src/layouts/MainLayout.jsx` – App layout with navbar and toast container
- `src/utils/helpers.js` – Utility functions (e.g., capitalize)

## Environment Variables
Create a .env file with:
```
VITE_API_BASE_URL=<your-api-url>
VITE_PAGINATION_LIMIT=30
```
## API
This app utilizes the [flirt-api](https://github.com/sureshcstha/flirt-api) for all backend operations, including authentication, message management, and category features.

## Author
Developed by Suresh Shrestha — feel free to reach out at sureshshr91@gmail.com
