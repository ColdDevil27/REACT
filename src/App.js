import React, { useState } from "react";
import { BookOpen, Brain, FileText, Loader2 } from "lucide-react";

function App() {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to process");
      return;
    }

    setIsLoading(true);
    setError("");
    setOutput("");

    try {
      const response = await fetch(process.env.REACT_APP_API_URL || "http://localhost:5000/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setOutput(data.result);
      } else {
        setError(data.error || "An error occurred while processing");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutput("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Study Assistant</h1>
          <p className="text-gray-600">Transform your notes into summaries and quiz questions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Your Notes</h2>
            </div>
            
            <textarea
              rows="12"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your study notes, articles, or any text you want to process here..."
            />
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !inputText.trim()}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Generate Summary & Quiz
                  </>
                )}
              </button>
              
              <button
                onClick={handleClear}
                disabled={isLoading}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-5 h-5 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">AI Analysis</h2>
            </div>
            
            <div className="min-h-[300px]">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="text-red-800 font-medium">Error</div>
                  <div className="text-red-600">{error}</div>
                </div>
              )}
              
              {output && (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border">
                    {output}
                  </pre>
                </div>
              )}
              
              {!output && !error && !isLoading && (
                <div className="text-center text-gray-500 py-12">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your AI-generated summary and quiz questions will appear here</p>
                </div>
              )}
              
              {isLoading && (
                <div className="text-center text-gray-500 py-12">
                  <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin opacity-50" />
                  <p>Analyzing your text and generating content...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Use</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-start">
              <div className="bg-indigo-100 rounded-full p-2 mr-3 mt-0.5">
                <span className="text-indigo-600 font-bold text-xs">1</span>
              </div>
              <div>
                <strong>Paste Your Text:</strong> Add your study notes, articles, or any content you want to process
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-indigo-100 rounded-full p-2 mr-3 mt-0.5">
                <span className="text-indigo-600 font-bold text-xs">2</span>
              </div>
              <div>
                <strong>Generate Content:</strong> Click the button to get an AI-powered summary and quiz questions
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-indigo-100 rounded-full p-2 mr-3 mt-0.5">
                <span className="text-indigo-600 font-bold text-xs">3</span>
              </div>
              <div>
                <strong>Study & Test:</strong> Use the summary to review and the quiz questions to test your knowledge
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by Google Gemini AI</p>
        </div>
      </div>
    </div>
  );
}

export default App;
