import React from "react";
import StandingRabit from "../assets/standingRabit.png"
import styled from "styled-components";
import CategoryBox from "../components/category/CategoryBox";
import PaddingBox from "../components/PaddingBox";

function Category(){
    const StyledBack = styled.div`
        background-color:#F3FF89;
    `
    const CategoryFlex = styled.div`
        margin: 0px;
        display:flex;
        justify-content:space-between;
        overflow:scroll
    `
    return(
            <StyledBack>
                <PaddingBox padding='0px'>
                    <img src={StandingRabit} style={{width:'169px',height:'230px',margin:'40px 0px'}}></img>
                    <p style={{fontSize:'24px',margin:0}}>카테고리를 선택해줘!</p>
                    <CategoryFlex>
                        <CategoryBox category={'일상'}/>
                        <CategoryBox category={'음식'}/>
                        <CategoryBox category={'학교'}/>
                    </CategoryFlex>
                </PaddingBox>
            </StyledBack>
    )
}
export default Category;