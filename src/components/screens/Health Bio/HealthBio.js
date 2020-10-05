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


var userUID = '';
var B_Email = '';
var B_EmergencyAddress = '';
var url = '';
var url1 = '';

const actions = [
  {
    text: "Add Vitals",
    icon: require("../../../assets/addvitals.png"),
    name: "AddVital",
    position: 1,
    color: '#48AE2D'


  },
  {
    text: "Add Allergies",
    icon: require("../../../assets/addallergies.png"),
    name: "AddAllergies",
    position: 2,
    color: '#48AE2D'
  },
  {
    text: "Add Surgeries and PMH",
    icon: require("../../../assets/addsurgeries.png"),
    name: "AddSurgeries",
    position: 3,
    color: '#48AE2D'
  }

];

export default class HealthBio extends Component {
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
          title: 'View Vitals',
          tableHead: ['Height', 'Weight', 'BP', 'Suger', 'Fasting', 'Blood Group'],
          widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200],
          tableData: [
          ],
          body: 'React native Accordion/Collapse component, very good to use in toggles & show/hide content'
        },
        {
          id: 2,
          title: 'View Allergies',
          tableHead: ['Allergy Type', 'Description'],
          tableData: [



          ],
          body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
        },
        {
          id: 3,
          title: 'View Surgeries And Pmh',
          tableHead: ['Surgeries History', 'Surgeries VoiceNote', 'PMH History', 'PMH VoiceNote'],
          tableData: [
            ['1', '2', '3', '4'],
            ['a', 'b', 'c', 'd'],
            ['1', '2', '3', '456\n789'],
            ['a', 'b', 'c', 'd']
          ],
          body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
        }
      ],
    }
  }

  takeData() {
    console.log("into takeData()")
    userUID = firebase.auth().currentUser.uid;
    console.log("uid of users....", userUID)
    var refr = firebase.database().ref('Register_User/' + userUID + '/AddVitals/')
    this.setState({ loading: true }, () => { });
    refr.on("value", (snapshot) => {
      this.state.list[0].tableData = [];
      snapshot.forEach((data) => {


        // this.setState({list.tableData: B_Email},()=>{
        //   // Toast.show('This is a toast.',this.state.B_Email);
        //     console.log(':this.takeData():::::',this.state.B_Email);
        //     console.log(':this.takeData():::::',this.state.B_EmergencyAddress);
        // })
        const bio_data = [

          data.val().Height,
          data.val().Weight,
          data.val().BP,
          data.val().Suger,
          data.val().fasting,
          data.val().BloodGroup


        ];

        this.state.list[0].tableData.push(bio_data);
      })
      this.setState({ loading: false }, () => {

      })
    })

  }

  takeHealthInfo() {
    console.log("into takeHealthInfo")
    userUID = firebase.auth().currentUser.uid;
    console.log("uid of users....", userUID)
    var refr = firebase.database().ref('Register_User/' + userUID + '/AddAllergies/')
    this.setState({ loading: true }, () => { });
    refr.on("value", (snapshot1) => {
      this.state.list[1].tableData = [];
      snapshot1.forEach((data1) => {
        //   arr_hinfo.push(data.val())

        // this.setState({list.tableData: B_Email},()=>{
        //   // Toast.show('This is a toast.',this.state.B_Email);
        console.log(':this.takeHealthInfo:::::', snapshot1.val());
        //     console.log(':this.takeData():::::',this.state.B_EmergencyAddress);
        // })



        const bio_data = [
          // snapshot1.val().Issurance_info,
          //    <Image
          //    style={{ width:'100%', height:'100%' }}
          //    source={{uri:this.state.url}}
          //  />,

          data1.val().AllergyType,
          data1.val().Description

        ];

        this.state.list[1].tableData.push(bio_data);
      })
    })

  }

  takePersonalHistory() {
    console.log("into PersonalHistory")
    userUID = firebase.auth().currentUser.uid;
    console.log("uid of users....", userUID)
    var refr = firebase.database().ref('Register_User/' + userUID + '/AddSurgeries&Pmh/')
    this.setState({ loading: true }, () => { });
    refr.on("value", (snapshot1) => {
      this.state.list[2].tableData = [];
      snapshot1.forEach((data2) => {
        //   arr_hinfo.push(data.val())

        // this.setState({list.tableData: B_Email},()=>{
        //   // Toast.show('This is a toast.',this.state.B_Email);
        console.log(':this.takeHealthInfo:::::', snapshot1.val());
        //     console.log(':this.takeData():::::',this.state.B_EmergencyAddress);
        // })

        this.setState({ url: data2.val().SurgeriesVoiceNote })
        this.setState({ url1: data2.val().PmhVoiceNote })

        const bio_data = [

          data2.val().SurgeriesHistory,
          <Image
            style={{ width: '100%', height: '100%' }}
            source={{ uri: this.state.url }}
          />,

          data2.val().PmhHistory,
          <Image
            style={{ width: '100%', height: '100%' }}
            source={{ uri: this.state.url1 }}
          />

        ];

        this.state.list[2].tableData.push(bio_data);
      })
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
        <Text>{item.title}</Text>
      </Separator>
    );
  }

  _body(item) {

    if (item.id == 1) {
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
    } else if (item.id == 2) {
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
    } else if (item.id == 3) {
      const widthArr = [200, 200, 200, 200];
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
          marginTop: 20
        }}>


          <TouchableOpacity
            onPress={() => { this.props.navigation.openDrawer() }}
          >
            <FontAwesome name="bars" style={{ color: '#000000', padding: 10, marginRight: 10, marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }} size={22} color="#ffffff" />
          </TouchableOpacity>

          <Title style={{
            alignSelf: 'center', color: '#000000', marginLeft: 10, marginRight: 10, marginTop: -50
            , borderBottomWidth: 5, paddingBottom: 4
          }}>Health Bio</Title>

        </Container>



        <Container ContainerStyle={{ padding: 10, marginTop: '50%' }}></Container>
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
  header: { height: 60, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 80, backgroundColor: '#E7E6E1' }
});

const styles_table1 = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 40, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  // dataWrapper: { marginTop: -1 },
  row: { height: '50%', backgroundColor: '#E7E6E1' }
});

const styles_table2 = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 40, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: '40%', backgroundColor: '#E7E6E1' }
});