namespace infraestructure.DataModels;

public class Items
{
    public int ItemId { get; set; }
    public string ItemName  { get; set; }
    public string ItemUrlImg { get; set; }
    public Double ItemPrice { get; set; }
    public Array ItemOptions { get; set; }
}