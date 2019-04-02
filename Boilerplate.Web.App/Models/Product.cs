﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Boilerplate.Web.App.Models
{
    public partial class Product
    {
        public Product()
        {
            TransactionLine = new HashSet<TransactionLine>();
        }

        public int Id { get; set; }
        [Display(Name = "Product Name")]
        [Required(ErrorMessage = "Please enter a product name")]
        public string Name { get; set; }
        [Display(Name = "Price")]
        [Required(ErrorMessage = "Please enter a price")]
        public decimal Price { get; set; }

        public ICollection<TransactionLine> TransactionLine { get; set; }
    }
}
