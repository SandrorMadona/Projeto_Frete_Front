// Exatamente igual a sua Entidade TabelaPreco no Java
export interface TabelaPreco {
  id?: number; // A interrogação significa que é opcional (o banco gera depois)
  am: number;
  pm: number;
  sd: number;
  sdd: number;
}

// O seu Enum e a Tabela Auxiliar
export interface TurnoRealizado {
  turno: "AM" | "PM" | "SD"; // O TypeScript trava para aceitar só esses 3 textos!
  sdd: boolean;
}

// O DTO exato que o seu FreteController espera receber no POST
export interface FreteRequestDTO {
  dataServico: string; // Datas no JSON viajam como texto (String) "AAAA-MM-DD"
  turnoRealizado: TurnoRealizado[];
  gasto: number;
}

// A sua entidade de Combustível
export interface Combustivel {
  id?: number;
  combustivel: number;
  data: string;
  tipoCombustivel: "GAS" | "GASOLINA" | "ALCOOL" | "DIESEL";
}

// A sua entidade de Custos Fixos
export interface CustoFixo {
  id?: number;
  financiamento: number;
  reserva: number;
  trocadeoleo: number;
  outros: number;
}