import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ItemPedidos extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public pedido_fk: number;
  @column()
  public item_fk: number;
  @column()
  public desconto: number;
}
