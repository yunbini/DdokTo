import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
        padding: ${props => props.padding || '90px 60px'};
        text-align:center;
    `

function PaddingBox({children,padding}){
    return(
        <StyledBox padding={padding}>
            {children}
        </StyledBox>
    )
}
export default PaddingBox