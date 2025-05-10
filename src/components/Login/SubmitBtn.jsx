import React from "react";
import styled from "styled-components";

const SubmitButton = styled.button`
        border:none;
        font-size:30px;
        background-color: pink;
        margin:0px 0px 40px;
        width:200px; height:60px;
        border-radius:12px;

    `

function SubmitBtn({children,type,onClick}){
    return(
        <SubmitButton type={type} onClick={onClick}>{children}</SubmitButton>
    )
}
export default SubmitBtn;