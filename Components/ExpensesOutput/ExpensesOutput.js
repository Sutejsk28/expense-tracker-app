import {StyleSheet,Text, View} from 'react-native'

import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"


function ExpensesOutput({expenses, period, fallbackText}){

    let content = <Text style={styles.fallbackText}>{fallbackText}</Text>

    if(expenses.length>0){
        content = <ExpensesList expenses={expenses} />
    }

    return <>
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} period={period} />
            {content}
        </View>
    </>
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 74, 
    },
    fallbackText: {
        fontSize: 16,
        marginTop: 32,
        textAlign: 'center'
    }
  });