import React,{useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import PaddingBox from "../components/PaddingBox";
import { useNavigate } from "react-router-dom";

const InputBox = styled.input`
    height:40px; width:270px;
    color:#7E838D;
    background-color:#E9E5DF;
    border:none;
    border-radius:4px;
`
const StyledBox = styled.div`
    background-color:#F3FF89;
    height:200vh;
`
const ChatBox = styled.div`
    z-index:1000;
    position:fixed;
    bottom:10px;
`
const SubmitBtn = styled.button`
    position:fixed;
    height:40px;
    right:10px;
    border:none;
    background-color:#FFD558;
    border-radius:4px;
`
const MessageBubble = styled.div`
    background-color:white;
    margin-bottom:10px;
    border-radius:12px;
    background-color: ${props => props.sender === "user" ? "#FFD558" : "#ffffff"};
    padding:10px;
`
const MessageWrapper = styled.div`
    display: flex;
    justify-content: ${props => props.sender === "user" ? "flex-end" : "flex-start"};
    margin-bottom: 10px;
`

function ChatBot(){
    const navigate = useNavigate();
    const location = useLocation();
    const {category,userId} = location.state
    const [messages,setMessages] = useState([]);
    const [predictGrade,setPredictGrade] = useState({
        answers:[]
    });
    const [form,setForm] = useState({
        answer:"",
        category:category
    });

    const StartChat = async() =>{
            try{
            const response = await axios.post('https://server-gxfs.onrender.com/chat/start_chat',{category});
             console.log('사용자 등록:',response.data);
             setMessages([{sender:"bot",text: response.data.question}])
            
            alert('카테고리 전달 완');
        }
        catch(error){
            console.error('사용자 등록 에러:',error);
            alert('카테고리 전달 실패')
        }
        };

    useEffect(()=>{
        if(category){
            StartChat();
        }
    },[])

    const sendAnswer = async() => {
        const userMessage = {sender:"user", text:form.answer};
        const userAnswer = form.answer;
        const newMessage = [...messages,userMessage];
        const newRound = newMessage.filter(msg => msg.sender == 'user').length;
        const updatedForm = {
            ...form,
            round:newRound
        }
        setMessages(newMessage);

        const userMessages  = [...predictGrade.answers,userAnswer];
        console.log(userMessage);
        setPredictGrade({answers:userMessages});
        
        try{
            const response = await axios.post('https://server-gxfs.onrender.com/chat/followup_chat',updatedForm);
            let botMessage;
            if(newRound < 4){
                botMessage = {sender:"bot",text:response.data.followup_question};
                setMessages([...newMessage,botMessage]);
            }
            else if(newRound === 4){
                botMessage = {sender:"bot",text:response.data.ending_message};
                setMessages([...newMessage,botMessage]);

                const res = await axios.post('https://server-gxfs.onrender.com/grade/predict_grade_bulk', {
                    answers: userMessages
                });
                // const level = res.data.label_index === 1 ? 3 : 0;
                const level = 0;
                console.log(userMessages);
                navigate("/WordMultiCho",{state:{category,level,userId}});
            }

            setForm({...form,answer:""});

        }
        catch(error){
            console.error(error);
        }
    }

    
    return(
        <StyledBox>
            <PaddingBox padding="90px 30px">
                {
                    messages.map((msg,i)=>(
                        <MessageWrapper key={i} sender={msg.sender}>
                            <MessageBubble sender={msg.sender}>
                                {msg.text}
                            </MessageBubble>
                        </MessageWrapper>
                    ))
                }
                <button style={{display:'none  '}}>학습하기</button>
                <ChatBox>
                    <InputBox placeholder=" 텍스트를 입력해주세요!!" name="answer"
                     onChange={(e => {
                        const {name,value} = e.target;
                        setForm({...form, [name]:value});
                     } )} value={form.answer}/>
                    <SubmitBtn onClick={sendAnswer}>보내기</SubmitBtn>
                </ChatBox>
            </PaddingBox>
        </StyledBox>
    )
}
export default ChatBot;