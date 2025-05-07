import React from "react";
import styled from "styled-components";

function ChoiceBox({children}){
    const StyledBox = styled.div`
        display:flex;
        justify-content:center;
        align-items:center;

        width:335px; height:56px;
        border-radius: 12px;
        background-color: #FFC156;
        font-size:18px;
        margin:20px auto;
    `
    return(
        <StyledBox>{children}</StyledBox>
    )
}
export default ChoiceBox;