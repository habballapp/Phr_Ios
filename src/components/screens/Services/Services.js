import React,{Component} from 'react';
import {Textview, Container, ImageView,Statusbar, Scrollview} from '../../default/';
import {Text,View,Platform,TouchableOpacity} from 'react-native'
import {AccordionList} from "accordion-collapse-react-native";
import { Icon,Header, Title, } from 'native-base';
import {Button as NavButton} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const data = [
    {
        title:"Allergic reactions",
        description:"In an allergic reaction, the immune system starts fighting substances that are usually harmless (such as dust mites, pollen, or a medicine) as though these substances were trying to attack the body. This overreaction can cause a rash, itchy eyes, a runny nose, trouble breathing, nausea, and diarrhea."
    },
    {
        title:"Congestion",
        description:"The hindrance or blockage of the passage of something, for example a fluid, mixture, traffic, people, etc. (due to an excess of this or due to a partial or complete obstruction), resulting in overfilling or overcrowding."
    }
]

export default class Services extends Component{
    state = {
        list:[
            {
              title: 'Allergies',
              body: "An allergy is an immune system response to a foreign substance that's not typically harmful to your body. These foreign substances are called allergens. They can include certain foods, pollen, or pet dander. Your immune system's job is to keep you healthy by fighting harmful pathogens."
            },
            {
              title: 'Bronchitis',
              body: 'Bronchitis is an inflammation of the bronchial tubes, the airways that carry air to your lungs. It causes a cough that often brings up mucus. It can also cause shortness of breath, wheezing, a low fever, and chest tightness. There are two main types of bronchitis: acute and chronic.'
            },
            {
                title: 'Congestion',
                body: 'The hindrance or blockage of the passage of something, for example a fluid, mixture, traffic, people, etc. (due to an excess of this or due to a partial or complete obstruction), resulting in overfilling or overcrowding.'
            },
            {
                title: 'Skin allergy',
                body: 'Allergic contact dermatitis occurs when the skin comes into direct contact with an allergen. The result of the skin allergy is a red, itchy rash that can include small blisters or bumps. The rash arises whenever the skin comes into contact with the allergen, a substance that the immune system attacks.'
            },
        ],
    };
    static navigationOptions = ({navigation}) => {
        let drawerLabel = 'Our Services';
        let drawerIcon= (                            
            <FontAwesome name="handshake-o" size={20} color="red"/>
        )
        return {drawerLabel, drawerIcon};
    }
    _head(item){
        return(
            <Container ContainerStyle={{borderRadius:10,height:50,backgroundColor:'#EA2626',marginBottom:2,justifyContent:'center'}}>
              <Text style={styles.title}>{item.title}</Text>
            </Container>
        );
    }
    
    _body(item){
        return (
            <View style={{padding:10}}>
              <Text style={styles.description}>{item.body}</Text>
            </View>
        );
    }
    render(){
        return(
            <Container ContainerStyle={{flex:1, backgroundColor:'#fff'}}>
                <Header style={{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',height:70,marginBottom:25}}>
                    <Statusbar 
                        translucent 
                        backgroundColor='white'
                        barStyle='dark-content'
                    />
                    <NavButton transparent style={{position:'absolute', left:0}} onPress={()=>{this.props.navigation.goBack()}}>
                        <Icon name= {Platform.OS == 'ios' ? "ios-arrow-back" : "md-arrow-back"} color="#0080ff" />
                    </NavButton>
                    <TouchableOpacity onPress={() => { this.props.navigation.openDrawer() }}>
                        <FontAwesome name="bars" style={{ padding: 10, marginLeft: 10 }} size={20} color='#653dd6' />
                    </TouchableOpacity>
                    <Title style={styles.titleStyles}>Our Services</Title>
                </Header>
                <Scrollview>
                <Container ContainerStyle={{borderColor:'#707070', borderWidth:0.5,padding:10,width:'80%',alignSelf:'center',height:200,marginRight:20,marginLeft:20}}>
                    <Textview textStyle={{textAlign:'center',fontSize:20,color:'black'}} text="Sometimes your doctor isn’t available when feeling great can’t wait. Daytime, evenings, weekends and holidays, XYZ Urgent Care is here for you when you need quality health."/>
                </Container>
                <Textview text="When To visit us?" textStyle={{marginTop:10,padding:15,alignSelf:'center',textAlign:'center',fontSize:20,color:'black'}}/>
                <Container ContainerStyle={{padding:30}}>
                    <AccordionList
                        list={this.state.list}
                        header={this._head}
                        body={this._body}
                    />
                </Container>
                </Scrollview>
                <Container ContainerStyle={{
                        alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 30,
                        position: 'absolute', bottom: 0
                    }}>
                        <Textview >
                            Powered by Matz Solutions Pvt Ltd Ⓒ
                            </Textview>
                </Container>
            </Container>
        )
    }
}
const styles = {
    container:{
        flex:1,
        flexDirection:'column',
        margin:10
    },
    title:{
        fontSize:22,
        color:'white',
        textAlign:'center'
    },
    description:{
        fontSize:19,
        color:'grey',
        paddingTop:10
    },
    titleStyles: {fontWeight: 'bold',fontSize:26, alignSelf:'center', flex:1,color:'#EA2626'},

}