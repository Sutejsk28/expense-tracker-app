import { useContext, useEffect, useRef, useState } from 'react'
import {Text} from 'react-native'
import ExpensesOutput from '../Components/ExpensesOutput/ExpensesOutput'
import { ExpenseContext } from '../store/expense-context'
import ErrorOverlay from '../UI/ErrorOverlay'
import LoadingOverlay from '../UI/LoadingOverlay'
import { fetchExpenses } from '../util/http'
import { getDateMinusDays } from '../util/util'

function RecentExpenses(){

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    useEffect( ()=>{
        async function getExpenses(){
            try{
                const expenses = await fetchExpenses()
                expenseContext.setExpense(expenses)
            }catch(error){
                setError('Error , data could not be fetched')
            }
        }
        return getExpenses
    },[] )

    function errorHandler(){
        setError(null)
    }

    if(error && !isLoading){
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if(isLoading){
        return <LoadingOverlay />
    }

    const expenseContext = useContext(ExpenseContext)

    const recentExpenses = expenseContext.expenses.filter( (expense)=>{
        const today = new Date()
        const date7DaysAgo = getDateMinusDays(today, 7)
        return expense.date>=date7DaysAgo
    } )

    return <>
        <ExpensesOutput 
            expenses={recentExpenses} 
            period='Last 7 Days'
            fallbackText="No expenses registed in the last 7 days" />
    </>
}

export default RecentExpenses