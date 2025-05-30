import { useEffect,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import PaddingBox from "../components/PaddingBox";
import styled from "styled-components";

const StyledBack = styled.div`
        height:100vh;
        background-color:#F3FF89;
    `
const StyledP = styled.p`
        font-size:${props => props.fontSize || '20px'};
        margin:110px 0px;
    `
const StyledBtn = styled.button`
        border:none;
        display:flex;
        justify-content:center;
        align-items:center;

        width:335px; height:56px;
        border-radius: 12px;
        background-color: #FFC156;
        font-size:18px;
        margin:20px auto;
    `  
    const StyledInput = styled.input`
        width:300px; height:40px;
        background-color: #E9E5DF;
        color:#7E838D;
        border-radius:4px;
        display:inline-block;
        border:none;
        margin-top:20px;
    `

function SentenMultiChoice(){

    const navigate = useNavigate();
    const location = useLocation();
    const {words,level,category,user_id} = location.state;
    const [currentIndex,setCurrentIndex] = useState(0);
    const [score,setScore] = useState(0);

    const [sentence,setSentence] = useState("");
    const [resultMessage, setResultMessage] = useState("");


    console.log(words);


           const StudySentences = async() =>{
            try{
            const word = words[currentIndex];
            const response = await axios.post('https://server-gxfs.onrender.com/chat/evaluate',
                {
                    user_id,
                    word,
                    sentence
                }
            );
                console.log(response);
                setResultMessage(response.data.suggestion);
                setTimeout(() => {
                    if (currentIndex + 1 < words.length) {
                        setCurrentIndex(prev => prev + 1);
                        setSentence("");
                        setResultMessage("");
                    } else {
                        alert("퀴즈 종료!");
                        navigate("/SentenceRst");

            }
        }, 2000);
            }
            catch(error){
                console.log(error);
            }
        }

    return(
        <>
            <StyledBack>
                <PaddingBox padding='60px 0px'>
                    <p>난이도:{level}, 카테고리:{category}</p>
                    <p>{currentIndex+1}/10</p>
                    <p>점수:{score}</p>
                    <StyledP>{words[currentIndex]}</StyledP>
                    <p>{resultMessage}</p>
                    <StyledInput name="sentence" placeholder=" 단어에 맞는 문장을 입력해주세요!"
                        onChange={(e => {
                        setSentence(e.target.value);
                     } )}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            StudySentences();
                        }}}
                    value={sentence} />
                    
                </PaddingBox>
            </StyledBack>
        </>
        
    )
}

export default SentenMultiChoice;