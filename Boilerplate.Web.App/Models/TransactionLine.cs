using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Boilerplate.Web.App.Models
{
    public partial class TransactionLine
    {
        [Key]
        public int Id { get; set; }
        public int HeadId { get; set; }
        public int ProductId { get; set; }
        [Required]
        public int Quantity { get; set; }

        public TransactionHead Head { get; set; }
        public Product Product { get; set; }
    }
}
