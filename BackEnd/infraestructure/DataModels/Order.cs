using System.Runtime.InteropServices.JavaScript;
using Microsoft.VisualBasic;

namespace infraestructure.DataModels;

public class Order
{
    public int OrderId { get; set;  }
    public String OrderItemArrayId { get; set; }
    public String OrderDate  { get; set; }
    public String OrderTime { get; set; }
    public Boolean OrderItIsDone { get; set; }
}
