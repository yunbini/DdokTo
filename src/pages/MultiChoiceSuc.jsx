import styled from "styled-components";
import SitRabit from "../assets/sittingRabit.png"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PaddingBox from "../components/PaddingBox";

const StyledBack = styled.div`
        background-color:#F3FF89;
        min-height: 100vh;
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
    const StyledBtn = styled.button`
        width:335px; height:56px;
        border-radius:12px;
        background-color:#FFC156;
        color:black;
        border:none;
        margin-bottom:10px;
        font-size:16px;
    `

function MultiChoiceSuc(){

    const navigate = useNavigate();
    const location = useLocation();
    const {score,words,level,category,user_id} = location.state;
    console.log(score,words,level,category,user_id);

    return(
        <StyledBack>
            <PaddingBox padding='60px 0px'>
            <img src={SitRabit} style={{width:'301px',height:'282px'}}></img>
                <ScoreP>{score}/10</ScoreP>
                <Resultment>정말 잘했어! 우리 이제 문장 만들기 해보자!</Resultment>
                <Choices>
                    <StyledBtn
                        onClick={()=>navigate("/SentenMultiCho",{state:{words:words, level:level, category:category, user_id:user_id}})}
                    >문장만들기</StyledBtn>
                    <StyledBtn onClick={()=>navigate("/Category")}>목록으로</StyledBtn>
                </Choices>
            </PaddingBox>
        </StyledBack>
    )
}
export default MultiChoiceSuc;