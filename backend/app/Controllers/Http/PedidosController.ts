import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PedidoRequest, Status }  from 'App/Interfaces/PedidoInterface'

import ItensModel from 'App/Models/Item'
import PedidosModel from 'App/Models/Pedido'
import ItemPedidosModel from 'App/Models/ItemPedido'


export default class PedidosController {
    public async ListarPedidos() {
        return await PedidosModel.all();
    }

    public async CriarPedido({request}: HttpContextContract){
        const requestContent = ['descricao', 'itens_pedido'];
        const novoPedido: PedidoRequest = request.only(requestContent);
        
        const pedidoAtual = await PedidosModel.create({
            'descricao': novoPedido.descricao,
            'situacao': Status.Analise
        });

        let valorTotal = 0;

        novoPedido.itens_pedido.map(async itemPedidoAtual => {
            const idItem = itemPedidoAtual.id;
            const item = await ItensModel.find(idItem);

            if (item){
                valorTotal += item.valor_unitario - itemPedidoAtual.desconto;

                ItemPedidosModel.create({
                    pedido_fk: (await pedidoAtual).id,
                    item_fk: item.id,
                    desconto: itemPedidoAtual.desconto
                })
            }
        });

        (await pedidoAtual).valor_total = valorTotal;
        (await pedidoAtual).save();
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
