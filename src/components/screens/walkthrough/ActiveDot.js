import React from 'react';
import {Container} from '../../default';

export const ActiveDot = () => {
    return(
        <Container 
            ContainerStyle={styles.activeDotStyle}
        />
    )
}

const styles = {
    activeDotStyle: {
        backgroundColor: '#0080ff',
        width: 8, 
        height: 8, 
        borderRadius: 8, 
        marginLeft: 2, 
        marginRight: 2
    }
}