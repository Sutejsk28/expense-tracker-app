import axios from 'axios'

const BACKEND_URL = "https://expense-tracker-app-74441-default-rtdb.firebaseio.com"

export async function StoreExpenses(expensesData){
    const response = await axios.post(BACKEND_URL+'/expenses.json',
        expensesData
    )
    const id = response.data.name
    return id
}

export async function fetchExpenses(){
    const response = await axios.get(BACKEND_URL+'/expenses.json')

    const expenses = []

    for(const key in response.data){
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj)
    }
    return expenses
}

export function updateExpense(id, expensesData){
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expensesData)
}

export function deleteExpense(id){
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}