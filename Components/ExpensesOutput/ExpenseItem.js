import { useNavigation } from "@react-navigation/native";
import { Text, View,StyleSheet, Pressable } from "react-native"
import { GlobalStyles } from "../../constants/styles";
import { getDateFormatted } from "../../util/util";

function ExpenseItem({id, description, amount, date}){

    const navigation = useNavigation()

    function ExprensePressHandler(){
        navigation.navigate('ManageExpenses', {
            expenseId: id,
        })
    }

    return <>
        <Pressable onPress={ExprensePressHandler} android_ripple='#ccc' style={({pressed})=>{pressed && styles.pressed}}>
            <View style={styles.expenseItem} >
                <View>
                    <Text style={[styles.description, styles.textBase]} >{description}</Text>
                    <Text style={styles.textBase} >{getDateFormatted(date)}</Text>
                </View>
                <View style={styles.amountContainer} >
                    <Text style={styles.amount} >{amount}</Text>
                </View>
            </View>
        </Pressable>
    </>
}

export default ExpenseItem

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    expenseItem: {
        padding: 12,
        margin: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 4,
        shadowColor: GlobalStyles.colors.gray500,
        shadowOffset: {width: 1,height:1},
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 4,
        minWidth: 80,
        alignItems: 'center',
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    },
  });