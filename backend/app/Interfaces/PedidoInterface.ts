export enum Status {
    Analise,
    Aprovado,
    Cancelado
}
export interface PedidoRequest {
    descricao: string;
    itens_pedido: ItensPedidoRequest[];
}

export interface ItensPedidoRequest {
    id: number;
    desconto: number;
}

export interface ItemResponse {
    codigo: string;
    nome: string;
    valor_unitario: number;
    desconto: number;
    valor_final: number;
}

export interface DetalhePedidoResponse {
    descricao: string;
    situacao: number;
    itens: ItemResponse[];
    valor_total: number;
}