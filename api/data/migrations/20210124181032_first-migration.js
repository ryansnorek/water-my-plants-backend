exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
      users.string('phone', 10)
      users.timestamps(false, true)
    })
    .createTable('plants', (plants) => {
      plants.increments('plant_id')
      plants.string('nickname', 200).notNullable().unique()
      plants.string('species', 200)
      plants.integer('h2o_frequency', 10)
      plants.text('image_url', 1000)
      plants.timestamps(false, true)
      plants.binary('uploaded_image', 255)
      plants.integer('user_id').unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
    })
    .createTable('user_plants', (user_plants) => {
      user_plants.increments('user_plant_id')
      user_plants.integer('user_id').notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete("CASCADE")
      user_plants.integer('plant_id').notNullable()
        .references('plant_id')
        .inTable('plants')
        .onDelete('CASCADE')
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('user_plants')
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
}
