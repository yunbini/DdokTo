import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputBox from "../components/Login/InputBox";
import PaddingBox from "../components/PaddingBox";
import SubmitBtn from "../components/Login/SubmitBtn";
import { useState } from "react";

function Register(){
    const navigate = useNavigate();

    const [form,setForm] = useState({
        username:'',
        email:'',
        password:'',
        checkpassword:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        console.log(e.target);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼의 기본 제출 동작을 막음
        if (form.password !== form.checkpassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const formData = new FormData();
        formData.append('username', form.username);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('checkpassword', form.checkpassword);



        try {
            const response = await axios.post('https://server-gxfs.onrender.com/auth/signup/', formData,
                {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  }
          
            );
            // 성공적인 응답 처리
            console.log('사용자 등록:', response.data);
            alert("회원가입이 완료되었습니다.");
            navigate("/");
        } catch (error) {
            // 에러 처리
            console.error('사용자 등록 에러:', error);
            console.log(form);
            alert("회원가입 중 에러가 발생했습니다.");
        }

        console.log(form);
    }; 

    return(
        <PaddingBox>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom:'30px'}}>
                    <InputBox type='text' placeholder={' 닉네임'} name='username' onChange={handleChange}
                        value={form.username}/>
                    <InputBox type='email' placeholder={' 이메일'} name='email' onChange={handleChange}
                        value={form.email}/>
                    <InputBox type='password' placeholder={' 비밀번호'} name='password' onChange={handleChange}
                        value={form.password}/>
                    <InputBox type='password' placeholder={' 비밀번호 확인'} name='checkpassword' onChange={handleChange}
                        value={form.checkpassword}/>
                </div>
                <SubmitBtn children={'회원가입'} type="submit"/>
            </form>
            <p>이미 가입이 되어있다면?</p>
            <SubmitBtn children={'로그인'}
                onClick={(e)=>{
                    e.preventDefault();
                    navigate("/Login");
                }}
                type='button'
            />
        </PaddingBox>
    )
}
export default Register;