import { createContext, useReducer } from "react";

// const DummyExpenses = [
//     {
//         id: 'e1',
//         description: "Expenses 1",
//         amount: 50,
//         date: new Date('2022-06-01')
//     },
//     {
//         id: 'e2',
//         description: "Expenses 2",
//         amount: 500,
//         date: new Date('2022-07-22')
//     },
//     {
//         id: 'e3',
//         description: "Expenses 3",
//         amount: 550,
//         date: new Date('2022-07-23')
//     },
//     {
//         id: 'e4',
//         description: "Expenses 4",
//         amount: 450,
//         date: new Date('2022-07-14')
//     },
//     {
//         id: 'e5',
//         description: "Expenses 5",
//         amount: 504,
//         date: new Date('2022-06-07')
//     },
//     {
//         id: 'e6',
//         description: "Expenses 6",
//         amount: 50,
//         date: new Date('2022-06-01')
//     },
//     {
//         id: 'e7',
//         description: "Expenses 7",
//         amount: 500,
//         date: new Date('2022-07-22')
//     },
//     {
//         id: 'e8',
//         description: "Expenses 8",
//         amount: 550,
//         date: new Date('2022-07-23')
//     },
//     {
//         id: 'e9',
//         description: "Expenses 9",
//         amount: 450,
//         date: new Date('2022-06-01')
//     },
//     {
//         id: 'e10',
//         description: "Expenses 10",
//         amount: 504,
//         date: new Date('2022-06-01')
//     },
// ]

export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date})=>{},
    setExpense: (expenses)=>{},
    deleteExpense: (id)=>{},
    updateExpense: (id , {description, amount, date})=>{},
})

function expenseReducer(state, action){
    switch(action.type){
        case 'ADD': 
            // const id = new Date().toString + Math.random().toString
            return [action.payload, ...state]
        case 'SET': 
            const inverted = action.payload.reverse()
            return inverted
        case 'DELETE':
            return state.filter( (expense)=>{return expense.id !== action.payload} )
        case 'UPDATE': 
            const updateExpenseIndex = state.findIndex( (expense)=> {
                return expense.id === action.payload.id
            } )
            const updatableExpense = state[updateExpenseIndex]
            const updateItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses = [...state]
            updatedExpenses[updateExpenseIndex] = updateItem
            return updatedExpenses
        default: 
            return state
    }
}

  
  function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expenseReducer, []);
  
    function addExpense(expenseData) {
      dispatch({ type: 'ADD', payload: expenseData });
    }

    function setExpense(expenses){
        dispatch({type: 'SET', payload: expenses});
    }
  
    function deleteExpense(id) {
      dispatch({ type: 'DELETE', payload: id });
    }
  
    function updateExpense(id, expenseData) {
      dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    }
  
    const value = {
      expenses: expensesState,
      addExpense: addExpense,
      setExpense: setExpense,
      deleteExpense: deleteExpense,
      updateExpense: updateExpense,
    };
  
    return (
      <ExpenseContext.Provider value={value}>
        {children}
      </ExpenseContext.Provider>
    );
  }
export default ExpensesContextProvider


// export const ExpensesContext = createContext({
//     expenses: [],
//     addExpense: ({ description, amount, date }) => {},
//     deleteExpense: (id) => {},
//     updateExpense: (id, { description, amount, date }) => {},
//   });
  
  // function expensesReducer(state, action) {
  //   switch (action.type) {
  //     case 'ADD':
  //       const id = new Date().toString() + Math.random().toString();
  //       return [{ ...action.payload, id: id }, ...state];
  //     case 'UPDATE':
  //       const updatableExpenseIndex = state.findIndex(
  //         (expense) => expense.id === action.payload.id
  //       );
  //       const updatableExpense = state[updatableExpenseIndex];
  //       const updatedItem = { ...updatableExpense, ...action.payload.data };
  //       const updatedExpenses = [...state];
  //       updatedExpenses[updatableExpenseIndex] = updatedItem;
  //       return updatedExpenses;
  //     case 'DELETE':
  //       console.log("Inside DELETE ")
  //       return state.filter((expense) => expense.id !== action.payload);
  //     default:
  //       return state;
  //   }
  // }