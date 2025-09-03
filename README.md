# 💰 Expense Tracker

A real-time expense tracking application built with React and Firebase. Track your income and expenses with live updates across all devices.

## 🚀 Features

- **Real-time Data Sync** - Changes reflect instantly across all connected devices
- **Income & Expense Tracking** - Use positive values for income, negative for expenses
- **Live Balance Calculation** - Automatic calculation of total balance, income, and expenses
- **CRUD Operations** - Add, edit, delete, and view transactions
- **Interactive UI** - Hover effects and smooth animations
- **Persistent Storage** - Data stored securely in Firebase Firestore
- **Toast Notifications** - User feedback for all operations
- **Responsive Design** - Works seamlessly on all device sizes

## 🛠️ Tech Stack

- **Frontend**: React, CSS Modules
- **Backend**: Firebase Firestore
- **State Management**: useReducer Hook
- **Notifications**: React Toastify
- **Styling**: CSS Modules with modern design patterns

## 📁 Project Structure

```
src/
├── App.js                 # Main application component
├── firebaseInit.js        # Firebase configuration
├── components/
│   ├── ExpenseForm/       # Add/Edit expense form
│   ├── ExpenseInfo/       # Balance and summary display
│   ├── ExpenseList/       # Transaction list container
│   └── Transaction/       # Individual transaction item
└── images/                # Edit and delete icons
```

## 🧩 Component Architecture

### 📋 App.js (Main Component)
The central hub that manages application state and Firebase operations.

**Key Responsibilities**:
- State management using `useReducer`
- Firebase real-time listeners
- CRUD operation handlers
- Component coordination

**State Actions**:
- `GET_EXPENSES` - Load all expenses from Firebase
- `ADD_EXPENSE` - Add new expense to state
- `REMOVE_EXPENSE` - Remove expense by ID
- `UPDATE_EXPENSE` - Update existing expense

### 📝 ExpenseForm Component
Dual-purpose form for adding new transactions and editing existing ones.

**Features**:
- Smart form switching (Add/Edit modes)
- Input validation (prevents zero amounts)
- Auto-populate fields when editing
- Form reset after submission
- Support for both income (+) and expenses (-)

**Props**:
- `addExpense` - Function to add new expense
- `expenseToUpdate` - Expense object to edit (null for add mode)
- `updateExpense` - Function to update existing expense
- `resetExpenseToUpdate` - Reset edit mode

### 📊 ExpenseInfo Component
Financial dashboard displaying balance summary and breakdowns.

**Calculations**:
- **Total Balance**: Sum of all transactions
- **Total Income**: Sum of positive amounts
- **Total Expenses**: Sum of negative amounts (displayed as positive)

**Features**:
- Real-time balance updates
- Color-coded income (green) and expenses (red)
- Formatted currency display

**Props**:
- `expenses` - Array of all expense objects

### 📄 ExpenseList Component
Container component that renders the list of all transactions.

**Features**:
- Maps over expenses array
- Passes necessary props to Transaction components
- Clean list layout with proper key management

**Props**:
- `expenses` - Array of expense objects
- `deleteExpense` - Function to delete expense
- `changeExpenseToUpdate` - Function to set expense for editing

### 💳 Transaction Component
Individual transaction item with interactive features and actions.

**Features**:
- Hover effects revealing action buttons
- Color-coded based on transaction type (income/expense)
- Smooth animations and transitions
- Edit and delete functionality

**Interactive Elements**:
- Edit button - Opens expense in form for editing
- Delete button - Removes transaction
- Amount slides on hover for better UX

**Props**:
- `expense` - Individual expense object
- `deleteExpense` - Delete function
- `changeExpenseToUpdate` - Edit function
- `index` - Position in list for hover effects

## 🔥 Firebase Integration

This application uses Firebase Firestore for real-time data persistence. Here's how each Firestore function is utilized:

### 📚 Firestore Functions

#### `collection(db, "expenses")`
**Purpose**: References the "expenses" collection in Firestore
**Usage**: Creates a reference to perform operations on the expenses collection
```javascript
const expenseRef = collection(db, "expenses");
```

#### `addDoc(collectionRef, data)`
**Purpose**: Adds a new document to a collection with auto-generated ID
**Usage**: Adding new expenses to the database
```javascript
const docRef = await addDoc(expenseRef, expense);
// Returns document reference with auto-generated ID
```

#### `doc(db, "expenses", id)`
**Purpose**: References a specific document by ID within a collection
**Usage**: Targeting specific expenses for update or delete operations
```javascript
const expenseRef = doc(db, "expenses", expenseId);
```

#### `setDoc(documentRef, data)`
**Purpose**: Sets/overwrites data in a specific document
**Usage**: Updating existing expense records
```javascript
await setDoc(expenseRef, updatedExpense);
// Completely replaces document content
```

#### `deleteDoc(documentRef)`
**Purpose**: Deletes a specific document from the collection
**Usage**: Removing expenses from the database
```javascript
await deleteDoc(expenseRef);
// Permanently removes the document
```

#### `onSnapshot(collectionRef, callback)`
**Purpose**: Sets up real-time listener for collection changes
**Usage**: Automatic UI updates when database changes occur
```javascript
const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
  // Automatically triggered on any database changes
  const expenses = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  // Update local state with new data
});
```

**Benefits of Real-time Listeners**:
- Instant synchronization across all connected clients
- No need for manual refresh
- Automatic conflict resolution
- Offline support with sync when back online

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
```bash
git clone "REPOSITORY URL"
cd expense-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Copy your Firebase config to `src/firebaseInit.js`

4. **Configure Firestore Security Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Configure based on your needs
    }
  }
}
```

5. **Start the development server**
```bash
npm start
```

## 📱 Usage

1. **Adding Income**: Enter description and positive amount (e.g., +500 for salary)
2. **Adding Expense**: Enter description and negative amount (e.g., -50 for groceries)
3. **Editing Transaction**: Hover over transaction and click edit icon
4. **Deleting Transaction**: Hover over transaction and click delete icon
5. **View Summary**: Balance, income, and expense totals update automatically
