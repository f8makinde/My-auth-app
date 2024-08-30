"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const SignupPage = () => {
 const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() =>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false) 
    }
    else{
      setButtonDisabled(true) 
    }
  }) 
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
      toast.success("Signed successfully 🥳",
        {duration: 9000}
      )
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <h1 className='text-center text-black text-3xl'>{loading ? "Processing.." : "Signup"}</h1>
    <hr />
    <label htmlFor="username">Username</label>
    <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-900" id="username" type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} 
    placeholder="username" />

    <label htmlFor="email">Email</label>
    <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-900" id="email" type="text" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} 
    placeholder="email" />
    <label htmlFor="password">Password</label>
    <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-900" id="password" type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} 
    placeholder="password" />
    <button onClick={onSignup} className="p-2 border-gray-300 rounded-lg mb-4 focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup here"}</button>
  <Link href="/login">visit login page</Link>
  </div>
  )
}

export default SignupPage
