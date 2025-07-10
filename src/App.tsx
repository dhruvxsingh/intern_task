import  { useState } from 'react';
import { Upload, Link, Send, Download } from 'lucide-react';

interface Property {
  id: number;
  name: string;
  location: string;
  url: string;
  price: string;
  area: string | null;
  bedrooms: number | null;
}

function App() {
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlOutput, setUrlOutput] = useState<Property[]>([]);
  const [pdfOutput, setPdfOutput] = useState('');
  const [activeTab, setActiveTab] = useState('url');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async () => {
    try {
      const response = await fetch('https://intern-6noc.onrender.com/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setUrlOutput(data);
      setError(null);
    } catch (error) {
      console.error('Error submitting URL:', error);
      setError('Failed to submit URL. Please try again.');
    }
  };

  const handleUrlFetch = async () => {
    console.log("jii")
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://intern-6noc.onrender.com/properties');
      console.log('adfsdlkj',response)
      
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      
      const data = await response.json();
      console.log(data)
      setUrlOutput(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch properties. Please try again later.');
      setUrlOutput([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPdfOutput(JSON.stringify(data, null, 2));
      setError(null);
    } catch (error) {
      setPdfOutput('Error uploading PDF');
      setError('Failed to upload PDF. Please try again.');
    }
  };

  const handlePdfFetch = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();
      setPdfOutput(JSON.stringify(data, null, 2));
      setError(null);
    } catch (error) {
      setPdfOutput('Error fetching data');
      setError('Failed to fetch PDF data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              className={`py-4 px-3 inline-flex items-center space-x-2 border-b-2 ${
                activeTab === 'url'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('url')}
            >
              <Link size={20} />
              <span>URL Upload</span>
            </button>
            <button
              className={`py-4 px-3 inline-flex items-center space-x-2 border-b-2 ${
                activeTab === 'pdf'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('pdf')}
            >
              <Upload size={20} />
              <span>PDF Upload</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-8 px-4">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        {/* URL Section */}
        <div className={activeTab === 'url' ? 'block' : 'hidden'}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">URL Upload</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleUrlSubmit}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Send size={18} className="mr-2" />
                  Submit
                </button>
                <button
                  onClick={handleUrlFetch}
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  <Download size={18} className="mr-2" />
                  {isLoading ? 'Loading...' : 'Fetch Properties'}
                </button>
              </div>
              {urlOutput.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Properties:</h3>
                  <div className="space-y-4">
                    {urlOutput.map((property,index) => (
                      <div key={property.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                          <p className="text-sm font-medium text-gray-500">{index}</p>
                            <p className="text-sm font-medium text-gray-500">Name</p>
                            <p className="text-gray-900">{property.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Location</p>
                            <p className="text-gray-900">{property.location}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Price</p>
                            <p className="text-gray-900">{property.price}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Area</p>
                            <p className="text-gray-900">{property.area || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Bedrooms</p>
                            <p className="text-gray-900">{property.bedrooms || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">URL</p>
                            <a 
                              href={property.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 truncate block"
                            >
                              View Property
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PDF Section */}
        <div className={activeTab === 'pdf' ? 'block' : 'hidden'}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">PDF Upload</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload PDF
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleFileUpload}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Upload size={18} className="mr-2" />
                  Upload
                </button>
                <button
                  onClick={handlePdfFetch}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Download size={18} className="mr-2" />
                  Fetch Data
                </button>
              </div>
              {pdfOutput && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Output:</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto">{pdfOutput}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;