using infraestructure.DataModels;

namespace unitTests;

public class User
{
    
    public int UserId { get; set; }
    public string Username { get; set; }
    public string? PasswordHash { get; set; }
    public string? PasswordSalt { get; set; }
    
    public string? Password { get; set; }
    
    public Role Role { get; set; }
}
