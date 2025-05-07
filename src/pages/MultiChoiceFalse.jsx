import React from "react";
import MultiChoiceResult from "../components/multiChoice/MultiChoiceResult";

function MultiChoiceFalse(){
    return(
        <MultiChoiceResult score={8} ment={'우리 다시 한 번 학습해보자!'}
                choice1={'다시 학습하기!'} />
    )
}
export default MultiChoiceFalse;