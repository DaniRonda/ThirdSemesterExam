using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class UpdateOrderDto
{
      
    [Required]
    public string OrderItemArrayId { get; set; }

    [Required]
    [RegularExpression(@"^\d{2}-\d{2}-\d{4}$", ErrorMessage = "Format should look like this -> dd-mm-yyyy")]
    public string OrderDate { get; set; }

    [Required]
    [RegularExpression(@"^\d{2}:\d{2}:\d{2}$", ErrorMessage = "Format should look like this -> hh:mm:ss")]
    public string OrderTime { get; set; }
    
    public bool OrderItIsDone { get; set; }
}