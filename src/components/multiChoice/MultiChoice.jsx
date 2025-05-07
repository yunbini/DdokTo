import React from "react";
import styled from "styled-components";
import PaddingBox from "../PaddingBox";
import ChoiceBox from "./ChoiceBox";

function MultiChoice({main,choice1,choice2,choice3,choice4,size}){
    const StyledBack = styled.div`
        background-color:#F3FF89;
    `
    const Choices = styled.div`
    `
    const StyledP = styled.p`
        font-size:${props => props.fontSize || '20px'};
        margin:110px 0px;
    `
    return(
        <>
            <StyledBack>
                <PaddingBox padding='60px 0px'>
                    <StyledP>{main}</StyledP>
                    <Choices>
                        <ChoiceBox children={choice1} />
                        <ChoiceBox children={choice2} />
                        <ChoiceBox children={choice3} />
                        <ChoiceBox children={choice4} />
                    </Choices>
                </PaddingBox>
            </StyledBack>
        </>
    )
}
export default MultiChoice;