import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({label, style, textInputConfig, invalid}){

    const inputStyles = [styles.input]


    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.multiline)
    }


    if(invalid){
        inputStyles.push(styles.invalidInput)
    }

    return <View style={[styles.inputContainer, style]}>
        <Text style={[styles.label, invalid && styles.invalidLabel]} >{label}</Text>
        <TextInput style={styles.input} {...textInputConfig} />
    </View>
}

export default Input


const styles =StyleSheet.create({

    inputContainer: {
        backgroundColor: GlobalStyles.colors.primary200,
        marginHorizontal: 16,
        marginVertical: 16,
    },
    label: {
        color: GlobalStyles.colors.primary700,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    input: {
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        backgroundColor: 'white'
    },
    multiline: {
        minHeight: 100,
        textAlignVertical: 'top',

    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
})