import { useContext } from 'react'
import {Text} from 'react-native'
import ExpensesOutput from '../Components/ExpensesOutput/ExpensesOutput'

import {ExpenseContext} from '../store/expense-context'

function AllExpenses(){

    const expenseContext = useContext(ExpenseContext)
    return <>
        <ExpensesOutput 
            expenses={expenseContext.expenses} 
            period='Total' 
            fallbackText="You have no expenses registered yet!"
        />
    </>
}

export default AllExpenses