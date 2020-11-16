import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ItemRequest } from 'App/Interfaces/ItemInterface'

import ItemModel from 'App/Models/Item'

export default class ItemController {
    public async ListarItens() {
        return await ItemModel.all();
    }

    public async CriarItem({ request }: HttpContextContract) {
        const requestContent = ['codigo', 'nome', 'valor_unitario'];
        const novoItem: ItemRequest = request.only(requestContent);

        ItemModel.create(novoItem);
    }

    public async ExcluirItem({ params }: HttpContextContract) {
        const removeId = Number(params.id);
        const item = await ItemModel.find(removeId);

        item?.delete();
    }
}
