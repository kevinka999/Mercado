import Route from '@ioc:Adonis/Core/Route'

// Item Controller
Route.get('Item/', "ItemController.ListarItens");
Route.post('Item/Criar', 'ItemController.CriarItem');
Route.delete('Item/Excluir/:id', "ItemController.ExcluirItem");

// Pedidos Controller
Route.get('Pedido/', "PedidosController.ListarPedidos");
Route.post('Pedido/Criar', 'PedidosController.CriarPedido');
Route.get('Pedido/Aprovar/:id', 'PedidosController.AprovarPedido');
Route.get('Pedido/Cancelar/:id', 'PedidosController.CancelarPedido');