import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ItemPedidos extends BaseSchema {
  protected tableName = 'item_pedidos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('pedido_fk')
      table.integer('item_fk')
      table.float('desconto')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
