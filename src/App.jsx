import NavBar from './components/NavBar';
import ListBox from './components/ListBox';
import WatchedBox from './components/WatchedBox';

export default function App() {
  return (
    <>
      <NavBar />

      <main className='main'>
        <ListBox />
        <WatchedBox />
      </main>
    </>
  );
}
