import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

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

function IntroPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user_id } = location.state || {};

    const handleStart = () => {
        if (!user_id) {
            alert("⚠ 사용자 ID가 없습니다. 로그인 후 이용해주세요.");
            navigate("/login");
            return;
        }

        navigate("/Category", { state: { userId: user_id } });
    };

    return (
        <Container>
            <SpeechBubble>
                안녕 친구! <br />
                앞으로 너의 어휘력을 항상 시켜줄 똑토라고 해.<br /><br />
                공부를 시작하기에 앞서 테스트를 진행할거야.
                모르는 단어가 있더라도 부끄러워 하지말고
                ⭐어휘력 천재⭐가 되는 과정이라고 생각하면서 솔직하게 대답해줘~<br /><br />
                시작할게~
            </SpeechBubble>

            <BunnyImage src="src/assets/sittingRabit.png" alt="똑토" />

            <StartButton onClick={handleStart}>시작하기</StartButton>
        </Container>
    );
}

export default IntroPage;
