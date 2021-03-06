import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';
import { styles } from '../Login/login_styles';
import { Header, Title, Accordion } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Container, Textview, Scrollview, Input, Button, SafeViewArea, Statusbar } from '../../default';
import { Text } from 'react-native';
import { Separator } from 'native-base';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import { FloatingAction } from "react-native-floating-action";

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


const actions = [
  {
    text: "Add Reminder",
    icon: require("../../../assets/reminder.png"),
    name: "AddReminders",
    position: 1,
    color: '#48AE2D'


  }

];


var userUID = '';
var B_Email = '';
var B_EmergencyAddress = '';
var url = '';
var url1 = '';
var val1 = '';
var dataArray = []


// GET TODAY DATE 
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
todayDate = yyyy + '-' + mm + '-' + dd;


// GET NEXT 3 DAYS DATE
var next3Days = new Date();
next3Days.setDate(new Date().getDate() + 3);
var dd = String(next3Days.getDate()).padStart(2, '0');
var mm = String(next3Days.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = next3Days.getFullYear();
next3DaysDate = yyyy + '-' + mm + '-' + dd;

export default class Reminders extends Component {
  constructor(props) {
    super(props);


    this.state = {

      date: "2020-08-15",
      tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
      loading: false,
      widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200],
      url: '',
      url1: '',

      B_Email: '',
      B_EmergencyAddress: '',
      tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
      tableData: [
        ['1', '2', '3', '4'],
        ['aaskdsadskjdsahjdajsdh', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
      ],
      list: [
        {
          id: 1,
          title: 'View Reminders',
          tableHead: ['Date', 'Time', 'Appointment', 'Name', 'Address', 'PhoneNo'],
          widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200],
          tableData: [
          ],
          body: 'React native Accordion/Collapse component, very good to use in toggles & show/hide content'
        },

      ],
    }
  }


  takeData() {



    console.log("into takeData()")
    userUID = firebase.auth().currentUser.uid;
    console.log("uid of users....", userUID)
    var refr = firebase.database().ref('Register_User/' + userUID + '/AddReminders/')
    this.setState({ loading: true }, () => { });
    refr.on("value", (snapshot) => {
      this.state.list[0].tableData = [];
      snapshot.forEach((data) => {

        val1 = data.val();
        // dataArray.push(val1);

        let backgroundColor = '#ffffff';

      if (val1.Date >= todayDate && val1.Date <= next3DaysDate) {
        backgroundColor = '#f8fc7b';
      } else if (val1.Date < todayDate) {
        backgroundColor = '#94f76a';
      }

        const bio_data = [


          data.val().Date,
          data.val().Time,
          data.val().Appointment,
          data.val().Name,
          data.val().Address,
          data.val().PhoneNo,




        ];
        dataArray.push(backgroundColor)
        this.state.list[0].tableData.push(bio_data);
      })
      console.log(dataArray)
      this.setState({ loading: false }, () => {

      })
    })
    console.log("uid of users34....", userUID)

  }


  componentDidMount() {
    console.log("loading::::componentDidMount", this.state.loading)
    this.takeData()


  }





  _head(item) {
    return (
      <Separator bordered style={{ alignItems: 'center' }}>
        <Text>{item.title}</Text>
      </Separator>
    );
  }

  _body(item) {
    console.log("item", item);


    if (item.id == 1) {
      const widthArr = [200, 200, 200, 200, 200, 200];
      console.log("val1.Date", val1.Date);
      console.log("next3Days", next3DaysDate);
      console.log("todayDate", todayDate);
      let temp_index = 0;
      // if (val1.Date >= todayDate && val1.Date <= next3DaysDate) {
       return (
          <View style={styles_table.container}>
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                  <Row data={item.tableHead} widthArr={widthArr} style={styles_table.header} textStyle={styles_table.text} />
                </Table>
                <ScrollView style={styles_table.dataWrapper}>
                  <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    {
                      item.tableData.map((rowData, index) =>
                        (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={widthArr}
                          style={[styles_table.row, { backgroundColor: dataArray[index] }]}
                          textStyle={styles_table.text}
                        />
                      )
                      )
                    }
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        );

      // } else if (val1.Date < todayDate) {
      //   return (
      //     <View style={styles_table.container}>
      //       <ScrollView horizontal={true}>
      //         <View>
      //           <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
      //             <Row data={item.tableHead} widthArr={widthArr} style={styles_table.header} textStyle={styles_table.text} />
      //           </Table>
      //           <ScrollView style={styles_table.dataWrapper}>
      //             <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
      //               {
      //                 item.tableData.map((rowData, index) => (
      //                   <Row
      //                     key={index}
      //                     data={rowData}
      //                     widthArr={widthArr}
      //                     style={[styles_table.row, index % 2 && { backgroundColor: '#94f76a' }]}
      //                     textStyle={styles_table.text}
      //                   />
      //                 ))
      //               }
      //             </Table>
      //           </ScrollView>
      //         </View>
      //       </ScrollView>
      //     </View>
      //   );


      // }

    }

  }
  render() {


    return (
      <Container ContainerStyle={{
        flex: 1, backgroundColor: '#FFFFFF',
      }}>

<Container ContainerStyle={{
              marginTop:20
        }}>

          <TouchableOpacity
              onPress={() => { this.props.navigation.openDrawer() }}
          >
            <FontAwesome name="bars" style={{ color: '#000000', padding: 10, marginRight: 10, marginLeft: 10, justifyContent: 'center', alignItems: 'center',marginTop:20}} size={22} color="#ffffff" />
          </TouchableOpacity>

          <Title style={{
            alignSelf: 'center', color: '#000000', marginLeft: 10, marginRight: 10,marginTop:-50
            , borderBottomWidth: 5, paddingBottom: 4
          }}>Reminder</Title>

        </Container>



        <Container ContainerStyle={{ padding: 10,marginTop:'50%' }}></Container>
        <Accordion
          dataArray={this.state.list}
          icon="add"
          expandedIcon="remove"
          iconStyle={{ color: "green" }}
          expandedIconStyle={{ color: "red" }}
          renderContent={this._body}
        />

        <FloatingAction
          actions={actions}
          color='#48AE2D'
          style={{ buttonColor: '#f29821' }}
          onPressItem={name => {
            console.log(`selected button: ${name}`);
            this.props.navigation.navigate(`${name}`)


          }}
        />

      </Container>


    );
  }
}


const style_container = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 50, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, width: '100%' }
});

const styles_table = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 100, backgroundColor: '#E7E6E1' }
});

const styles_table1 = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  // dataWrapper: { marginTop: -1 },
  row: { height: '100%', backgroundColor: '#E7E6E1' }
});