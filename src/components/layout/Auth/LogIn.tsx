import { toggleAuthView, loginUser } from '@/frontend/redux/Slice/AuthSlice'
import { AppDispatch, RootState } from '@/frontend/redux/store'
import Link from 'next/link'
import Image from "next/image";
import { FaApple, FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LogIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleToggle = () => {
    dispatch(toggleAuthView())
  }

  const handleLogin = async () => {
    if (!email || !password) return;

    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      router.push('/profile');
    }
  };

  return (
    <div className='flex sm:flex gap-5 flex-col'>
      <p className="capitalize text-center font-extrabold mb-5 text-secondary-foreground text-4xl">
        Login
      </p>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-input text-input-foreground p-3 rounded-full transition duration-300 focus:outline-none pl-10"
      />
      <div className="relative">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-input text-input-foreground w-full p-3 rounded-full transition duration-300 focus:outline-none pl-10"
        />
      </div>
      {/* forget password */}
      <Link href="#">
        <div className="flex justify-end px-5">
          <div className="flex gap-1 justify-center items-center text-sm group cursor-pointer">
            <p className="text-secondary-foreground transition-all duration-300 ">
              Forget Password
            </p>
            <IoIosArrowRoundForward className=" transform transition-all duration-300 ease-out group-hover:translate-x-1 " />
          </div>
        </div>
      </Link>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-primary text-primary-foreground p-3 rounded-full transition duration-400 hover:scale-102 flex justify-center items-center text-lg gap-2 hover:outline-2 hover:outline-primary hover:outline-offset-4 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
        {!loading && (
          <Image
            src={"/leaf.png"}
            width={25}
            height={25}
            alt="leaf"
            className="scale-x-[-1]"
          />
        )}
      </button>

      {/* divider */}
      <div className="flex items-center gap-2">
        <div className="h-px bg-secondary-foreground/50 w-full"></div>
        <p className="text-stone-500">or</p>
        <div className="h-px bg-secondary-foreground/50 w-full"></div>
      </div>

      {/* social login */}
      <div className="flex justify-evenly items-center my-4 text-4xl text-secondary-foreground ">
        <Link
          href={"#"}
          className="hover:scale-115 hover:shadow-2xl shadow-primary transition duration-300"
        >
          <FaGoogle />
        </Link>
        <Link
          href={"#"}
          className="hover:scale-115 hover:shadow-2xl shadow-primary transition duration-300"
        >
          <FaFacebookF />
        </Link>
        <Link
          href={"#"}
          className="hover:scale-115 hover:shadow-2xl shadow-primary transition duration-300"
        >
          <FaApple />
        </Link>
        <Link
          href={"#"}
          className="hover:scale-115 hover:shadow-2xl shadow-primary transition duration-300"
        >
          <FaTwitter />
        </Link>
      </div>
      <p className="text-center text-stone-600 space-x-1 sm:hidden ">
        <span>New to EcoSphere ?</span>
        <button
          onClick={handleToggle}
          className="text-primary cursor-pointer"
        >
          Sign up
        </button>
      </p>
    </div>
  )
}

export default LogIn