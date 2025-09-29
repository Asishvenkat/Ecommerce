import React,{useState} from "react"
import Userlist from "./child"

const Par=()=>{

   const [selecteduser,setSelecteduser]=useState(null);

   const users=[
    {id:1,name:"Alice",age:26},
    {id:2,name:"Bob",age:23},
    {id:3,name:"charlie",age:21}
   ];

    const handleuser=(user)=>{
      setSelecteduser(user);
    };

    return (
     <div>
        <h1>User Selection Demo</h1>
        <Userlist users={users} onSelect={handleuser}/>

        {selecteduser && (
            <h2>selected user:{selecteduser.name}({selecteduser.age} years)</h2>
        )}
     </div>
    )
}

export default Par;