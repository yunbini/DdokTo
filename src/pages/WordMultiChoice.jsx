// import MultiChoice from "../components/multiChoice/MultiChoice";
import { useEffect,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import PaddingBox from "../components/PaddingBox";
import styled from "styled-components";

const StyledBack = styled.div`
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

function WordMultiChoice(){

    const location = useLocation();
    const navigate = useNavigate();
    const { level, category, userId } = location.state || {};

    const [quizList,setQuizList] = useState([])
    const [currentIndex,setCurrentIndex] = useState(0);
    const [score,setScore] = useState(0);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
           const StudyWords = async() =>{
            try{
            const response = await axios.get('https://server-gxfs.onrender.com/api/words',
                {
                    params:{category,level}
                }
            );
            
            if(response.data.message){
                alert(response.data.message);
                console.log(response);
                console.log(userId);
            }
            else{
                setQuizList(response.data);
            }
            }
            catch(error){
                console.error('사용자 등록 에러:',error);
                alert('단어 불러오기 실패');
            }
            finally{
                setLoading(false);
            }
            };
            StudyWords();
        },[category,level])

    const handleAnswer = async(selectedIndex) => {
        const currentQuiz = quizList[currentIndex];
        const isCorrect = selectedIndex === currentQuiz.answer_index;

        const nextScore = isCorrect ? score+1 : score;

        try{
            const res = await axios.post('https://server-gxfs.onrender.com/api/quiz/submit',{
                    user_id: userId.user_id,
                    word: currentQuiz.word,
                    level,
                    category,
                    selected_index: selectedIndex,
                    answer_index: currentQuiz.answer_index,
                    is_correct: isCorrect,
                    round: currentIndex + 1,
            }

        )
        console.log(res);
        }
         catch(err){
                console.log(err);
        }

        if (currentIndex + 1 === quizList.length) {
        if (nextScore === 10) {
            navigate("/MultiChoSuc", { state: { score: nextScore } });
        } else {
            navigate("/MultiChoFalse", { state: { score: nextScore } });
        }
        } else {
            if(isCorrect){
                alert("정답");
            }
            else{
                alert(`오답! 정답은: ${currentQuiz.options[currentQuiz.answer_index]}`);

            }
            setScore(nextScore);
            setCurrentIndex(prevIndex => prevIndex + 1);
        }

    }

        if(loading){
        return(
            <div> 퀴즈 로딩중 ..</div>
        )
       }

        const currentQuiz = quizList[currentIndex];
        // console.log(currentQuiz);


    return(
        <>
            <StyledBack>
                <PaddingBox padding='60px 0px'>
                    <p>난이도:{level}, 카테고리:{category}</p>
                    <p>{currentIndex+1}/10</p>
                    <p>점수:{score}</p>
                    <StyledP>{currentQuiz.word}</StyledP>
                    {
                        currentQuiz.options.map((option,i)=> 
                        {
                            return(
                                <StyledBtn
                                    key={i}
                                    onClick={()=>handleAnswer(i)}
                                    >
                                    {option}
                                </StyledBtn>
                            )
                        }
                    )
                    }
                </PaddingBox>
            </StyledBack>
        </>
    )
}
export default WordMultiChoice;