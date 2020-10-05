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
import AppLogo from "../../../assets/logo.png";
import {Platform} from 'react-native'
import TextInput from 'react-native-input-validator';

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


const actions = [
  {
    text: "History Record",
    icon: require("../../../assets/historyrecord.png"),
    name: "PersonalDetails",
    position: 1,
    color: '#48AE2D'
    
    
  },
  {
    text: "Health Info",
    icon: require("../../../assets/healthinfo.png"),
    name: "HealtInfoBio",
    position: 2,
    color: '#48AE2D'
  },
  {
    text: "Personal History",
    icon: require("../../../assets/personalhistory.png"),
    name: "PersonalHistory",
    position: 3,
    color: '#48AE2D'
  },
  {
    text: "PersonalHealthRecord",
    icon: require("../../../assets/personalhistory.png"),
    name: "InsurancePlan",
    position: 4,
    color: '#48AE2D'
  }
];

var userUID = '';
var B_Email = '';
var B_EmergencyAddress = '';
var url = '';
var url1 = '';

export default class Me extends Component {
  constructor(props) {
    super(props);

    this.state = {

      date: "2016-05-15",
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
          title: 'View Bio',
          tableHead: ['Name','Date Of Birth', 'Phone No', 'Home Address', 'Email', 'Marital Status', 'Gender', 'Emergency Contact No', 'Emergency Address'],
          widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200],
          tableData: [
          ],
          body: 'React native Accordion/Collapse component, very good to use in toggles & show/hide content'
        },
        {
          id: 2,
          title: 'View Health Info',
          tableHead: ['Insurance Name', 'PM Dr Name', 'PM Dr Liscence No', 'HCP Name', 'Cell No', 'Email'],
          tableData: [



          ],
          body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
        },
        {
          id: 3,
          title: 'View Personal History',
          tableHead: ['Personal History', 'Voice Note'],
          tableData: [
           
          ],
          body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
        }
      ],
    }
  }
static navigationOptions = ({ navigation }) => {
    let drawerLabel = 'Me';
    let drawerIcon = (
      <FontAwesome name={Platform.OS == 'ios' ? "user" : "user"} style={{ color:'#653dd6' }} size={20}/>
    )
    let Header = null
    return { drawerLabel, drawerIcon, Header };
}

  takeData() {
    console.log("into takeData()")
    userUID = firebase.auth().currentUser.uid;
    console.log("uid of users....", userUID)
    var refr = firebase.database().ref('Register_User/' + userUID + '/Bio/')
    this.setState({ loading: true }, () => { });
    refr.on("value", (snapshot) => {
      if(snapshot.val() != undefined) {
        this.state.list[0].tableData = [];
        B_Email = snapshot.val().B_Email,
          B_EmergencyAddress = snapshot.val().B_EmergencyAddress
  
        // this.setState({list.tableData: B_Email},()=>{
        //   // Toast.show('This is a toast.',this.state.B_Email);
        //     console.log(':this.takeData():::::',this.state.B_Email);
        //     console.log(':this.takeData():::::',this.state.B_EmergencyAddress);
        // })
        const bio_data = [
          snapshot.val().B_Name,
          snapshot.val().B_dob,
          snapshot.val().B_Phoneno,
          snapshot.val().B_HomeAddress,
          snapshot.val().B_Email,
          snapshot.val().B_MaritalStatus,
          snapshot.val().B_Gender,
          snapshot.val().B_EmergencyContNo,
          snapshot.val().B_EmergencyAddress
        ];
       
        this.state.list[0].tableData.push(bio_data);
        this.setState({ loading: false }, () => {
          // Toast.show('This is a toast.',this.state.B_Email);
        
        })
  
      }
    })
    console.log("Value",this.state.list[0])
    console.log("uid of users23....", userUID)

  }

  takeHealthInfo() {
    console.log("into takeHealthInfo")
    userUID = firebase.auth().currentUser.uid;
    console.log("uid of users....", userUID)
    var refr = firebase.database().ref('Register_User/' + userUID + '/HealthInfo/')
    this.setState({ loading: true }, () => { });
    refr.on("value", (snapshot1) => {
      if(snapshot1.val() != undefined) {

      this.state.list[1].tableData = [];
      // snapshot1.forEach((data1) => {
      //   arr_hinfo.push(data.val())

      // this.setState({list.tableData: B_Email},()=>{
      //   // Toast.show('This is a toast.',this.state.B_Email);
      console.log(':this.takeHealthInfo:::::', snapshot1.val());
      //     console.log(':this.takeData():::::',this.state.B_EmergencyAddress);
      // })

      this.setState({ url: snapshot1.val().Issurance_info })

      const bio_data = [
        // snapshot1.val().Issurance_info,
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{ uri: this.state.url }}
        />,

        snapshot1.val().Pmr_Name,
        snapshot1.val().Dr_LisenceNo,
        snapshot1.val().Hcp_Name,
        snapshot1.val().Cell_No,
        snapshot1.val().Email_Address,

      ];
      
      this.state.list[1].tableData.push(bio_data);
      // })
    }
    })
    
    
  }

  takePersonalHistory() {
    console.log("into PersonalHistory")
    userUID = firebase.auth().currentUser.uid;
    console.log("uid of users....", userUID)
    var refr = firebase.database().ref('Register_User/' + userUID + '/PersonalHistory/')
    this.setState({ loading: true }, () => { });
    refr.on("value", (snapshot1) => {
      if(snapshot1.val() != undefined) {
      this.state.list[2].tableData = [];
      // snapshot1.forEach((data1) => {
      //   arr_hinfo.push(data.val())

      // this.setState({list.tableData: B_Email},()=>{
      //   // Toast.show('This is a toast.',this.state.B_Email);
      console.log(':this.takeData():::::', snapshot1.val());
      //     console.log(':this.takeData():::::',this.state.B_EmergencyAddress);
      // })

      this.setState({ url1: snapshot1.val().voicenote })
      const bio_data = [
        snapshot1.val().personalhistory,
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{ uri: this.state.url1 }}
        />



      ];

      this.state.list[2].tableData.push(bio_data);
    }
      // })
    })

   

  }

  componentDidMount() {
    console.log("loading::::componentDidMount", this.state.loading)
    this.takeData()
    this.takeHealthInfo()
    this.takePersonalHistory()

  }
  _head(item) {
    return (
      <Separator bordered style={{ alignItems: 'center' }}>
        {/* <Image style={{ width: '100%', height: '100%' }}
          source={require("../../../assets/historyrecord.png")}>
          </Image> */}
        <Text>{item.title}</Text>
      </Separator>
    );
  }

  _body(item) {

    if (item.id == 1) {
      const widthArr = [200, 200, 200, 200, 200, 200, 200, 200];
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
                    item.tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={[styles_table.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                        textStyle={styles_table.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      );
    } else if (item.id == 2) {
      const widthArr = [200, 200, 200, 200, 200, 200];
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
                    item.tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={[styles_table.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                        textStyle={styles_table.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      );
    } else if (item.id == 3) {
      const widthArr = [200, 200];
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
                    item.tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={[styles_table.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                        textStyle={styles_table.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      );
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
          }}>Me</Title>

        </Container>


        
        <Container ContainerStyle={{ padding: 10,marginTop:'50%'}}></Container>
        <Accordion
          dataArray={this.state.list}
          animation={true}
          expanded={true}
          icon="add"
          expandedIcon="remove"
          iconStyle={{ color: "green" }}
          expandedIconStyle={{ color: "red" }}
          renderContent={this._body}
        />

        {/* <View style={styles.container}> */}
         
          <FloatingAction
            actions={actions}
            color = '#48AE2D'
            style = {{buttonColor: '#f29821'}}
            onPressItem={name => {
              console.log(`selected button: ${name}`);
              this.props.navigation.navigate(`${name}`)

             
            }}
          />
        {/* </View> */}

      </Container>


    );
  }
}


const style_container = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
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