using Dapper;
using infraestructure.DataModels;
using Npgsql;

namespace infraestructure.Repositories;

public class ItemRepository
    {
        private readonly NpgsqlDataSource _dataSource;

        public ItemRepository(NpgsqlDataSource datasource)
        {
            _dataSource = datasource;
        }

        public IEnumerable<Items> GetItems()
        {
            string sql = $@"
SELECT item_id as {nameof(Items.ItemId)},
       item_name as {nameof(Items.ItemName)},
       item_img as {nameof(Items.ItemUrlImg)},
       item_price as {nameof(Items.ItemPrice)},
       item_options as {nameof(Items.ItemOptions)}
FROM public.items;
";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.Query<Items>(sql);
            }
        }

        public Items CreateItem(string itemName, string itemUrlImg, double itemPrice, string itemOptions)
        {
            var sql = $@"
INSERT INTO public.items (item_name, item_img, item_price, item_options) 
VALUES (@ItemName, @ItemUrlImg, @ItemPrice, @ItemOptions)
RETURNING item_id as {nameof(Items.ItemId)},
       item_name as {nameof(Items.ItemName)},
       item_img as {nameof(Items.ItemUrlImg)},
       item_price as {nameof(Items.ItemPrice)},
       item_options as {nameof(Items.ItemOptions)};
";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<Items>(sql, new { ItemName = itemName, ItemUrlImg = itemUrlImg, ItemPrice = itemPrice, ItemOptions = itemOptions });
            }
        }

        public bool DeleteItem(int itemId)
        {
            var sql = @"DELETE FROM public.items WHERE item_id = @ItemId;";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.Execute(sql, new { ItemId = itemId }) == 1;
            }
        }

        public Items UpdateItem(int itemId, string itemName, string itemUrlImg, double itemPrice, string itemOptions)
        {
            var sql = $@"
UPDATE public.items 
SET item_name = @ItemName, 
    item_img = @ItemUrlImg, 
    item_price = @ItemPrice, 
    item_options = @ItemOptions
WHERE item_id = @ItemId
RETURNING item_id as {nameof(Items.ItemId)},
       item_name as {nameof(Items.ItemName)},
       item_url as {nameof(Items.ItemUrlImg)},
       item_price as {nameof(Items.ItemPrice)},
       item_options as {nameof(Items.ItemOptions)};
";

            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<Items>(sql, new { ItemId = itemId, ItemName = itemName, ItemUrlImg = itemUrlImg, ItemPrice = itemPrice, ItemOptions = itemOptions });
            }
        }

        public async Task<Items> GetItemByNameAsync(string itemName)
        {
            string sql = $@"
SELECT item_id as {nameof(Items.ItemId)},
       item_name as {nameof(Items.ItemName)},
       item_url as {nameof(Items.ItemUrlImg)},
       item_price as {nameof(Items.ItemPrice)},
       item_options as {nameof(Items.ItemOptions)}
FROM public.items
WHERE item_name = @ItemName;
";
            using (var conn = _dataSource.OpenConnection())
            {
                return await conn.QueryFirstOrDefaultAsync<Items>(sql, new { ItemName = itemName });
            }
        }
        
        public Items GetItemsById(int itemId)
        {
            string sql = $@"SELECT item_id as {nameof(Items.ItemId)},
       item_name as {nameof(Items.ItemName)},
       item_img as {nameof(Items.ItemUrlImg)},
       item_price as {nameof(Items.ItemPrice)},
       item_options as {nameof(Items.ItemOptions)}
FROM public.items
WHERE item_id = @itemId;
";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<Items>(sql, new { itemId});
            }
        }
    }
