import React from 'react';
import {Container} from '../../default';

export const InActiveDot = () => {
    return(
        <Container 
            ContainerStyle={styles.inActiveDotStyle}
        />
    )
}

const styles = {
    inActiveDotStyle: {
        backgroundColor: '#A6A6A6', 
        width: 10, 
        height: 10, 
        borderRadius: 7, 
        marginLeft: 2,
        marginRight: 2
    }
}