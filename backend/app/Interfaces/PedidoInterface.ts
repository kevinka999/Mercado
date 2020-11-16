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