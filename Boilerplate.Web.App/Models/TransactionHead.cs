using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Boilerplate.Web.App.Models
{
    public partial class TransactionHead
    {
     
        [Key]
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int StaffId { get; set; }
        public int StoreId { get; set; }
        public int ProductId { get; set; }
     
        [Required]
        public DateTime Date { get; set; }

        public Customer Customer { get; set; }
        public Staff Staff { get; set; }
        public Store Store { get; set; }
        public Product Product { get; set; }
    }
}
