import React from 'react';
import styled from 'styled-components';

function PaddingBox({children}){
    const StyledBox = styled.div`
        padding:200px 60px;
        text-align:center;

        
    `
    return(
        <StyledBox>
            {children}
        </StyledBox>
    )
}
export default PaddingBox