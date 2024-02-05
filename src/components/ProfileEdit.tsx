// import { useEffect, useState } from 'react'
// import { set } from 'react-hook-form'


// const UpadateProfile = () => {

//     const user = {
//         firstName: "John Doe",
//         age: 25,
//         gender: "male",
//         email: "jhon@",
//         password: "123",
//         image: "image.jpg",

//     }

//     const [name, setName] = useState("")
//     const [age, setAge] = useState(0)
//     const [gender, setGender] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [img, setImg] = useState("")
//     const [error, setError] = useState("")

//     if (user){  
//         useEffect(() => {
//             setName(user.firstName)
//             setAge(Number(user.age))
//             setGender(user.gender)
//             setEmail(user.email)
//             setPassword(user.password)
//             setImg(user.image)
//         })
//     }

//     return ()
//         <div>
//             <h1>Update Profile</h1>
//         </div>
//     )
// }