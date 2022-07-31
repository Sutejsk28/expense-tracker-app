import { Pressable, View, StyleSheet } from "react-native"
import {Ionicons} from '@expo/vector-icons'

function IconButton({name, color, size, pressed}){
    return <>
        <Pressable onPress={pressed} style={(pressed)=>{pressed && styles.pressed}}>
            <View>
                <Ionicons name={name} color={color} size={size} />
            </View> 
        </Pressable>
    </>
}

export default IconButton

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        marginHorizontal: 12,
        marginVertical:2,
        padding: 12,
    },
    pressed: {
        opacity: 0.7,
    },
  });
  