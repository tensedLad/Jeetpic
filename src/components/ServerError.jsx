import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

export default function ServerError() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center px-4">
            <div className="text-center space-y-8">
                <div className="flex justify-center">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                        <AlertTriangle className="w-24 h-24 text-red-500" strokeWidth={1.5} />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-7xl font-bold text-gray-800">500</h1>
                    <h2 className="text-4xl font-bold text-gray-700">Server Error</h2>
                    <p className="text-xl text-gray-600 max-w-md mx-auto">
                        Oops! Something went wrong on our server. Our team has been notified and we're working to fix it.
                    </p>
                </div>

                <div className="space-y-3 pt-8">
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Try Again
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="block w-full px-8 py-3 bg-white border-2 border-gray-300 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-semibold rounded-lg transition-all duration-300"
                    >
                        <Home className="w-5 h-5 inline mr-2" />
                        Go to Home
                    </button>
                </div>

                <div className="pt-8 border-t border-gray-300 mt-12">
                    <p className="text-sm text-gray-600 mb-4">Need help?</p>
                    <a
                        href="#contact"
                        className="inline-block text-orange-500 hover:text-orange-600 font-semibold underline transition-colors"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
