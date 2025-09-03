import { useState, useReducer, useEffect } from "react";
import "./App.css";

// components imports
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";

// react toasts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import firebase methods here
import {
  doc,
  collection,
  addDoc,
  setDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebaseInit";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "GET_EXPENSES": {
      return {
        expenses: payload.expenses,
      };
    }
    case "ADD_EXPENSE": {
      return {
        expenses: [payload.expense, ...state.expenses],
      };
    }
    case "REMOVE_EXPENSE": {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id),
      };
    }
    case "UPDATE_EXPENSE": {
      const expensesDuplicate = state.expenses;
      expensesDuplicate[payload.expensePos] = payload.expense;
      return {
        expenses: expensesDuplicate,
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);

  const getData = () => {
    const unsubscribe = onSnapshot(
      collection(db, "expenses"),
      (snapshot) => {
        const expenses = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch({ type: "GET_EXPENSES", payload: { expenses } });
        // toast.success("Expenses retrieved successfully.");
      },
      (error) => {
        console.error("Error fetching expenses:", error);
        toast.error("Failed to retrieve expenses.");
      }
    );

    // Return unsubscribe function to clean up listener when component unmounts
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getData();
    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  const addExpense = async (expense) => {
    const expenseRef = collection(db, "expenses");
    console.log("expenseRef", expenseRef);
    const docRef = await addDoc(expenseRef, expense);

    dispatch({
      type: "ADD_EXPENSE",
      payload: { expense: { id: docRef.id, ...expense } },
    });
    toast.success("Expense added successfully.");
  };

  const deleteExpense = async (id) => {
    try {
      const expenseRef = doc(db, "expenses", id);
      await deleteDoc(expenseRef);

      dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
      toast.success("Expense deleted successfully.");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    }
  };

  const resetExpenseToUpdate = () => {
    setExpenseToUpdate(null);
  };

  const updateExpense = async (expense) => {
    const expensePos = state.expenses
      .map(function (exp) {
        return exp.id;
      })
      .indexOf(expense.id);

    if (expensePos === -1) {
      return false;
    }

    const expenseRef = doc(db, "expenses", expense.id);
    await setDoc(expenseRef, expense);

    dispatch({ type: "UPDATE_EXPENSE", payload: { expensePos, expense } });
    toast.success("Expense updated successfully.");
  };

  return (
    <>
      <ToastContainer />
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm
          addExpense={addExpense}
          expenseToUpdate={expenseToUpdate}
          updateExpense={updateExpense}
          resetExpenseToUpdate={resetExpenseToUpdate}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            changeExpenseToUpdate={setExpenseToUpdate}
          />
        </div>
      </div>
    </>
  );
}

export default App;
