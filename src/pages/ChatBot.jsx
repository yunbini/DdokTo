import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import PaddingBox from "../components/PaddingBox";

const InputBox = styled.input`
    height: 40px;
    width: 70%;
    max-width: 300px;
    color: #7E838D;
    background-color: #E9E5DF;
    border: none;
    border-radius: 4px;
    padding: 0 10px;
`;

const StyledBox = styled.div`
    background-color: #F3FF89;
    min-height: 100vh;
    padding-bottom: 100px; /* 하단 버튼 영역 확보 */
`;

const ChatBox = styled.div`
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const SubmitBtn = styled.button`
    height: 40px;
    background-color: #FFD558;
    border: none;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #FFC156;
    }
`;

const LearnBtn = styled.button`
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 300px;
    height: 45px;
    background-color: #FFC156;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #FFB300;
    }
`;

const MessageBubble = styled.div`
    background-color: ${(props) => (props.sender === "user" ? "#FFD558" : "#ffffff")};
    margin-bottom: 10px;
    border-radius: 12px;
    padding: 10px;
    max-width: 80%;
    word-break: break-word;
`;

const MessageWrapper = styled.div`
    display: flex;
    justify-content: ${(props) => (props.sender === "user" ? "flex-end" : "flex-start")};
    margin-bottom: 10px;
`;

function ChatBot() {
    const navigate = useNavigate();
    const location = useLocation();
    const { category, userId } = location.state;

    const [messages, setMessages] = useState([]);
    const [predictGrade, setPredictGrade] = useState({ answers: [] });
    const [form, setForm] = useState({ answer: "", category: category });
    const [showLearnButton, setShowLearnButton] = useState(false);

    const StartChat = async () => {
        try {
            const response = await axios.post('https://server-gxfs.onrender.com/chat/start_chat', { category });
            console.log('사용자 등록:', response.data);
            setMessages([{ sender: "bot", text: response.data.question }]);
        } catch (error) {
            console.error('사용자 등록 에러:', error);
            alert('카테고리 전달 실패');
        }
    };

    useEffect(() => {
        if (category) {
            StartChat();
        }
    }, [category]);

    const sendAnswer = async () => {
        if (!form.answer.trim()) {
            alert("답변을 입력해주세요!");
            return;
        }

        const userMessage = { sender: "user", text: form.answer };
        const userAnswer = form.answer;
        const updatedMessages = [...messages, userMessage];
        const newRound = updatedMessages.filter(msg => msg.sender === 'user').length;

        setMessages(updatedMessages);
        setForm({ ...form, answer: "" });
        setPredictGrade((prev) => ({ answers: [...prev.answers, userAnswer] }));

        try {
            const response = await axios.post('https://server-gxfs.onrender.com/chat/followup_chat', {
                ...form,
                round: newRound
            });

            if (newRound < 4) {
                const botMessage = { sender: "bot", text: response.data.followup_question };
                setMessages((prev) => [...prev, botMessage]);
            } else if (newRound === 4) {
                const botMessage = { sender: "bot", text: response.data.ending_message };
                setMessages((prev) => [...prev, botMessage]);
                setShowLearnButton(true); // ✅ 대화 끝나면 버튼 ON
            }
        } catch (error) {
            console.error(error);
        }
    };

    const goToLearnPage = () => {
        const level = 0; // 예시값
        navigate("/WordMultiCho", { state: { category, level, userId } });
    };

    return (
        <StyledBox>
            <PaddingBox padding="90px 20px">
                {messages.map((msg, i) => (
                    <MessageWrapper key={i} sender={msg.sender}>
                        <MessageBubble sender={msg.sender}>
                            {msg.text}
                        </MessageBubble>
                    </MessageWrapper>
                ))}
            </PaddingBox>

            {showLearnButton && (
                <LearnBtn onClick={goToLearnPage}>학습하기</LearnBtn>
            )}

            <ChatBox>
                <InputBox
                    placeholder="대화를 입력하세요."
                    name="answer"
                    onChange={(e) => {
                        const { name, value } = e.target;
                        setForm({ ...form, [name]: value });
                    }}
                    value={form.answer}
                    disabled={showLearnButton} // ✅ 버튼 보이면 입력창 비활성화
                />
                <SubmitBtn onClick={sendAnswer} disabled={showLearnButton}>
                    보내기
                </SubmitBtn>
            </ChatBox>
        </StyledBox>
    );
}

export default ChatBot;
