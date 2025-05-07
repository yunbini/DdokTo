import React from 'react';
import styled from 'styled-components';

function PaddingBox({children,padding}){
    const StyledBox = styled.div`
        padding:${props => props.padding || '90px 60px'};
        text-align:center;
    `
    return(
        <StyledBox padding={padding}>
            {children}
        </StyledBox>
    )
}
export default PaddingBox