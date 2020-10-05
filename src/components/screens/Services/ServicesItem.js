import React, {Component} from 'react';
import {Textview, Container, ImageView} from '../../default/';
import { TouchableWithoutFeedback, Text } from 'react-native';
import {Icon} from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';

const propTypes = {
    item:PropTypes.object
};

class ServicesItem extends Component{

    constructor(props){
        super(props);

        this.state = {
            isSelected: false
        }
        this.icons = {     //Step 2
            'up'    : <Icon name="caretup"/>,
            'down'  : <Icon name="caretdown"/>
        }
    }

    onPress = () => {
        this.setState((prevState,prevProps) => ({
            isSelected: !prevState.isSelected
        }))
    }
    renderDetails = () => {
        <Container>
            <Text style={styles.description}>{this.props.item.description}</Text>
        </Container>
    }

    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];   
        }
        return(
            <Container ContainerStyle={styles.container}>
                <TouchableWithoutFeedback onPress={this.onPress}>
                    <Container ContainerStyle={styles.container}>
                    <Text style={styles.title}>{this.props.item.title}</Text>
                        <ImageView imgSource={icon} imageStyle={styles.image}/>
                    </Container>
                </TouchableWithoutFeedback>
                {this.state.isSelected && this.renderDetails()}
            </Container>
        )
    }
}

ServicesItem.propTypes = propTypes;

const styles = {
    container:{
        flex:1,
        flexDirection:'column',
        margin:10
    },
    titleContainer:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    image:{
        width:20,
        height:20
    },
        title:{
            flex:1,
            fontSize:22
        },
    description:{
        flex:1,
        fontSize:22,
        color:'grey',
        paddingTop:10
    }
}
export {ServicesItem};