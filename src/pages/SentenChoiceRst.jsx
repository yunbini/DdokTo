import styled from "styled-components";
import SitRabit from "../assets/sittingRabit.png"
import { useNavigate } from "react-router-dom";
import PaddingBox from "../components/PaddingBox";

const StyledBack = styled.div`
        height:100vh;
        background-color:#F3FF89;
    `
    const ScoreP = styled.p`
        font-size:48px;
        margin:30px 0px;
    `
    const Resultment = styled.div`
        margin:50px 0px;
        font-size:40px;
    `
    const Choices = styled.div`
        margin:20px 0px;
    `
    const StyledBtn = styled.button`
        width:335px; height:56px;
        border-radius:12px;
        background-color:#FFC156;
        color:black;
        border:none;
        margin-bottom:10px;
        font-size:16px;
    `

function SentenChoiceRst(){

    const navigate = useNavigate();

    return(
        <StyledBack>
            <PaddingBox padding='60px 0px'>
            <img src={SitRabit} style={{width:'301px',height:'282px'}}></img>
                
                <Resultment>정말 잘했어!</Resultment>
                <Choices>
                    <StyledBtn onClick={()=>navigate("/Category")}>목록으로</StyledBtn>
                </Choices>
            </PaddingBox>
        </StyledBack>
    )
}
export default SentenChoiceRst;