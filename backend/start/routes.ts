import Route from '@ioc:Adonis/Core/Route'

// Item Controller
Route.get('Item/', "ItemController.ListarItens");
Route.post('Item/Criar', 'ItemController.CriarItem');
Route.delete('Item/Excluir/:id', "ItemController.ExcluirItem");

// Pedidos Controller
Route.get('Pedido/', "PedidosController.ListarPedidos");
Route.post('Pedido/Criar', 'PedidosController.CriarPedido');
Route.post('Pedido/Detalhe/:id', 'PedidosController.DetalhePedido');
Route.post('Pedido/Aprovar/:id', 'PedidosController.AprovarPedido');
Route.post('Pedido/Cancelar/:id', 'PedidosController.CancelarPedido');