import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PaddingBox from "../components/PaddingBox";
import styled, { keyframes } from "styled-components";

const popEffect = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
`;

const StyledBtn = styled.button`
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 335px;
    height: 56px;
    border-radius: 12px;
    font-size: 18px;
    margin: 20px auto;
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s, transform 0.2s;

    background-color: ${({ $isSelected, $isCorrectAnswer, $isCorrect }) => {
        if ($isSelected) {
            return $isCorrect ? '#4CAF50' : '#FF5252';
        }
        if ($isCorrectAnswer) {
            return '#4CAF50';
        }
        return '#FFC156';
    }};
    color: ${({ $isSelected, $isCorrectAnswer }) => ($isSelected || $isCorrectAnswer) ? '#fff' : '#000'};
    animation: ${({ $isSelected }) => ($isSelected ? popEffect : 'none')} 0.3s ease;
`;

const StyledBack = styled.div`
    background-color: #F3FF89;
    min-height: 100vh;
`;

const StyledP = styled.p`
    font-size: ${props => props.fontSize || '20px'};
    margin: 110px 0px;
`;

function WordMultiChoice() {
    const location = useLocation();
    const navigate = useNavigate();
    const { level, category, userId, falsewords, options, answer_indexs, wordslength,words } = location.state || {};
    console.log(falsewords,options,answer_indexs,words);
    const [allWords,setAllWords] = useState([]);
    const [quizList, setQuizList] = useState([]);
    const [wordList, setWordList] = useState([] || newStudyWord);
    const [falseList,setFalseList] = useState([]);
    const [optionList,setOptionList] = useState([]);
    const [answerIndexList,setAnswerIndexList] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [correctIndex, setCorrectIndex] = useState(null);
    const [isClickable, setIsClickable] = useState(true);

    useEffect(() => {
        if(!falsewords){
            const StudyWords = async () => {
            try {
                const response = await axios.get('https://server-gxfs.onrender.com/api/words', {
                    params: { category, level }
                });

                if (response.data.message) {
                    alert(response.data.message);
                } else {
                    setQuizList(response.data);
                }
            } catch (error) {
                console.error('단어 불러오기 실패:', error);
                alert('단어 불러오기 실패');
            } finally {
                setLoading(false);
            }
        };
        StudyWords();
        }
        else{
            setLoading(false);
        }
    }, [category, level,falsewords]);

    const handleAnswer = async (selectedIdx) => {
        if (!isClickable) return;
        setIsClickable(false);

        const currentQuiz = falsewords ? falsewords[currentIndex] : quizList[currentIndex];
        const correctIndex = falsewords ? answer_indexs[currentIndex] : currentQuiz.answer_index;
        const isCorrect = selectedIdx === correctIndex;
        setSelectedIndex(selectedIdx);
        setCorrectIndex(correctIndex);

        const nextScore = isCorrect ? score + 1 : score;
        const newStudyWord = [...wordList, currentQuiz.word];

        const payload = {
            user_id: userId,  // ⚠ userId 형태 반드시 숫자인지 확인
            word: currentQuiz.word,
            level: Number(level),
            category: String(category),
            selected_index: Number(selectedIdx),
            answer_index: Number(currentQuiz.answer_index),
            is_correct: Boolean(isCorrect),
            round: currentIndex + 1,
        };

        console.log("📦 Submitting payload:", payload);

        if(!falsewords){
            try {
            await axios.post('https://server-gxfs.onrender.com/api/quiz/submit', payload);
            } catch (err) {
                console.error("❌ Submit error:", err);
            }
        }

        setTimeout(() => {
            const totalQuestions = falsewords? falsewords.length : quizList.length;
            const successWords = [...(words ? words : allWords), currentWord];
            const LastWords = words ? words : allWords;
            if (currentIndex + 1 === totalQuestions) {
                if (nextScore === totalQuestions) {
                    navigate("/MultiChoSuc", {
                        state: { score: nextScore, LastWords, level, category, user_id: userId, totalQuestions }
                    });
                } else {
                    navigate("/MultiChoFalse", { state:
                         { score: nextScore, level, category, userId,
                            falsewords:isCorrect ? falseList : [...falseList,currentQuiz.word],
                            options: isCorrect ? optionList : [...optionList,currentQuiz.options],
                            answer_indexs: isCorrect ? answerIndexList : [...answerIndexList,currentQuiz.answer_index],
                            successWords,
                            totalQuestions
                          } 
                        });
                }
            } else {
                setAllWords(prev => [...prev, currentWord]);
                if (isCorrect) {
                    setWordList(newStudyWord);
                }
                else{
                    setFalseList(prev => [...prev,currentQuiz.word]);
                    setOptionList(prev => [...prev,currentQuiz.options]);
                    setAnswerIndexList(prev => [...prev,currentQuiz.answer_index]);
                }
                setScore(nextScore);
                setCurrentIndex(prevIndex => prevIndex + 1);
                setSelectedIndex(null);
                setCorrectIndex(null);
                setIsClickable(true);
            }
        }, 1000);
    };

    if (loading) {
        return <div>퀴즈 로딩중 ..</div>;
    }

    const currentQuiz = quizList[currentIndex];
    const currentWord = falsewords ? falsewords[currentIndex] : quizList[currentIndex].word;
    const retryLength = falsewords ? wordslength : quizList.length;
    const retryOptions = falsewords ? options[currentIndex] : currentQuiz.options;


    return (
        <StyledBack>
            <PaddingBox padding='60px 0px'>
                <p>난이도: {level}, 카테고리: {category}</p>
                <p>{currentIndex + 1}/{retryLength}</p>
                <p>점수: {score}</p>
                <StyledP>{currentWord}</StyledP>
                {retryOptions.map((option, i) => (
                    <StyledBtn
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={!isClickable}
                        $isDisabled={!isClickable}
                        $isSelected={selectedIndex === i}
                        $isCorrectAnswer={correctIndex === i}
                        $isCorrect={i === correctIndex}
                    >
                        {option}
                    </StyledBtn>
                ))}
            </PaddingBox>
        </StyledBack>
    );
}

export default WordMultiChoice;