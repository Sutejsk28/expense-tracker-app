import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'

import ManageExpenses from './screens/ManageExpense';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './UI/IconButton';
import ExpenseContextProvioder from './store/expense-context';

const stack = createNativeStackNavigator()
const bottomTab = createBottomTabNavigator()

function ExpensesTab(){
  return <>
    
      <bottomTab.Navigator screenOptions={ ({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor})=>{
          return (<IconButton 
            name='add' size={28} 
            color={tintColor} 
            pressed={()=>{
              navigation.navigate('ManageExpenses')
            }} 
          />)
        }
      })}>
        <bottomTab.Screen 
          name='RecentExpenses' 
          component={RecentExpenses} 
          options={{
            title: 'Recent Expenses', 
            tabBarLabel: 'Recent', 
            tabBarIcon: ({color, size})=><Ionicons name='hourglass' color={color} size={size} />
          }}
        />
        <bottomTab.Screen 
          name='AllExpenses' 
          component={AllExpenses} 
          options={{
            title: 'All Expenses', 
            tabBarLabel: 'All Expenses', 
            tabBarIcon: ({color, size})=><Ionicons name='calendar' color={color} size={size} />
          }}
        />
      </bottomTab.Navigator>
   
  </>
}

export default function App() {
  return (
    <>
    <ExpenseContextProvioder>
      <NavigationContainer>
        <stack.Navigator 
          screenOptions={
            {
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white',
            }
          }>
          <stack.Screen 
            name='ExpensesTab' 
            component={ExpensesTab} 
            options={
              {headerShown: false}
              } 
          />
          <stack.Screen name='ManageExpenses' component={ManageExpenses} options={{title: 'Manage Expenses'}} />
        </stack.Navigator>
      </NavigationContainer>
      </ExpenseContextProvioder>
    </>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
