import React from "react";
import styled from "styled-components";

function OnboardingBtn({text}){

    const StyledDiv = styled.div`
        display:flex;
        width:270px; height:61px;
        background-color:#FFF5A7;
        border-radius: 12px;
        font-size:24px;
        margin:30px auto;
        justify-content:center;
        align-items:center;
    `
    return(
        <>
            <StyledDiv>{text}</StyledDiv>
        </>
    )
}
export default OnboardingBtn;