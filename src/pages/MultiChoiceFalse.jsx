import styled from "styled-components";
import PaddingBox from "../components/PaddingBox";
import SitRabit from "../assets/sittingRabit.png"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const StyledBack = styled.div`
        height:100vh;
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
    const StyledBtn = styled.button`
        width:335px; height:56px;
        border-radius:12px;
        background-color:#FFC156;
        color:black;
        border:none;
        margin-bottom:10px;
        font-size:16px;
    `

function MultiChoiceFalse(){
    
    const navigate = useNavigate();
    const location = useLocation();
    const {score,level,category,userId,words,options,answer_indexs} = location.state;
    console.log(score,level,category,userId,words,options,answer_indexs,words.length);
    return(
        <StyledBack>
            <PaddingBox padding='60px 0px'>
            <img src={SitRabit} style={{width:'301px',height:'282px'}}></img>
                <ScoreP>{score}/10</ScoreP>
                <Resultment>우리 다시 한 번 학습해보자!</Resultment>
                <Choices>
                    <StyledBtn
                        onClick={() => navigate("/WordMultiCho", 
                            {state:
                                {level,category,userId,
                                    words,options,answer_indexs,wordslength:words.length
                                }})}
                    >다시 학습하기</StyledBtn>
                    <StyledBtn
                        onClick={() => navigate("/Category")}
                    >목록으로</StyledBtn>
                </Choices>
            </PaddingBox>
        </StyledBack>
    )
}
export default MultiChoiceFalse;