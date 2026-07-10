import { FormularioPrecos } from './Forumularioprecos';
import { FormularioFixo } from './Formulariofixos';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Aqui nós "encaixamos" a nossa peça! */}
      <FormularioPrecos />
      <FormularioFixo />
    </div>


  );
}