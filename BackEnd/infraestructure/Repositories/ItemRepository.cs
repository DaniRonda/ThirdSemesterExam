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
SELECT ItemId as {nameof(Items.ItemId)},
       ItemName as {nameof(Items.ItemName)},
       ItemUrlImg as {nameof(Items.ItemUrlImg)},
       ItemPrice as {nameof(Items.ItemPrice)},
       ItemOptions as {nameof(Items.ItemOptions)}
FROM ExamProject.Items;
";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.Query<Items>(sql);
            }
        }

        public Items CreateItem(string itemName, string itemUrlImg, double itemPrice, Array itemOptions)
        {
            var sql = $@"
INSERT INTO ExamProject.Items (ItemName, ItemUrlImg, ItemPrice, ItemOptions) 
VALUES (@ItemName, @ItemUrlImg, @ItemPrice, @ItemOptions)
RETURNING ItemId as {nameof(Items.ItemId)},
       ItemName as {nameof(Items.ItemName)},
       ItemUrlImg as {nameof(Items.ItemUrlImg)},
       ItemPrice as {nameof(Items.ItemPrice)},
       ItemOptions as {nameof(Items.ItemOptions)};
";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<Items>(sql, new { ItemName = itemName, ItemUrlImg = itemUrlImg, ItemPrice = itemPrice, ItemOptions = itemOptions });
            }
        }

        public bool DeleteItem(int itemId)
        {
            var sql = @"DELETE FROM ExamProject.Items WHERE ItemId = @ItemId;";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.Execute(sql, new { ItemId = itemId }) == 1;
            }
        }

        public Items UpdateItem(int itemId, string itemName, string itemUrlImg, double itemPrice, Array itemOptions)
        {
            var sql = $@"
UPDATE ExamProject.Items 
SET ItemName = @ItemName, 
    ItemUrlImg = @ItemUrlImg, 
    ItemPrice = @ItemPrice, 
    ItemOptions = @ItemOptions
WHERE ItemId = @ItemId
RETURNING ItemId as {nameof(Items.ItemId)},
       ItemName as {nameof(Items.ItemName)},
       ItemUrlImg as {nameof(Items.ItemUrlImg)},
       ItemPrice as {nameof(Items.ItemPrice)},
       ItemOptions as {nameof(Items.ItemOptions)};
";

            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<Items>(sql, new { ItemId = itemId, ItemName = itemName, ItemUrlImg = itemUrlImg, ItemPrice = itemPrice, ItemOptions = itemOptions });
            }
        }

        public async Task<Items> GetItemByNameAsync(string itemName)
        {
            string sql = $@"
SELECT ItemId as {nameof(Items.ItemId)},
       ItemName as {nameof(Items.ItemName)},
       ItemUrlImg as {nameof(Items.ItemUrlImg)},
       ItemPrice as {nameof(Items.ItemPrice)},
       ItemOptions as {nameof(Items.ItemOptions)}
FROM ExamProject.Items
WHERE ItemName = @ItemName;
";
            using (var conn = _dataSource.OpenConnection())
            {
                return await conn.QueryFirstOrDefaultAsync<Items>(sql, new { ItemName = itemName });
            }
        }
    }
