using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Boilerplate.Web.App.Models
{
    public partial class Customer
    {
        public Customer()
        {
            TransactionHead = new HashSet<TransactionHead>();
        }

        public int Id { get; set; }
        [Display(Name = "Customer Name")]
        [Required(ErrorMessage = "Please enter a customer name")]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        [RegularExpression(@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$", ErrorMessage = "Not a valid Phone number")]
        public string Phone { get; set; }

        public ICollection<TransactionHead> TransactionHead { get; set; }
    }
}
