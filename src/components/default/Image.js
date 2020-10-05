import React from 'react';
import {Image} from 'react-native';

export const ImageView = (props) => {
    const {
        imageStyle,
        imgSource,
        resizeMode,
        onLoadEnd
    } = props;
    return( <Image style={imageStyle} source={imgSource} resizeMode={resizeMode} onLoadEnd={onLoadEnd} /> )
}