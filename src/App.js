import './App.css';
import News from './News';

function App() {
  return (
    <div className="App">
      <header className="text-center py-4 bg-blue-300 text-white">
        <h1 className="text-3xl font-bold">ACONEWS</h1>
      </header>
      <main className="container mx-auto p-4">
        <News />
      </main>
    </div>
  );
}

export default App;
