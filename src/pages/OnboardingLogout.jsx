import React from "react";
import PaddingBox from "../components/PaddingBox";
import OnboardingBtn from "../components/onboarding/OnboardingBtn";
import StandingRabit from "../assets/standingRabit.png"


function OnboardingLogout(){
    return(
        <PaddingBox>
            <img src={StandingRabit} style={{width:'169px',height:'230px'}}></img>
            <p style={{margin:'40px 0px',fontSize:'24px'}}>❤️ 똑토와 놀자 ❤️</p>
            <OnboardingBtn text='로그인'/>
            <OnboardingBtn text='회원가입'/>
        </PaddingBox>
    )
}
export default OnboardingLogout