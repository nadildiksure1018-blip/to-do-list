import { useState } from 'react';
import type { FormEvent } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../AuthContext';
import axios from 'axios';


export default function Login() {
  const {login, register, loading} = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState(false); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp){
      try{
        await login(email,password);

      } catch(error : any) {
        if(error.response?.status === 400){
          setError(error.response?.data?.message);
        }
        console.log(error.response?.data || error.message);
        
      }

    } else {
      try{
        await register(email,password);

      } catch (error : any){
        if(error.response.status === 404){
          setError(error.response?.data?.message);
        }

      }
    }
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
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
