using infraestructure.DataModels;
using Microsoft.AspNetCore.Mvc;
using service;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class Controller : ControllerBase
{
    private readonly ILogger<Controller> _logger;
    private readonly OrderService _orderService;
    private readonly UserService _userService;
    private readonly ItemService _itemService;

    public Controller(ILogger<Controller> logger, OrderService orderService, UserService userService, ItemService itemService)
    {
        _logger = logger;
        _orderService = orderService;
        _userService = userService;
        _itemService = itemService;
    }

    #region Orders

    [HttpGet]
    [Route("/api/orders")]
    public object Get()
    {
        return _orderService.GetOrders();
    }

    [HttpGet("{orderId}")]
    public async Task<ActionResult<Order>> GetOrderById(int orderId)
    {
        var order = await _orderService.GetOrderByOrderIdAsync(orderId);

        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);
    }

    [HttpPost]
    public ActionResult<Order> CreateOrder([FromBody] OrderCreationModel orderModel)
    {
        var order = _orderService.CreateOrder(orderModel.OrderItemArrayId, orderModel.OrderDate, orderModel.OrderTime,
            orderModel.OrderItIsDone);
        return CreatedAtAction(nameof(GetOrderById), new { orderId = order.OrderId }, order);

    }

    [HttpPut("{orderId}")]
    public ActionResult<Order> UpdateOrder(int orderId, [FromBody] OrderUpdateModel orderModel)
    {
        var order = _orderService.UpdateOrder(orderId, orderModel.OrderItemArrayId, orderModel.OrderDate,
            orderModel.OrderTime, orderModel.OrderItIsDone);

        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);

    }

    [HttpDelete("{orderId}")]
    public ActionResult DeleteOrder(int orderId)
    {
        var result = _orderService.DeleteOrder(orderId);

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    public class OrderCreationModel
    {
        public Array OrderItemArrayId { get; set; }
        public String OrderDate { get; set; }
        public String OrderTime { get; set; }
        public bool OrderItIsDone { get; set; }
    }

    public class OrderUpdateModel
    {
        public Array OrderItemArrayId { get; set; }
        public String OrderDate { get; set; }
        public String OrderTime { get; set; }
        public bool OrderItIsDone { get; set; }
    }
    
    #endregion
    
    #region Users
    
    
    #endregion

}





