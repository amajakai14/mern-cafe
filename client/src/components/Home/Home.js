import React from 'react'
import picture1 from '../../assets/Dessert1.jpg'
export default function Home() {
  return (
    <div className=' grid grid-cols-3 gap-3'>
      <div>
        <img src={picture1} alt="picture1" height={128/4} width={116/2}></img>
      </div>
      <div>
        <img src={picture1} alt="picture1" height="30%" width="100px"></img>
      </div><div>
        <img src={picture1} alt="picture1" height="30%" width="100px"></img>
      </div><div>
        <img src={picture1} alt="picture1" height="30%" width="100px"></img>
      </div><div>
        <img src={picture1} alt="picture1" height="30%" width="100px"></img>
      </div><div>
        <img src={picture1} alt="picture1" height="30%" width="100px"></img>
      </div><div>
        <img src={picture1} alt="picture1" height="30%" width="100px"></img>
      </div>
    </div>
  )
}
