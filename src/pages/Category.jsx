import React from "react";
import StandingRabit from "../assets/standingRabit.png"
import styled from "styled-components";
import CategoryBox from "../components/category/CategoryBox";
import PaddingBox from "../components/PaddingBox";
import axios from "axios";

const StyledBack = styled.div`
        background-color:#F3FF89;
    `
    const CategoryFlex = styled.div`
        margin: 0px;
        display:flex;
        justify-content:space-between;
        overflow:scroll
    `

function Category(){
    
    const CateSubmit = async(category) => {
        console.log(1);
        
        try{
            const response = await axios.post('https://server-gxfs.onrender.com/chat/start_chat',
                {category: category}
            );
            console.log('사용자 등록:',response.data);
            alert('카테고리 전달 완');
        }
        catch(error){
            console.error('사용자 등록 에러:',error);
            alert('카테고리 전달 실패')
        }
    }


    return(
            <StyledBack>
                <PaddingBox padding='0px'>
                    <img src={StandingRabit} style={{width:'169px',height:'230px',margin:'40px 0px'}}></img>
                    <p style={{fontSize:'24px',margin:0}}>카테고리를 선택해줘!</p>
                    <CategoryFlex>
                        <CategoryBox category={'일상'} children={'일상에서 자주 쓰이는 어휘에 대해 알아보아요.'}
                            onClick={() => CateSubmit('일상')}/>
                        <CategoryBox category={'사회'} children={'사회적인 어휘에 대해 알아보아요.'}
                            onClick={() => CateSubmit('사회')}/>
                        <CategoryBox category={'자연'} children={'자연 환경에서 느낄 수 있는 어휘에 대해 알아보아요.'}
                            onClick={() => CateSubmit('자연')}/>
                        <CategoryBox category={'과학'} children={'과학적인 어휘에 대해 알아보아요.'}
                            onClick={() => CateSubmit('과학')}/>
                        <CategoryBox category={'인문'} children={'인문학에 대한 어휘에 대해 알아보아요.'}
                            onClick={() => CateSubmit('인문')}/>
                    </CategoryFlex>
                </PaddingBox>
            </StyledBack>
    )
}
export default Category;