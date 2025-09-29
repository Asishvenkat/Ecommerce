import React from "react";

const Child =({users,onSelect})=>{

     if(!users || users.length===0)return <p>No users found</p>;
    return (
        <div>
            {users.map((user)=>(
              <div
                key={user.id}>
                <span>
                    {user.name}({user.age} years)
                </span>
                <button
                 onClick={()=>onSelect(user)}
               >
                 select
                </button>
              </div>
            ))}
        </div>
    )
}

export default Child;