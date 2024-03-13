import { useRef , useState} from 'react'
import { postLogIn } from "../services/login-service"
import { useNavigate } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

export let userID: string

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>

interface AxiosError {
  response: {
    status: number;
  };
}

const LoginComponent = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const login = async (data: FormData) => {  
    try {
      const res = await postLogIn(data.email, data.password);
      userID = res._id as string; 
      console.log("userIDLogin: " + userID);
      console.log(res);
      if (res.accessToken) {
        localStorage.setItem('accessToken', res.accessToken);
      }
      if (res.refreshToken) {
        localStorage.setItem('refreshToken', res.refreshToken);
      }
      localStorage.setItem('userID', userID);
      navigate('/feed', { state: { userID } });

    } catch (err) {
      console.log("err: " +err);
      setLoginError('Email or password is incorrect');
      }
    }


    // const res = await postLogIn(data.email, data.password);
    // userID = res._id as string; 
    // console.log("userIDLogin: " + userID);
    // console.log(res);
    // if (res.accessToken) {
    //   localStorage.setItem('accessToken', res.accessToken);
    // }
    // if (res.refreshToken) {
    //   localStorage.setItem('refreshToken', res.refreshToken);
    // }
    // localStorage.setItem('userID', userID);
    // navigate('/feed', { state: { userID } });
  

  const handleButtonClick = () => {
    navigate('/registration');
  };
    
  return (
    <div className="vstack gap-3 col-md-7 mx-auto">

    

      <h1>LogIn</h1>
      <form onSubmit={handleSubmit(login)}>
        <div className="form-floating">
          <input {...register("email")} type="text" className="form-control" id="floatingInput" placeholder="" />
          <label htmlFor="floatingInput">Email</label>
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>
        <div className="form-floating">
          <input {...register("password")} type="password" className="form-control" id="floatingPassword" placeholder="" />
          <label htmlFor="floatingPassword">Password</label>
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary">LogIn</button>
      </form>

      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

      <button onClick={handleButtonClick} className="btn btn-primary">
        Don't have a member yet? Register here
      </button>

    </div>
  )
};

export default LoginComponent;

