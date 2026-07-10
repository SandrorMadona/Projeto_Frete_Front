import { useEffect, useState } from 'react';
import type { TabelaPreco } from './types';

export function FormularioPrecos() {
// ==========================================
  // ZONA DA LÓGICA (Memória e Ações)
  // ==========================================
  
  const [precos, setPrecos] = useState<TabelaPreco>({
    am: 0,
    pm: 0,
    sd: 0,
    sdd: 0
  }); 



  useEffect(() => {
    async function carregarPrecoSalvo(){
      try{
        const resposta = await fetch("http://localhost:8080/api/precos");
        const dados = await resposta.json(); //Transforma o retorno do db em json

        setPrecos(dados);

      }catch(error){
        console.error("Não foi possivel acessar valores no banco de dados", error)
      }
    }
  carregarPrecoSalvo();
  },[]);



  async function salvarPrecos() {
    try {
      const resposta = await fetch("http://localhost:8080/api/precos", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(precos) 
      });

      if (resposta.ok) {
        alert("Sucesso! Tabela salva no banco de dados.");
      } else {
        alert("Ops! O Back-end recusou os dados.");
      }
    } catch (error) {
      alert("Erro de conexão. O servidor Java está ligado?");
      console.error(error);
    }
  }

  // ==========================================
  // ZONA VISUAL
  // ==========================================
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Tabela de Preços Diária
      </h2>

      <div className="space-y-4">
        {/* Bloco do Turno AM */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600 mb-1">Turno Manhã (AM)</label>
          <input 
            type="number"
            className="border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            placeholder="R$ 0,00"
            value={precos.am}
            onChange={(evento) => {
              // é pego tudo que existe na caixa e atualiza apenas o am
              setPrecos({ ...precos, am: Number(evento.target.value) });
            }}
          />
        </div>
        {/* Bloco do Turno PM */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600 mb-1">Turno Tarde (PM)</label>
          <input 
            type="number"
            className="border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            placeholder="R$ 0,00"
            value={precos.pm}
            onChange={(evento) => {
              setPrecos({ ...precos, pm: Number(evento.target.value) });
            }}
          />
        </div>
        {/* Bloco do Turno SD */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600 mb-1">Turno Noite (SD)</label>
          <input 
            type="number"
            className="border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            placeholder="R$ 0,00"
            value={precos.sd}
            onChange={(evento) => {

              setPrecos({ ...precos, sd: Number(evento.target.value) });
            }}
          />
        </div>
        {/* Bloco do Turno SDD */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600 mb-1">Valor SDD</label>
          <input 
            type="number"
            className="border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            placeholder="R$ 0,00"
            value={precos.sdd}
            onChange={(evento) => {
              setPrecos({ ...precos, sdd: Number(evento.target.value) });
            }}
          />
        </div>
       
      </div>

      <button 
        onClick={salvarPrecos}
        className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition"
      >
        Salvar Configuração
      </button>
    </div>
  );
}