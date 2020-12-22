import React, { forwardRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const CustomScrollbar = forwardRef((props, ref) => (
    <Scrollbars
        {...props}
        ref={ref}
        autoHide
        renderTrackHorizontal={props => <div {...props} style={{ display: 'none' }} className="track-horizontal" />}
    />
));

export default CustomScrollbar;
