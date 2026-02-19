import { Html, OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Box3, Vector3, MeshStandardMaterial } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useTheme } from '../context/ThemeContext';

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error) {
    this.props.onError?.(error);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function LoadingIndicator() {
  return (
    <Html center>
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-soft dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
        Loading model...
      </div>
    </Html>
  );
}

function ErrorIndicator() {
  return (
    <Html center>
      <div className="max-w-xs rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-700 dark:border-red-900 dark:bg-red-950/60 dark:text-red-200">
        Model could not be loaded. Verify the file path and format.
      </div>
    </Html>
  );
}

function STLModel({ fileUrl, wireframe, onLoad }) {
  const geometry = useLoader(STLLoader, fileUrl);
  const meshRef = useRef();
  const [scale, setScale] = useState(1);

  const material = useMemo(() => {
    return new MeshStandardMaterial({
      color: '#00d4ff',
      wireframe: wireframe,
      flatShading: false,
      metalness: 0.3,
      roughness: 0.4
    });
  }, [wireframe]);

  useEffect(() => {
    if (!geometry) return;

    // Compute normals for proper lighting
    geometry.computeVertexNormals();

    // Compute bounding box first
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    const size = new Vector3();
    box.getSize(size);
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    // Center the geometry by translating it
    const center = new Vector3();
    box.getCenter(center);
    geometry.translate(-center.x, -center.y, -center.z);

    // Set scale for better visibility
    setScale(4.0 / maxDimension);

    onLoad?.();
  }, [geometry, onLoad]);

  return <mesh ref={meshRef} geometry={geometry} material={material} scale={scale} />;
}

function GLBModel({ fileUrl, wireframe, onLoad }) {
  let gltf;
  try {
    gltf = useGLTF(fileUrl);
  } catch (error) {
    console.error('Error loading GLTF:', fileUrl, error);
    throw error;
  }

  const clonedScene = useMemo(() => {
    if (!gltf || !gltf.scene) {
      console.error('No scene found in GLTF:', fileUrl, gltf);
      return null;
    }
    console.log('GLTF loaded successfully:', fileUrl, gltf);
    return gltf.scene.clone(true);
  }, [gltf, fileUrl]);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!clonedScene) return;
    // Auto-fit: normalize the largest model dimension to a predictable viewport size.
    const box = new Box3().setFromObject(clonedScene);
    const size = box.getSize(new Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    setScale(2.5 / maxDimension);
    onLoad?.();
  }, [clonedScene, onLoad]);

  useEffect(() => {
    if (!clonedScene) return;
    // Apply wireframe mode to all mesh materials in the loaded scene graph.
    clonedScene.traverse((child) => {
      if (!child.isMesh) return;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if (material && 'wireframe' in material) {
          material.wireframe = wireframe;
          material.needsUpdate = true;
        }
      });
    });
  }, [clonedScene, wireframe]);

  if (!clonedScene) {
    return null;
  }

  return <primitive object={clonedScene} scale={scale} />;
}

function FitModel({ fileUrl, wireframe, onLoad }) {
  const isSTL = fileUrl.toLowerCase().endsWith('.stl');

  if (isSTL) {
    return <STLModel fileUrl={fileUrl} wireframe={wireframe} onLoad={onLoad} />;
  }

  return <GLBModel fileUrl={fileUrl} wireframe={wireframe} onLoad={onLoad} />;
}

export default function ModelViewer({ fileUrl, title }) {
  const controlsRef = useRef(null);
  const rendererRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    setModelError(false);
    setLoading(true);
    setWireframe(false);
  }, [fileUrl]);

  const handleReset = () => {
    controlsRef.current?.reset();
  };

  const handleScreenshot = () => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    const dataURL = renderer.domElement.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = dataURL;
    anchor.download = `${title.toLowerCase().replace(/\s+/g, '-')}-viewer.png`;
    anchor.click();
  };

  return (
    <div className="space-y-4">
      <div className="h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200 shadow-soft dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [3.5, 2.8, 4], fov: 44 }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          onCreated={({ gl }) => {
            rendererRef.current = gl;
          }}
        >
          <color attach="background" args={[theme === 'dark' ? '#020617' : '#f1f5f9']} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 6, 4]} intensity={1} />
          <Suspense fallback={<LoadingIndicator />}>
            <ModelErrorBoundary
              resetKey={fileUrl}
              onError={() => {
                setModelError(true);
                setLoading(false);
              }}
              fallback={<ErrorIndicator />}
            >
              <FitModel
                fileUrl={fileUrl}
                wireframe={wireframe}
                onLoad={() => {
                  setLoading(false);
                  setModelError(false);
                }}
              />
            </ModelErrorBoundary>
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls
            ref={controlsRef}
            makeDefault
            enableDamping
            dampingFactor={0.08}
            autoRotate={autoRotate}
            autoRotateSpeed={0.9}
          />
        </Canvas>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
        >
          Reset view
        </button>
        <button
          type="button"
          onClick={() => setAutoRotate((prev) => !prev)}
          aria-pressed={autoRotate}
          className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
            autoRotate
              ? 'border-cyan-500 bg-cyan-500 text-white dark:border-cyan-300 dark:bg-cyan-300 dark:text-slate-900'
              : 'border-slate-300 bg-white text-slate-700 hover:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-300'
          }`}
        >
          Auto-rotate: {autoRotate ? 'On' : 'Off'}
        </button>
        <button
          type="button"
          onClick={() => setWireframe((prev) => !prev)}
          aria-pressed={wireframe}
          className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
            wireframe
              ? 'border-cyan-500 bg-cyan-500 text-white dark:border-cyan-300 dark:bg-cyan-300 dark:text-slate-900'
              : 'border-slate-300 bg-white text-slate-700 hover:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-300'
          }`}
        >
          Wireframe: {wireframe ? 'On' : 'Off'}
        </button>
        <button
          type="button"
          onClick={handleScreenshot}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
        >
          Screenshot
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">Preparing viewer...</p>
      ) : null}
      {modelError ? (
        <p className="text-sm text-red-600 dark:text-red-300">
          The viewer is running, but this model file could not be loaded from <code>{fileUrl}</code>.
        </p>
      ) : null}
    </div>
  );
}
