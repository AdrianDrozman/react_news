import React from "react";
import useFormValidation from './useFormValidation'

const INITIAL_STATE={
  name:"",
  email:"",
  password:""
}

function Login(props) {
  const {handleChange,handleSubmit,values}=useFormValidation(INITIAL_STATE)
  const [login,setLogin]=React.useState(true);
 

  return (<div>
    <h2 className="mv3">{login ?"Login" :"Create Account"}</h2>
    <form className="flex flex-column" onSubmit={handleSubmit}>
      {!login &&<input type="text" placeholder="Your Name" autoComplete="off" onChange={handleChange} name="name" value={values.name} />}
      <input type="email" placeholder="Your Email" autoComplete="off" onChange={handleChange} name="email" value={values.email} />
      <input type="password" placeholder="Choose a secure password" onChange={handleChange} name="password" value={values.password} />
      <div className="flex mt3">
        <button type="submit" className="button pointer mr2">Submit</button>
        <button type="button" className="pointer button" onClick={()=>setLogin(prevLogin =>!prevLogin)}>{
          login ? "need to create an account?":"alread have an account ?"
        }</button>
      </div>
    </form>
  </div>)
}

export default Login;
