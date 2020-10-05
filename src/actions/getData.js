import firebase from 'react-native-firebase'

export const getData = () => {
    console.log("getData action.. ")
    return(dispatch) => {
        var uc_data = []
        var obj1 = [];
        var i = 0; 
        var dbref = firebase.database().ref(`users/urgentcare/`);
        dbref.on("value", function(snapshot){
            snapshot.forEach(function(data){
                uc_data.push(data.val())
                console.log("snapshot urgent care... ", uc_data)
            })
        })
        dispatch({
            type:'data_accessed',
            payload: uc_data
        })
    }
}