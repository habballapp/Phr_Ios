import React from 'react'
import {Container} from './Container'
import Icon from 'react-native-vector-icons/Ionicons'

export const Checkbox = () => {
    return(
        <Container ContainerStyle={{height:20,width:20, borderColor:'black', borderWidth:1, marginRight:25, marginTop:5, alignItems:'center',justifyContent:'center'}}>
            <Icon name="md-checkmark" style={{alignSelf:'center',color: 'black', fontSize: 20}}/>    
        </Container>
    )
}