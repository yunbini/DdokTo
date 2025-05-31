import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PaddingBox from "../components/PaddingBox";
import styled from "styled-components";

const StyledBack = styled.div`
    min-height: 100vh;
    background-color: #F3FF89;
`;

const StyledP = styled.p`
    font-size: ${props => props.fontSize || '20px'};
    margin: 40px 0px;
    text-align: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    flex-wrap: wrap;
`;

const StyledBtn = styled.button`
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 40px;
    border-radius: 12px;
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#FFC156')};
    font-size: 16px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const StyledInput = styled.input`
    width: 300px;
    height: 40px;
    background-color: #E9E5DF;
    color: #7E838D;
    border-radius: 4px;
    border: none;
    margin-top: 20px;
    padding: 0 10px;
`;

function SentenMultiChoice() {
    const navigate = useNavigate();
    const location = useLocation();
    const { words, level, category, user_id } = location.state;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [sentence, setSentence] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedbackReceived, setFeedbackReceived] = useState(false);

    const StudySentences = async () => {
        if (!sentence.trim()) {
            alert("문장을 입력해주세요!");
            return;
        }

        setLoading(true);
        try {
            const word = words[currentIndex];
            const response = await axios.post('https://server-gxfs.onrender.com/chat/evaluate', {
                user_id,
                word,
                sentence
            });

            setResultMessage(response.data.suggestion);
            setFeedbackReceived(true);
        } catch (error) {
            console.log(error);
            alert("피드백 요청 실패");
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (!feedbackReceived) {
            alert("먼저 피드백을 받아주세요!");
            return;
        }

        if (currentIndex + 1 < words.length) {
            setCurrentIndex(prev => prev + 1);
            setSentence("");
            setResultMessage("");
            setFeedbackReceived(false);
        }
    };

    const handleFinish = () => {
        navigate("/Outro");
    };

    const isLastQuestion = currentIndex + 1 === words.length;

    return (
        <StyledBack>
            <PaddingBox padding='60px 0px'>
                <p>난이도: {level}, 카테고리: {category}</p>
                <p>{currentIndex + 1}/{words.length}</p>
                <StyledP>{words[currentIndex]}</StyledP>

                <StyledInput
                    name="sentence"
                    placeholder="단어에 맞는 문장을 입력해주세요!"
                    onChange={(e) => setSentence(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            StudySentences();
                        }
                    }}
                    value={sentence}
                    disabled={loading}
                />

                <ButtonContainer>
                    <StyledBtn onClick={StudySentences} disabled={loading}>
                        {loading ? "피드백 받는 중..." : "피드백 받기"}
                    </StyledBtn>

                    {!isLastQuestion && (
                        <StyledBtn onClick={handleNext} disabled={!feedbackReceived}>
                            다음
                        </StyledBtn>
                    )}
                </ButtonContainer>

                {isLastQuestion && feedbackReceived && (
                    <ButtonContainer>
                        <StyledBtn onClick={handleFinish}>끝내기</StyledBtn>
                    </ButtonContainer>
                )}

                <p>{resultMessage}</p>
            </PaddingBox>
        </StyledBack>
    );
}

export default SentenMultiChoice;
