using System.ComponentModel.DataAnnotations;
using api.CustomDataAnnotations;
using infraestructure.DataModels;

namespace api.Model;

public class CreateUserDto
{
    [Required(ErrorMessage = "User name iss required")]
    public string Username{get; set;}
    

    [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{6,}$", 
        ErrorMessage = "The password must contain at least one uppercase letter, one number, and be at least 6 characters long")]
    public string Password { get; set; }
    
    [Required]
    [Range(0, 2, ErrorMessage = "Role can only be Employee, Chef, Admin")]
    public Role Role { get; set; }
}