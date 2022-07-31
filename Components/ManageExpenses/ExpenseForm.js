import { useState } from "react";
import { View,StyleSheet, Alert, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "../../UI/Button";
import { getDateFormatted } from "../../util/util";

import Input from "./Input";

function ExpenseForm({onCancel, onSubmit , submitButtonLabel, DefaultValue}){

    const [inputs, setInputs] = useState({
        amount: {value: DefaultValue ? DefaultValue.amount.toString() : '', isValid: true},
        date: {value: DefaultValue ? getDateFormatted(DefaultValue.date) : '', isValid: true},
        description: {value: DefaultValue ? DefaultValue.description  : '', isValid: true}
    })

    function inputValueChangeHandler(inputIdentifier,enteredValue){
        setInputs((curInputValue)=>{
            return {
                ...curInputValue,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        })
    }

    function SubmitHandler(){
        const expenseData= {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        amountIsValid = !isNaN(expenseData.amount) && expenseData.amount>0
        dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        descriptionIsValid = expenseData.description.trim().length > 0 

        if( !amountIsValid || !dateIsValid || !descriptionIsValid ){
            setInputs((curInputValue)=>{
                return {
                    amount: {value: curInputValue.amount.value, isValid: amountIsValid},
                    date: {value: curInputValue.date.value, isValid: dateIsValid},
                    description: {value: curInputValue.description.value, isValid: descriptionIsValid},

                }
            })
            return
        }
        onSubmit(expenseData)
    }

    const isFormInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return <View style={styles.container}>
        <View style={styles.inputRow} > 
            <Input 
                style={styles.rowInput} 
                label="Amount" 
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputValueChangeHandler.bind(this, 'amount'),
                    value: inputs.amount.value
                }}  
                invalid={!inputs.amount.isValid}
            />
            <Input 
                style={styles.rowInput} 
                label="Date" 
                textInputConfig={{
                    placeholder: "YYYY/MM/DD",
                    maxLength: 10,
                    onChangeText: inputValueChangeHandler.bind(this, 'date'),
                    value: inputs.date.value
                }} 
                invalid={!inputs.date.isValid}
            />
        </View>
        <Input 
            label="Description" 
            textInputConfig={{
                multiline: true,
                onChangeText: inputValueChangeHandler.bind(this, 'description'),
                value: inputs.description.value
            }} 
            invalid={!inputs.description.isValid}
        />
        {isFormInvalid && <Text style={styles.errorText} >Entered data is invalid, please check!</Text>}
        <View style={styles.buttons} >
            <Button style={styles.button} mode='flat' pressed={onCancel} >Cancel</Button>
            <Button style={styles.button} pressed={SubmitHandler} >{submitButtonLabel}</Button>
        </View>
    </View>
}

export default ExpenseForm

const styles =StyleSheet.create({
    container: {
        backgroundColor: GlobalStyles.colors.primary200,
        paddingTop: 64,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
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
})