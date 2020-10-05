// import React, {Component} from 'react';
// import firebase from 'react-native-firebase'
// import {Container} from '../../default/'

// var emergency_numbers = [];
// var flag_emergency=0;

// export default class EmptyLoad extends Component{
//     constructor(props){
//         super(props);
//         this.takeEmergencyNumbers();
//     }
//     takeEmergencyNumbers(){
//         console.log("Flag ", flag_emergency)
//         if(flag_emergency==0){
//             emergency_numbers.pop();
//             console.log("popped..", emergency_numbers);
//             let userID = firebase.auth().currentUser.uid;
//             var dbref = firebase.database().ref(`users/patients/${userID}/EmergencyContacts/`);
//             dbref.on("value", function(snapshot){
//                 snapshot.forEach(function(data){
//                     emergency_numbers.push(data.val())
//                 })  
//                 console.log("snapshot emergency numbers... ", emergency_numbers)
//             })
//             if(emergency_numbers!==undefined || emergency_numbers!==null){
//                 console.log("eeeeeeeee", emergency_numbers)
//                 this.props.navigation.navigate("Emergency",{emergencynumbers:emergency_numbers})            }
//         }
//         else if(emergency_numbers!=undefined || emergency_numbers!=null){
//             this.props.navigation.navigate("Emergency",{emergencynumbers:emergency_numbers})
//         }
//     }
//     render(){
//         return(
//             <Container>
//             </Container>
//         )
//     }
// }