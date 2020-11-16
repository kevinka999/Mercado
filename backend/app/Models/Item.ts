import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Itens extends BaseModel {
  @column({ isPrimary: true})
  public id: number;
  @column()
  public codigo: string;
  @column()
  public nome: string;
  @column()
  public valor_unitario: number;
}
