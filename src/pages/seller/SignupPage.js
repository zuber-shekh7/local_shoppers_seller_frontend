import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { sellerSignup } from "../../actions/sellerActions";
import routes from "../../utils/routes";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const { loading, seller, error } = useSelector((state) => state.sellerLogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (seller) {
      navigate("/seller/account");
    }
  }, [seller, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email && !password) {
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Password must match.");
      return;
    }

    dispatch(sellerSignup(email, password));
  };

  return (
    <main className="bg-indigo-600">
      <section className="flex flex-col justify-center  items-center h-screen">
        <div className="w-11/12 sm:w-96 bg-white rounded-xl shadow-lg p-10">
          <Link to="/">
            <h2 className="flex gap-x-1 text-3xl text-indigo-600">
              <HiOutlineShoppingBag className="h-8 w-8" />
              <span className="font-bold ">Local Shoppers</span>
            </h2>
          </Link>

          <h1 className="my-4">Signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email">Email</label>
              <input
                className="w-full text-lg py-2 px-2 rounded-lg border-2 border-indigo-600  focus:ring-indigo-600"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seller@example.com"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password">Password</label>
              <input
                className="w-full text-lg py-2 px-2 rounded-lg border-2 border-indigo-600  focus:ring-indigo-600"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="don't share your password"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password">Confirm Password</label>
              <input
                className="w-full text-lg py-2 px-2 rounded-lg border-2 border-indigo-600  focus:ring-indigo-600"
                type="password"
                id="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="confirm password"
                required
              />
            </div>
            <div className="mb-5">
              <button
                className="btn text-lg bg-indigo-600 w-full border hover:bg-indigo-700"
                type="submit"
              >
                Signup
              </button>
            </div>

            <div className="mb-5 text-center">
              {!loading && error && <p className="text-red-500">{error}</p>}
              {!loading && message && <p className="text-red-500">{message}</p>}
              {loading && <p>Loading...</p>}
            </div>
          </form>
        </div>
        <div className="mt-5">
          <p className="text-center text-white text-xl">
            Already have an account?{" "}
            <Link className="underline" to={routes.login}>
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
