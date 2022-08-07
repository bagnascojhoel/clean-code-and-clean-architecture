const CREATE_TABLE_ORDER = `
    CREATE TABLE \`order\` (
        code            VARCHAR(12) PRIMARY KEY NOT NULL,
        buyer_cpf       VARCHAR(11) NOT NULL,
        created_at      DATETIME NOT NULL,
        cancelled_at    DATETIME
    )
`

const CREATE_TABLE_WAREHOUSE_ITEM = `
    CREATE TABLE warehouse_item (
        warehouse_item_id   INTEGER PRIMARY KEY AUTOINCREMENT,
        description         TEXT NOT NULL,
        metric_width        DECIMAL(10,3) NOT NULL,
        metric_length       DECIMAL(10,3) NOT NULL,
        metric_height       DECIMAL(10,3) NOT NULL,
        kilogram_weight     DECIMAL(10,3) NOT NULL
    )
`

const CREATE_TABLE_WAREHOUSE_PRICE_ENTRY = `
    CREATE TABLE warehouse_price_entry (
        warehouse_price_entry_id    INTEGER PRIMARY KEY AUTOINCREMENT,
        warehouse_item_id           INTEGER NOT NULL,
        new_price                   DECIMAL(10,3) NOT NULL,
        effective_since             DATETIME NOT NULL,
        FOREIGN KEY (warehouse_item_id) REFERENCES warehouse_item (warehouse_item_id)
    )
`

const CREATE_TABLE_WAREHOUSE_STOCK_ENTRY = `
    CREATE TABLE warehouse_stock_entry (
        warehouse_stock_entry_id    INTEGER PRIMARY KEY AUTOINCREMENT,
        entry_type                  TEXT CHECK(entry_type IN ('in', 'out')),
        warehouse_item_id           INTEGER NOT NULL,
        quantity                    DECIMAL(10,3) NOT NULL,
        registered_at               DATETIME NOT NULL,
        FOREIGN KEY (warehouse_item_id) REFERENCES warehouse_item (warehouse_item_id)
    )
`

const CREATE_TABLE_ORDER_ITEM = `
    CREATE TABLE order_item (
        order_item_id       INTEGER PRIMARY KEY AUTOINCREMENT,
        order_code          VARCHAR(12) NOT NULL,
        warehouse_item_id   INTEGER NOT NULL,
        quantity            DECIMAL(10,3) NOT NULL,
        FOREIGN KEY (order_code) REFERENCES \`order\` (code),
        FOREIGN KEY (warehouse_item_id) REFERENCES warehouse_item (warehouse_item_id)
    )
`

const CREATE_TABLE_ADDRESS = `
    CREATE TABLE address (
        address_id  INTEGER PRIMARY KEY AUTOINCREMENT,
        location    TEXT
    )
`

const CREATE_TABLE_FREIGHT = `
    CREATE TABLE freight (
        freight_id              INTEGER PRIMARY KEY AUTOINCREMENT,
        minimum_price           DECIMAL(10,3) NOT NULL,
        origin_address_id       INTEGER NOT NULL,
        destination_address_id  INTEGER NOT NULL,
        FOREIGN KEY (origin_address_id) REFERENCES address (address_id),
        FOREIGN KEY (destination_address_id) REFERENCES address (address_id)
    )
`

const CREATE_TABLE_COUPON = `
    CREATE TABLE coupon (
        coupon_id           INTEGER PRIMARY KEY AUTOINCREMENT,
        name                VARCHAR(50) NOT NULL UNIQUE,
        discount_percentage DECIMAL(4,2) NOT NULL,
        expires_at          DATETIME NOT NULL
    )
`

const CREATE_TABLE_APPLIED_COUPON = `
    CREATE TABLE applied_coupon (
        applied_coupon_id   INTEGER PRIMARY KEY AUTOINCREMENT,
        coupon_id           INTEGER NOT NULL,
        order_code          VARCHAR(12) UNIQUE NOT NULL,          
        FOREIGN KEY (coupon_id) REFERENCES coupon (coupon_id),
        FOREIGN KEY (order_code) REFERENCES \`order\` (order_code)   
    )
`

exports.up = async function up(knex) {
    await knex.raw(CREATE_TABLE_ORDER)
    await knex.raw(CREATE_TABLE_WAREHOUSE_ITEM)
    await knex.raw(CREATE_TABLE_WAREHOUSE_PRICE_ENTRY)
    await knex.raw(CREATE_TABLE_WAREHOUSE_STOCK_ENTRY)
    await knex.raw(CREATE_TABLE_ORDER_ITEM)
    await knex.raw(CREATE_TABLE_ADDRESS)
    await knex.raw(CREATE_TABLE_FREIGHT)
    await knex.raw(CREATE_TABLE_COUPON)
    await knex.raw(CREATE_TABLE_APPLIED_COUPON)
}

exports.down = async function down(knex) {
    await knex.schema.dropTableIfExists('order')
    await knex.schema.dropTableIfExists('warehouse_item')
    await knex.schema.dropTableIfExists('warehouse_price_entry')
    await knex.schema.dropTableIfExists('warehouse_stock_entry')
    await knex.schema.dropTableIfExists('order_item')
    await knex.schema.dropTableIfExists('address')
    await knex.schema.dropTableIfExists('freight')
    await knex.schema.dropTableIfExists('coupon')
    await knex.schema.dropTableIfExists('applied_coupon')
}

