import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pedidos extends BaseSchema {
  protected tableName = 'pedidos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('data')
      table.string('descricao')
      table.integer('situacao')
      table.float('valor_total')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
