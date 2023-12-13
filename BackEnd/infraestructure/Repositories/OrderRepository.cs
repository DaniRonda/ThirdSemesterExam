using Dapper;
using Npgsql;
using infraestructure.DataModels;
namespace infraestructure.Repositories;

public class OrderRepository
    {
        private readonly NpgsqlDataSource _dataSource;


        public OrderRepository(NpgsqlDataSource datasource)
        {
            _dataSource = datasource;
        }

        public IEnumerable<Order> GetOrders()
        {
            string sql = $@"
SELECT order_id as {nameof(Order.OrderId)},
       order_item as {nameof(Order.OrderItemArrayId)},
       order_date as {nameof(Order.OrderDate)},
       order_time as {nameof(Order.OrderTime)},
       order_itsdone as {nameof(Order.OrderItIsDone)}
FROM public.orders;
";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.Query<Order>(sql);
            }
        }

        public Order CreateOrder(Array orderItemArrayId, string orderDate, string orderTime, bool orderItIsDone)
        {
            var sql = $@"
INSERT INTO public.orders (OrderItemArrayId, OrderDate, OrderTime, OrderItIsDone) 
VALUES (@order_item, @order_date, @order_time, @order_itsdone)
RETURNING order_id as {nameof(Order.OrderId)},
       order_item as {nameof(Order.OrderItemArrayId)},
       order_date as {nameof(Order.OrderDate)},
       order_time as {nameof(Order.OrderTime)},
       order_itsdone as {nameof(Order.OrderItIsDone)};
";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<Order>(sql, new { OrderItemArrayId = orderItemArrayId, OrderDate = orderDate, OrderTime = orderTime, OrderItIsDone = orderItIsDone });
            }
        }

        public bool DeleteOrder(int orderId)
        {
            var sql = @"DELETE FROM public.orders WHERE OrderId = @order_id;";
            using (var conn = _dataSource.OpenConnection())
            {
                return conn.Execute(sql, new { OrderId = orderId }) == 1;
            }
        }

        public Order UpdateOrder(int orderId, Array orderItemArrayId, string orderDate, string orderTime, bool orderItIsDone)
        {
            var sql = $@"
UPDATE ExamProject.Orders 
SET OrderItemArrayId = @order_item, 
    OrderDate = @order_date, 
    OrderTime = @order_item, 
    OrderItIsDone = @order_itsdone
WHERE OrderId = @order_id
RETURNING order_id as {nameof(Order.OrderId)},
       order_item as {nameof(Order.OrderItemArrayId)},
       order_date as {nameof(Order.OrderDate)},
       order_time as {nameof(Order.OrderTime)},
       order_itsdone as {nameof(Order.OrderItIsDone)};
";

            using (var conn = _dataSource.OpenConnection())
            {
                return conn.QueryFirst<Order>(sql, new { OrderId = orderId, OrderItemArrayId = orderItemArrayId, OrderDate = orderDate, OrderTime = orderTime, OrderItIsDone = orderItIsDone });
            }
        }

        public async Task<Order> GetOrderByOrderIdAsync(int orderId)
        {
            string sql = $@"SELECT order_id as {nameof(Order.OrderId)},
       order_item as {nameof(Order.OrderItemArrayId)},
       order_date as {nameof(Order.OrderDate)},
       order_time as {nameof(Order.OrderTime)},
       order_itsdone as {nameof(Order.OrderItIsDone)}
FROM public.orders
WHERE OrderId = @order_id;
";
            using (var conn = _dataSource.OpenConnection())
            {
                return await conn.QueryFirstOrDefaultAsync<Order>(sql, new { OrderId = orderId });
            }
        }
}
