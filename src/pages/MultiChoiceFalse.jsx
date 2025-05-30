import React from "react";
import MultiChoiceResult from "../components/multiChoice/MultiChoiceResult";
import styled from "styled-components";
import PaddingBox from "../components/PaddingBox";
import SitRabit from "../assets/sittingRabit.png"
import { useLocation } from "react-router-dom";


const StyledBack = styled.div`
        background-color:#F3FF89;
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

function MultiChoiceFalse(){
    

    const location = useLocation();
    const {score} = location.state;
    console.log(score);
    return(
        <StyledBack>
            <PaddingBox padding='60px 0px'>
            <img src={SitRabit} style={{width:'301px',height:'282px'}}></img>
                <ScoreP>{score}/10</ScoreP>
                <Resultment>우리 다시 한 번 학습해보자!</Resultment>
                <Choices>
                    {/* <ChoiceBox children={choice1}/>
                    <ChoiceBox children='목록으로' /> */}
                </Choices>
            </PaddingBox>
        </StyledBack>
    )
}
export default MultiChoiceFalse;