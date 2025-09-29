import React,{useState} from "react";

const Test=()=>{
  const [name,setName]=useState("");
  const [sub,setSub]=useState("");

  const handlesub=()=>{
    setSub(name);
    setName("");
  }
  return (
    <div
      // style={{
      //   display:"flex",
      //   flexDirection:"column",
      //   alignItems:"center",
      //   justifyContent:"center",
      //   height:"100vh",
      // }}
      className="flex flex-col items-center justify-center h-screen "
      >
      <h2 style={{marginBottom:"20px"}}>Tell your name</h2>
      <input style={{marginBottom:"20px"}}
      type="text"
      placeholder="enter your name"
      value={name}
      onChange={(e)=>setName(e.target.value)}/>

      <button style={{marginBottom:"20px",padding:"10px 15px",borderRadius:"5px",border:"none",cursor:"pointer",backgroundColor:"lightblue"}}
      onClick={handlesub}>submit</button>
      {sub && <h3>hello {sub}</h3>}
    </div>

  )

}

export default Test; 