import { FlatList, Text, View } from "react-native"
import ExpenseItem from "./ExpenseItem"

function ExpensesList({expenses}){

    function RenderItemHandler(itemData){
        return <ExpenseItem {...itemData.item} />
    }

    return <>
        <View>
            <FlatList data={expenses} renderItem={RenderItemHandler} keyExtractor={(item)=>item.id} />
        </View>
    </>
}

export default ExpensesList