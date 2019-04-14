using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Boilerplate.Web.App.Models
{
    public partial class Product
    {
        public Product()
        {
            TransactionHead = new HashSet<TransactionHead>();
        }

        public int Id { get; set; }
        [Display(Name = "Product Name")]
        [Required(ErrorMessage = "Please enter a product name")]
        public string Name { get; set; }
        [Display(Name = "Price")]
        [Required(ErrorMessage = "Please enter a price")]
        public decimal Price { get; set; }

        public ICollection<TransactionHead> TransactionHead { get; set; }
    }
}
