using System.Runtime.InteropServices.JavaScript;
using Microsoft.VisualBasic;

namespace infraestructure.DataModels;

public class Order
{
    public int OrderId { get; set; }
    public Array OrderItemArrayId { get; set; }
    public DateOnly OrderDate  { get; set; }
    public TimeOnly OrderTime { get; set; }
    public Boolean OrderItIsDone { get; set; }
}