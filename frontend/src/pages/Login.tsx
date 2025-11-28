import { useState } from 'react';
import type { FormEvent } from 'react';
import { LogIn } from 'lucide-react';
import axios from 'axios';

interface FormData {
  email: string;
  password:string;

}

export default function Login() {

  const [formData, setFormData] = useState<FormData>({
    email:'',
    password:''
  });
  const [error, setError] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (isSignUp){
      try{
        const res = await axios.post('http://localhost:5000/api/user/createUser',formData);
        console.log(res.data);

      } catch(error : any) {
        if(error.response?.status === 400){
          setError(error.response?.data?.message);
        }
        console.log(error.response?.data || error.message);
        
      } finally {
        setIsLoading(false);
        setFormData( {
          email:'',
          password:''
        })
      }
    } else {
      try{
        const res = await axios.post('http://localhost:5000/api/user/loginUser',formData);

      } catch (error : any){
        if(error.response.status === 404){
          setError(error.response?.data?.message);
        }

      } finally {
        setIsLoading(false);
        setFormData( {
          email:'',
          password:''
        })
      }
    }

  }

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <div className="flex items-center justify-center mb-8">
                <div className="bg-blue-600 p-3 rounded-full">
                    <LogIn className="w-8 h-8 text-white" />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Sign up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium transition"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
            
        </div>
    </div>
  )
}
