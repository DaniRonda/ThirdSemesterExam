using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[ApiController]

public class Controller : ControllerBase
{
    private readonly ILogger<Controller> _logger;

    public Controller(ILogger<Controller> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Route "/object"]
    public object Get()
    {
       return
    }
}
