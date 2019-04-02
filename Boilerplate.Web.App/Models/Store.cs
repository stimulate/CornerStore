using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Boilerplate.Web.App.Models
{
    public partial class Store
    {
        public Store()
        {
            StaffAssignment = new HashSet<StaffAssignment>();
            TransactionHead = new HashSet<TransactionHead>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        public ICollection<StaffAssignment> StaffAssignment { get; set; }
        public ICollection<TransactionHead> TransactionHead { get; set; }
    }
}
