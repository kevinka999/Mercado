import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Pedidos extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column.dateTime({ autoCreate: true })
  public data: DateTime;
  @column()
  public descricao: string;
  @column()
  public situacao: number;
  @column()
  public valor_total: number;
}
