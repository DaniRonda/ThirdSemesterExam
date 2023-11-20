namespace infraestructure.DataModels;

public class User
{
    
    public int UserId { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public string Role { get; set; }
}
