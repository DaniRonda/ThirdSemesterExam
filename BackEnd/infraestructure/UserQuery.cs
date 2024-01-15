using infraestructure.DataModels;

namespace infraestructure;

public class UserQuery
{
    public int UserId { get; set; }
    public string Username { get; set; }
    
    public string PasswordHash { get; set; }
    public string? PasswordSalt { get; set; }
    public Role Role { get; set; }
}