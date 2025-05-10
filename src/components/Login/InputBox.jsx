import React from "react";
import styled from "styled-components";

const InputBox = styled.input`
        width:100%; height:40px;
        background-color: #E9E5DF;
        color:#7E838D;
        border-radius:4px;
        display:inline-block;
        border:none;
        margin-top:20px;
    `

function LoginInputBox({type,placeholder,onChange,name,value}){
    
    return(
        <>
            <InputBox type={type} placeholder={placeholder} onChange={onChange} name={name} value={value}/>
        </>
    )
}
export default LoginInputBox;