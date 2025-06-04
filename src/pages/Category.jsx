import StandingRabit from "../assets/standingRabit.png"
import styled from "styled-components";
import CategoryBox from "../components/category/CategoryBox";
import PaddingBox from "../components/PaddingBox";
import { useNavigate,useLocation } from "react-router-dom";

const StyledBack = styled.div`
        background-color:#F3FF89;
    `
    const CategoryFlex = styled.div`
        display: flex;
        flex-direction: row;       /* ✅ 가로 정렬 */
        overflow-x: auto;          /* ✅ 가로 스크롤 */
        overflow-y: hidden;        /* ✅ 세로 스크롤 제거 */
        gap: 16px;                 /* ✅ 박스 간 간격 */
        padding: 20px;
        min-height: 100vh;
    `

function Category() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state || {};  // ✅ userId만 꺼냄

    console.log('Received userId:', userId);

    const CateSubmit = (category) => {
        navigate('/ChatBot', { state: { category, userId } });
    };

    return (
        <StyledBack>
            <PaddingBox padding='0px'>
                <img src={StandingRabit} style={{ width: '169px', height: '230px', margin: '40px 0px' }} alt="Standing Rabbit" />
                <p style={{ fontSize: '24px', margin: 0 }}>카테고리를 선택해줘!</p>
                <CategoryFlex>
                    <CategoryBox category={'일상대화'} children={'일상대화에서 자주 쓰이는 어휘에 대해 알아보아요.'}
                        onClick={() => CateSubmit('일상대화')} />
                    <CategoryBox category={'사회'} children={'사회적인 어휘에 대해 알아보아요.'}
                        onClick={() => CateSubmit('사회')} />
                    <CategoryBox category={'자연'} children={'자연 환경에서 느낄 수 있는 어휘에 대해 알아보아요.'}
                        onClick={() => CateSubmit('자연')} />
                    <CategoryBox category={'건강'} children={'건강 어휘에 대해 알아보아요.'}
                        onClick={() => CateSubmit('건강')} />
                    <CategoryBox category={'예술'} children={'예술학에 대한 어휘에 대해 알아보아요.'}
                        onClick={() => CateSubmit('예술')} />
                </CategoryFlex>
            </PaddingBox>
        </StyledBack>
    );
}
export default Category;