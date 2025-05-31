import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    padding: 40px 20px;
    background-color: #ffffff;
`;

const SpeechBubble = styled.div`
    max-width: 320px;
    background-color: #ffffff;
    border: 2px solid #000;
    border-radius: 20px;
    padding: 20px;
    position: relative;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 1.6;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.1);

    &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-top-color: #000;
    }
`;

const BunnyImage = styled.img`
    width: 200px;
    height: auto;
    margin-top: 40px;
`;

const StartButton = styled.button`
    margin-top: 30px;
    background-color: #FFF59D;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #FFE082;
    }
`;

function OutroPage() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/Category"); // 원하는 경로로 수정해줘
    };

    return (
        <Container>
            <SpeechBubble>
                훌륭해! 오늘 학습 끝! 🎉 <br />
                모르는 게 있어도 괜찮아,<br /><br />
                중요한 건 네가 끝까지 최선을 다했다는 거야.
                똑토는 항상 네 옆에서 응원할게! 다음에도 같이 달려보자 🐇<br /><br />
            </SpeechBubble>

            <BunnyImage src="src/assets/sittingRabit.png" alt="똑토" />

            <StartButton onClick={handleStart}>처음으로</StartButton>
        </Container>
    );
}

export default OutroPage;
