import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import InputBox from "../components/Login/InputBox";
import PaddingBox from "../components/PaddingBox";
import SubmitBtn from "../components/Login/SubmitBtn";
import { useState } from "react";

function Login(){
    const navigate = useNavigate();

    const [form,setForm] = useState({
        email:'',
        password:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        console.log(e.target);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼의 기본 제출 동작을 막음

        const formData = new FormData();
        formData.append('username', form.username);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('checkpassword', form.checkpassword);

        try {
            const response = await axios.post('https://server-gxfs.onrender.com/auth/login', formData,
                {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  }
            );
            // 성공적인 응답 처리
            console.log('사용자 등록:', response.data);
            const user_id = response.data.user_id;
            alert("로그인이 완료되었습니다.");
            navigate("/Category",{state:{user_id}});
        } catch (error) {
            // 에러 처리
            console.error('사용자 등록 에러:', error);
            alert("로그인인 중 에러가 발생했습니다.");
        }

        console.log(form);
    }; 
    return(
        <PaddingBox>
            <form onSubmit={handleSubmit}>
                <p>이메일과 비밀번호를 입력해주세요.</p>
                <div style={{marginBottom:'30px'}}>
                    <InputBox type='email' name='email' onChange={handleChange} value={form.email}/>
                    <InputBox type='password' name='password' onChange={handleChange} value={form.password}/>
                </div>
                <SubmitBtn children={'로그인'} type="submit"/>
            </form>
            <p>아직 회원가입을 안하셨다면?</p>
            <SubmitBtn children={'회원가입'}
                onClick={(e)=>{
                    e.preventDefault(),
                    navigate('/Register');
                }}
                type="button"
            />
        </PaddingBox>
    )
}
export default Login;