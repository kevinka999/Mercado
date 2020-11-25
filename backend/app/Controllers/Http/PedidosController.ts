import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import { PedidoRequest, DetalhePedidoResponse, ItemResponse, Status }  from 'App/Interfaces/PedidoInterface'

import ItensModel from 'App/Models/Item'
import PedidosModel from 'App/Models/Pedido'
import ItemPedidosModel from 'App/Models/ItemPedido'

export default class PedidosController {
    public async ListarPedidos() {
        return await PedidosModel.all();
    }

    public async CriarPedido({request}: HttpContextContract){
        const requestContent = ['descricao', 'itens_pedido'];
        const pedidoRequest: PedidoRequest = request.only(requestContent);

        const pedido = await PedidosModel.create({
            descricao: pedidoRequest.descricao,
            situacao: Status.Analise
        })

        let valorTotalPedido: number = 0;

        for (let itemPedido of pedidoRequest.itens_pedido) {
            const item = await ItensModel.find(itemPedido.id);
            
            if (item){
                valorTotalPedido += item.valor_unitario - itemPedido.desconto;

                await ItemPedidosModel.create({
                    item_fk: item.id,
                    pedido_fk: pedido.id,
                    desconto: itemPedido.desconto
                })
            }
        }

        pedido.valor_total = valorTotalPedido;
        await pedido.save()
    }

    public async DetalhePedido({ params }: HttpContextContract) {
        const pedidoId = Number(params.id);
        const pedido = await PedidosModel.find(pedidoId);

        if(pedido){
            const itensPedido: ItemPedidosModel[] = await Database
                .from('item_pedidos')
                .select('*')
                .where('pedido_fk', pedidoId);

            let itensPedidoResponse: ItemResponse[] = [];
            let valorTotalPedido: number = 0;

            for (let itemPedido of itensPedido){
                const item = await ItensModel.find(itemPedido.item_fk);
                if (item){
                    const valorFinalItem = (item.valor_unitario - itemPedido.desconto);
                    valorTotalPedido += valorFinalItem;

                    itensPedidoResponse.push({
                        codigo: item.codigo,
                        nome: item.nome,
                        valor_unitario: item.valor_unitario,
                        desconto: itemPedido.desconto,
                        valor_final: valorFinalItem
                    })
                }
            }

            const response: DetalhePedidoResponse = {
                descricao: pedido.descricao,
                situacao: pedido.situacao,
                itens: itensPedidoResponse,
                valor_total: valorTotalPedido
            };

            return response;
        }
    }

    public async AprovarPedido({ params }: HttpContextContract) {
        const pedidoId = Number(params.id)
        const pedido = await PedidosModel.find(pedidoId);

        if (pedido) {
            pedido.situacao = Status.Aprovado;
            pedido.save();
        }
    }

    public async CancelarPedido({ params }: HttpContextContract) {
        const pedidoId = Number(params.id);
        const pedido = await PedidosModel.find(pedidoId);

        if (pedido) {
            pedido.situacao = Status.Cancelado;
            pedido.save();
        }
    }
}
