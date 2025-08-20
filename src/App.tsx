import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import './App.css';
import { Star } from './components/Star';
import { Planet } from './components/Planet';

function App() {
  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 75 }}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <Star />
      <Planet />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
