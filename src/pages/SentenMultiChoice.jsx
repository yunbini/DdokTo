import React from "react";
import MultiChoice from "../components/multiChoice/MultiChoice";

function SentenMultiChoice(){
    return(
        <MultiChoice
            main={'그녀는 감독으로서의 재능도 _ _ _ _.'}
            choice1={'특출났다'}
            choice2={'특출났다'}
            choice3={'특출났다'}
            choice4={'특출났다'}
            size={'20px'}
        />
    )
}
export default SentenMultiChoice;