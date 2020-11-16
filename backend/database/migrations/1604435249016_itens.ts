import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Itens extends BaseSchema {
  protected tableName = 'itens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('codigo')
      table.string('nome')
      table.float('valor_unitario')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
