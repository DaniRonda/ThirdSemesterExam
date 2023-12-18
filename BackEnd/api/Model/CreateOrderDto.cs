using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class CreateOrderDto
{
    
    [Required]
    public string OrderItemArrayId { get; set; }

    [Required]
    [RegularExpression(@"^\d{2}-\d{2}-\d{4}$", ErrorMessage = "Wrong format -> dd-mm-yyyy")]
    public string OrderDate { get; set; }

    [Required]
    [RegularExpression(@"^\d{2}:\d{2}:\d{2}$", ErrorMessage = "Wrong format -> hh:mm:ss")]
    public string OrderTime { get; set; }
    
    public bool OrderItIsDone { get; set; }
}