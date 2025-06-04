import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SitRabit from "../assets/sittingRabit.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ffffff;
`;

const BunnyImage = styled.img`
    width: 200px;
    height: auto;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
    color: #000000;
`;

const StartButton = styled.button`
    background-color: #FFF59D; /* 연노랑 */
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #FFE082; /* hover 색 */
    }
`;

function StartPage() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/Register"); // 원하는 경로로 변경해줘
    };

    return (
        <Container>
            <BunnyImage src={SitRabit} alt="토끼 이미지" />
            <Title>❤ 똑토와 놀자 ❤</Title>
            <StartButton onClick={handleStart}>시작하기</StartButton>
        </Container>
    );
}

export default StartPage;
