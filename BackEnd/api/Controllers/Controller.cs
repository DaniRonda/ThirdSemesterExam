using api.DataModels;
using api.Model;
using Microsoft.AspNetCore.Mvc;
using service;
using infraestructure.DataModels;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class Controller : ControllerBase
{
    private readonly OrderService _orderService;
    private readonly UserService _userService;
    private readonly ItemService _itemService;

    private readonly ILogger<Controller> _logger;

   
    public Controller(ILogger<Controller> logger, OrderService orderService, UserService userService, ItemService itemService)
    {
        _logger = logger;
        _orderService = orderService;
        _userService = userService;
        _itemService = itemService;
    }

   // #region Orders

    [HttpGet]
    [Route("/api/orders")]
    public object Get()
    {
        return _orderService.GetOrders();
    }
    [HttpGet]
    [Route("/api/orders/notDone")]
    public object GetByDone()
    {
        return _orderService.GetOrdersByItIsDone();
    }
    [HttpGet]
    [Route("/api/orders/{orderDate}")]
    public object GetOrdersByDate()
    {
        return _orderService.GetOrdersByDate();
    }

    [HttpGet]
    [Route("/api/orders/{orderId}")]
    public Order GetOrderById(int orderId)
    {
        return _orderService.GetOrderByOrderIdAsync(orderId);

        
    }

    [HttpPost]
    [ValidateModel]
    [Route("/api/orders")]
    public ActionResult<Order> CreateOrder([FromBody] CreateOrderDto createOrderDto)
    {
        var order = _orderService.CreateOrder(createOrderDto.OrderItemArrayId, createOrderDto.OrderDate, createOrderDto.OrderTime,
            createOrderDto.OrderItIsDone);
        return CreatedAtAction(nameof(GetOrderById), new { orderId = order.OrderId }, order);

    }

    [HttpPut]
    [Route ("/api/orders/{orderId}")]
    public ActionResult<Order> UpdateOrder(int orderId, [FromBody] UpdateOrderDto updateOrderDto )
    {
        var order = _orderService.UpdateOrder(orderId, updateOrderDto.OrderItemArrayId, updateOrderDto.OrderDate,
            updateOrderDto.OrderTime, updateOrderDto.OrderItIsDone);

        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);

    }

    [HttpDelete]
    [Route ("/api/orders/{orderId}")]
    public ActionResult DeleteOrder(int orderId)
    {
        var result = _orderService.DeleteOrder(orderId);

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    
    
   // #endregion
    
    #region Users
    
    [HttpGet]
    [Route("/api/users")]
    public IActionResult GetUsers()
    {
        var users = _userService.GetUsers();
        return Ok(users);
    }
    
    [HttpGet]
    [Route("/api/user/id/{userId}")]
    public ActionResult<User> GetUserById(int userId)
    {
        var user = _userService.GetUserById(userId);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    [HttpPost]
    [ValidateModel]
    [Route("/api/users")]
    public IActionResult CreateUser([FromBody] CreateUserDto createUserDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var newUser = _userService.CreateUser(createUserDto.Username, createUserDto.PasswordHash, createUserDto.PasswordSalt, createUserDto.Role);

        return CreatedAtAction(nameof(GetUserById), new { userId = newUser.UserId }, newUser);
    }


    [HttpDelete]
    [Route("/api/user/id/{userId}")]
    public IActionResult DeleteUser(int userId)
    {
        var result = _userService.DeleteUser(userId);

        if (!result)
        {
            return NotFound(); 
        }

        return NoContent();
    }

    [HttpPut]
    [Route("/api/user/id/{userId}")]
    public IActionResult UpdateUser(int userId, [FromBody] UpdateUserDto updateUserDto)
    {
        var updatedUser = _userService.UpdateUser(updateUserDto.Username, userId, updateUserDto.PasswordHash, updateUserDto.PasswordSalt, updateUserDto.Role);

        if (updatedUser == null)
        {
            return NotFound();
        }

        return Ok(updatedUser);
    }

    [HttpGet]
    [Route("/api/user/username/{username}")]
    public async Task<IActionResult> GetUserByUsernameAsync(string username)
    {
        var user = await _userService.GetUserByUsernameAsync(username);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }
    
    #endregion


    #region Items
    
    [HttpGet]
    
    [Route("/api/items")]
    public IActionResult GetItems()
    {
        var items = _itemService.GetItems();
        return Ok(items);
    }

    [HttpGet]
    [Route("/api/items/id/{itemId}")]
    public IActionResult GetItemById(int itemId)
    {
        var item = _itemService.GetItemById(itemId);

        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost]
    public IActionResult CreateItem([FromBody] Items createItemModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var newItem = _itemService.CreateItem(createItemModel.ItemName, createItemModel.ItemUrlImg, createItemModel.ItemPrice, createItemModel.ItemOptions);

        return CreatedAtAction(nameof(GetItemById), new { itemId = newItem.ItemId }, newItem);
    }

    [HttpDelete("{itemId}")]
    public IActionResult DeleteItem(int itemId)
    {
        var result = _itemService.DeleteItem(itemId);

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("{itemId}")]
    public IActionResult UpdateItem(int itemId, [FromBody] Items updateItemModel)
    {
        var updatedItem = _itemService.UpdateItem(itemId, updateItemModel.ItemName, updateItemModel.ItemUrlImg, updateItemModel.ItemPrice, updateItemModel.ItemOptions);

        if (updatedItem == null)
        {
            return NotFound();
        }

        return Ok(updatedItem);
    }

    [HttpGet]
    [Route("/api/items/itemName/{itemName}")]
    public async Task<IActionResult> GetItemByNameAsync(string itemName)
    {
        var item = await _itemService.GetItemByNameAsync(itemName);

        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }
#endregion

#region Validation

/*[ApiController]
[Route("api/users/login")]
public class UserController : ControllerBase
{
    private readonly AuthenticationService _authenticationService;

    public UserController(AuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUserDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _authenticationService.RegisterUserAsync(createUserDto.Username, createUserDto.Password);

        return Ok("user created");
    }
}*/


#endregion

}






