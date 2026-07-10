import { useEffect, useState } from 'react';
import type { CustoFixo } from './types';

export function FormularioFixo(){

    const [fixos, setFixos] = useState<CustoFixo>({
        financiamento: 0,
        reserva: 0,
        trocadeoleo: 0,
        outros: 0
    });

    useEffect(() => {
    async function carregarFixoSalvo(){
        try{
            const resposta = await fetch("http://localhost:8080/api/fixos");
            const dados = await resposta.json();

            //este if é porque no spring usei .findAll e isso faz com que o back devolva uma lista, e ao setar dados[0] ele basicamente abre a lista
            if (dados.length > 0) {
                setFixos(dados[0]); 
            }

        }catch(error){
            console.error("Não foi possivel acessar valores no banco de dados", error)
        }
    }
    carregarFixoSalvo();
    }, []);


    async function salvarFixos() {
        try{
            const resposta = await fetch("http://localhost:8080/api/fixos", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fixos)
            });
            if(resposta.ok){
                alert("Sucesso! Tabela salva no banco de dados.");
            }
            else{
                alert("Ops! O Back-end recusou os dados.");
            }
        }catch(erro){
            alert("erro ao conectar com back end");
            console.error(erro);
        }
    }

  // ==========================================
  // ZONA VISUAL
  // ==========================================
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Tabela de Custos Fixos
      </h2>

      <div className="space-y-4">
        {/* Bloco do financiamento*/}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600 mb-1">Financiamento</label>
          <input 
            type="number"
            className="border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            placeholder="R$ 0,00"
            value={fixos.financiamento}
            onChange={(evento) => {
              // é pego tudo que existe na caixa e atualiza apenas o am
              setFixos({ ...fixos, financiamento: Number(evento.target.value) });
            }}
          />
        </div>
        {/* Bloco outros */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600 mb-1">Outros Custos</label>
          <input 
            type="number"
            className="border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            placeholder="R$ 0,00"
            value={fixos.outros}
            onChange={(evento) => {
              setFixos({ ...fixos, outros: Number(evento.target.value) });
            }}
          />
        </div>
        {/* Bloco reserva */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600 mb-1">Reserva</label>
          <input 
            type="number"
            className="border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            placeholder="R$ 0,00"
            value={fixos.reserva}
            onChange={(evento) => {

              setFixos({ ...fixos, reserva: Number(evento.target.value) });
            }}
          />
        </div>
        {/* Bloco trocadeoleo */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600 mb-1">Troca de oleo</label>
          <input 
            type="number"
            className="border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            placeholder="R$ 0,00"
            value={fixos.trocadeoleo}
            onChange={(evento) => {
              setFixos({ ...fixos, trocadeoleo: Number(evento.target.value) });
            }}
          />
        </div>
       
      </div>

      <button 
        onClick={salvarFixos}
        className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition"
      >
        Salvar Custos Fixos
      </button>
    </div>
  );


}