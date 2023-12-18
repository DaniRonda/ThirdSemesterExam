using System.ComponentModel.DataAnnotations;

namespace api.Model;

public class UpdateItemDto
{
    public int ItemId { get; set; }

    [Required(ErrorMessage = "Name required")]
    public string ItemName { get; set; }

    [Required(ErrorMessage = "Url required")]
    [Url(ErrorMessage = "Must be a valid URL")]
    public string ItemUrlImg { get; set; }

    [Required(ErrorMessage = "Price required")]
    [Range(0.01, double.MaxValue, ErrorMessage = "ItemPrice must be greater than 0")]
    public double ItemPrice { get; set; }

    public string ItemOptions { get; set; }
}