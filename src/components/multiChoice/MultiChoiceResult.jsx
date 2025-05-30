import React from "react";
import styled from "styled-components";
import SitRabit from "../../assets/sittingRabit.png";
import PaddingBox from "../PaddingBox";
// import ChoiceBox from "./ChoiceBox";

const StyledBack = styled.div`
        background-color:#F3FF89;
        height:100vh;
    `
    const ScoreP = styled.p`
        font-size:48px;
        margin:30px 0px;
    `
    const Resultment = styled.div`
        font-size:20px;
    `
    const Choices = styled.div`
        margin:20px 0px;
    `

function MultiChoiceResult({score,ment}){
    return(
        <StyledBack>
            <PaddingBox padding='60px 0px'>
            <img src={SitRabit} style={{width:'301px',height:'282px'}}></img>
                <Resultment>{ment}</Resultment>
                <Choices>
                    {/* <ChoiceBox children={choice1}/>
                    <ChoiceBox children='목록으로' /> */}
                </Choices>
            </PaddingBox>
        </StyledBack>
    )
}
export default MultiChoiceResult