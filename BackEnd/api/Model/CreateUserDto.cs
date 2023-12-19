using System.ComponentModel.DataAnnotations;
using api.CustomDataAnnotations;
namespace api.Model;

public class CreateUserDto
{
    [Required (ErrorMessage = "User name required")]
    public string Username { get; set; }

    [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{6,}$", 
        ErrorMessage = "The password must contain at least one uppercase letter, one number, and be at least 6 characters long")]
    public string Password { get; set; }
    
    public string PasswordHash { get; set; }
        
    public string PasswordSalt { get; set; }
    
    
    [Required]
    [ValueIsOneOf(new string[] {"Employee", "Chef", "Admin"},
    "can only be Employee, Chef, Admin")]
    public string Role { get; set; }
}