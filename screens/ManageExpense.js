import { useContext, useLayoutEffect,useState } from 'react'
import {Text, View, StyleSheet} from 'react-native'
import ExpenseForm from '../Components/ManageExpenses/ExpenseForm'
import { ExpenseContext } from '../store/expense-context'
import Button from '../UI/Button'
import ErrorOverlay from '../UI/ErrorOverlay'
import IconButton from '../UI/IconButton'
import LoadingOverlay from '../UI/LoadingOverlay'
import { deleteExpense, StoreExpenses, updateExpense } from '../util/http'

import {GlobalStyles} from './../constants/styles'

function ManageExpenses({route, navigation}){

    const expenseContext = useContext(ExpenseContext)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const EditedId = route.params?.expenseId
    const isEdited = !!EditedId

    const SelectedValue = expenseContext.expenses.find((expense)=>{ return expense.id === EditedId})
    
    useLayoutEffect( ()=>{
        navigation.setOptions({
            title: isEdited?'Edit Expense': 'Add Expense'
        })
    },[] )

    async function DeletePressHandler(){
        setIsLoading(true)
        try {
            await deleteExpense(EditedId)
            expenseContext.deleteExpense(EditedId)
            navigation.goBack()
        } catch (error) {
            setError('Could not delete expense')
            setIsLoading(false)
        }
    }

    function CancelHandler(){
        navigation.goBack()
    }

    async function ConfirmHandler(expenseData){
        setIsLoading(true)
        try {
            if(isEdited){
                expenseContext.updateExpense(EditedId,expenseData)
                await updateExpense(EditedId,expenseData)
            }else{
                const id = await StoreExpenses(expenseData)
                expenseContext.addExpense({...expenseData, id: id})
            }
            navigation.goBack()
            
        } catch (error) {
            setError('Error, could not save data')
            setIsLoading(false)
        }
    }

    function errorHandler(){
        setError(null)
    }

    if(error && !isLoading){
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if(isLoading){
        return <LoadingOverlay />
    }

    return <>
        <View style={styles.container}>
            <ExpenseForm 
                onSubmit={ConfirmHandler} 
                submitButtonLabel={isEdited?'Update':'Add'} 
                onCancel={CancelHandler} 
                DefaultValue={SelectedValue}
            />
            {isEdited && 
                <View style={styles.deleteContainer} >
                    <IconButton 
                        name='trash' 
                        size={36} 
                        color={GlobalStyles.colors.error500}
                        pressed={DeletePressHandler}
                    /> 
                </View>
            }
        </View>
    </>
}

export default ManageExpenses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary200
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: 8,
        minWidth: 120,
    },
    deleteContainer: {
        marginTop: 8,
        paddingTop: 8,
        borderTopColor: GlobalStyles.colors.primary800,
        borderTopWidth: 2,
        alignItems: 'center'
    },
  });
  