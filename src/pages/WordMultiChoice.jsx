import MultiChoice from "../components/multiChoice/MultiChoice";
import { useEffect,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

function WordMultiChoice(){

    const location = useLocation();
    const navigate = useNavigate();
    const { level, category, userId } = location.state || {};

    useEffect(()=>{
           const StudyWords = async() =>{
            try{
            const response = await axios.get('https://server-gxfs.onrender.com/api/words',
                {
                    params:{category,level}
                }
            );
             console.log('사용자 등록:',response);
            }
            catch(error){
                console.error('사용자 등록 에러:',error);
                alert('단어 불러오기 실패');
            }
            };
            StudyWords();
        },[category,level])

    return(
        <>
            <p>난이도:{level}, 카테고리:{category}</p>
            <MultiChoice
                main={'특출나다'}
                choice1={'남보다 특별히 뛰어나 두드러지다.'}
                choice2={'남보다 특별히 뛰어나 두드러지다.'}
                choice3={'남보다 특별히 뛰어나 두드러지다.'}
                choice4={'남보다 특별히 뛰어나 두드러지다.'}
            />
        </>
    )
}
export default WordMultiChoice;